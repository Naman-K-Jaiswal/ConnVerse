package authn

import (
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"time"
)

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		var login_details LoginDetails
		var stored_login_details LoginDetails

		err := c.ShouldBindJSON(&login_details)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		collection := database.DB.Collection("login_details")

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		err = collection.FindOne(ctx, bson.M{"email": login_details.Email}).Decode(&stored_login_details)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email"})
			return
		}

		if login_details.Password == stored_login_details.Password {
			c.JSON(http.StatusOK, gin.H{})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		}
	}
}
