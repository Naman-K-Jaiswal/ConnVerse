package authn

import "github.com/gin-gonic/gin"

func LogOut() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.SetCookie("Authorization", "", -1, "", "", false, false)

		c.JSON(200, gin.H{
			"message": "Logged out",
		})
	}
}
