package authn

import (
	"backend/database"
	"backend/profile"
	"context"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"os"
	"time"
)

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		var login_details LoginDetails

		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Credentials", "true")

		err := c.ShouldBindJSON(&login_details)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		DeleteEntries(login_details.Email, 6)

		code := MatchPass(login_details.Password, login_details.Email)

		if code == 0 {
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"sub": login_details.Email,
				"exp": time.Now().Add(time.Hour * 24).Unix(),
			})

			tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
				return
			}

			c.SetSameSite(http.SameSiteLaxMode)
			c.SetCookie("Authorization", tokenString, 3600*24, "", "", false, false)

			collection := database.DB.Collection("Users")
			ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
			defer cancel()

			var user profile.User
			err = collection.FindOne(ctx, bson.M{"email": login_details.Email}).Decode(&user)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user details"})
				return
			}

			name := user.Nickname
			if name == "" {
				name = user.Name
			}

			c.JSON(http.StatusOK, gin.H{"message": "Log In Successful!", "img": user.ProfilePhoto, "name": name, "id": user.UserID})
		} else if code == 1 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email"})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password or email"})
		}
	}
}
