package routes

import (
	"backend/feed"
	"backend/middleware"
	"github.com/gin-gonic/gin"
)

func FeedRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.GET("/feed/load/:chunk/:id", middleware.RequireAuth, feed.LoadFeed())
	incomingRoutes.GET("/feed/reload/:id", middleware.RequireAuth, feed.ReloadFeed())
	incomingRoutes.POST("/feed/add/tags", middleware.RequireAuth, feed.AddTags())
}
