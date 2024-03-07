package routes

import (
	"backend/middleware"
	"backend/profile"
	"github.com/gin-gonic/gin"
)

func ProfilesRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/profile/create", middleware.RequireAuth, profile.CreateUserProfile())
	incomingRoutes.POST("/profile/update", middleware.RequireAuth, profile.UpdateUserProfile())
	incomingRoutes.POST("/profile/search", middleware.RequireAuth, profile.SearchUserProfile())
	incomingRoutes.GET("/profile/:id", middleware.RequireAuth, profile.RetrieveUserProfile())
}
