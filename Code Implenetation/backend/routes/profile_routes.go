package routes

import (
	"github.com/gin-gonic/gin"
	"backend/profile"
)

func ProfilesRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/profile/create", profile.CreateUserProfile())
	//incomingRoutes.PUT("/profile/changes", profile.SaveProfile())
	incomingRoutes.GET("/profile/:id", profile.RetrieveUserProfile())
}
