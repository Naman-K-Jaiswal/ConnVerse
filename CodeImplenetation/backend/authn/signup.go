package authn

import (
	"backend/database"
	"backend/mail"
	"backend/profile"
	"bytes"
	"context"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"
)

func SendOTP() gin.HandlerFunc {
	return func(c *gin.Context) {
		var to ToEmail
		err := c.ShouldBindJSON(&to)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email"})
			return
		}

		_, err = CheckUserExist(to.Email)
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Please enter valid IITK email"})
			return
		} else if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		}

		flag := make(chan bool)

		go func() {
			DeleteEntries(to.Email, 6)
			flag <- true
		}()

		var body bytes.Buffer
		body.Write([]byte(fmt.Sprintf("Subject: ConnVerse One Time Password \r\n\r\n")))

		auth_code := GenerateRandomString(6)
		mail_template := fmt.Sprintf("Hello, \nThis is your OTP for ConnVerse : %s (do not share with anyone)", auth_code)
		body.Write([]byte(mail_template))

		err = smtp.SendMail(mail.Smtp_server+":"+mail.Smtp_port, mail.Auth, mail.From, []string{to.Email}, body.Bytes())
		fmt.Println(err)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send OTP"})
			return
		}

		collection := database.DB.Collection("login_details")

		login_details := LoginDetails{
			ID:       primitive.NewObjectID(),
			Email:    to.Email,
			Password: auth_code,
		}

		_ = <-flag
		_, err = collection.InsertOne(context.Background(), login_details)
		if err != nil {
			log.Fatal(err)
		}

		c.JSON(http.StatusOK, gin.H{"message": "OTP sent successfully"})
	}
}

func SignUp() gin.HandlerFunc {
	return func(c *gin.Context) {
		var signup_details SignupDetails
		err := c.ShouldBindJSON(&signup_details)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		code := MatchPass(signup_details.OldPassword, signup_details.Email)

		if code != 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
			return
		}

		res, err := CheckUserExist(signup_details.Email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		flag, _ := CheckUserAlreadyExist(signup_details.Email)
		if flag {
			c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
			return
		}
		err, response := profile.InitializeUser(res)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		err = CreatePassword(signup_details)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub": signup_details.Email,
			"exp": time.Now().Add(time.Hour * 24).Unix(),
		})

		tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
			return
		}

		c.SetSameSite(http.SameSiteLaxMode)
		c.SetCookie("Authorization", tokenString, 3600*24, "/", "localhost", false, false)

		c.JSON(http.StatusOK, gin.H{"message": "Sign Up Successful!", "img": response, "name": res["n"].(string), "id": res["i"].(string)})
	}
}
