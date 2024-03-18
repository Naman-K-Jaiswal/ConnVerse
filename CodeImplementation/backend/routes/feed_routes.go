package routes

import (
	"github.com/Naman-K-Jaiswal/ConnVerse/feed"
	"github.com/Naman-K-Jaiswal/ConnVerse/middleware"
	"github.com/gin-gonic/gin"
)

func FeedRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.GET("/feed/load/:chunk/:id", middleware.RequireAuth, feed.LoadFeed())
	incomingRoutes.GET("/feed/reload/:id", middleware.RequireAuth, feed.ReloadFeed())
	incomingRoutes.POST("/feed/add/tags", middleware.RequireAuth, feed.AddTags())
}
