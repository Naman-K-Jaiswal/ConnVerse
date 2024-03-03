package routes


import (
	"github.com/gin-gonic/gin"
	"backend/blog"
)

func BlogRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("blog/compose/new", blog.CreateBlogPost())
	incomingRoutes.POST("blog/compose/edit/:id", blog.EditBlogPost())
	incomingRoutes.GET("/blog/:id", blog.RetrieveBlogPost())
	incomingRoutes.POST("/blog/:id/comment", blog.CreateComment())
	incomingRoutes.POST("/blog/:id/comment/:commentID/reply", blog.AddReplyToComment())
	incomingRoutes.POST("/blog/:id/react",blog.LikeUnlikeBlogPost())
}
