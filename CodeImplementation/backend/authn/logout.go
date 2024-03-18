package authn

import "github.com/gin-gonic/gin"

func LogOut() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Credentials", "true")

		c.SetCookie("Authorization", "", -1, "/", "localhost", false, false)

		c.JSON(200, gin.H{
			"message": "Logged out",
		})
	}
}
