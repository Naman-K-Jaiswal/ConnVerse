package authn

import (
	"backend/database"
	"bytes"
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"net/http"
	"net/smtp"
	"os"
)

func SendOTP() gin.HandlerFunc {
	return func(c *gin.Context) {
		from := os.Getenv("EMAIL_ID")
		password := os.Getenv("EMAIL_PASS")

		var to ToEmail
		err := c.ShouldBindJSON(&to)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email"})
			return
		}

		go func() {
			DeleteEntries(to.Email, 6)
		}()

		smtp_server := "smtp.gmail.com"
		smtp_port := "587"

		auth := smtp.PlainAuth("", from, password, smtp_server)

		var body bytes.Buffer
		body.Write([]byte(fmt.Sprintf("Subject: ConnVerse One Time Password \r\n\r\n")))

		auth_code := GenerateRandomString(6)
		mail_template := fmt.Sprintf("Hello, \nThis is your OTP for ConnVerse : %s (do not share with anyone)", auth_code)
		body.Write([]byte(mail_template))

		err = smtp.SendMail(smtp_server+":"+smtp_port, auth, from, []string{to.Email}, body.Bytes())
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

		err = CreatePassword(signup_details)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Sign Up Successful!"})
	}
}
