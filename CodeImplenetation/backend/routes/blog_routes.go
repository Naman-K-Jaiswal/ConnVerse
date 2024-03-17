package routes

import (
	"backend/blog"
	"backend/middleware"
	"github.com/gin-gonic/gin"
)

func BlogRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/blog/compose/new", middleware.RequireAuth, blog.CreateBlogPost())
	incomingRoutes.POST("/blog/compose/edit/:id", middleware.RequireAuth, middleware.CRUDAuth, blog.EditBlogPost())
	incomingRoutes.POST("/blog/compose/delete/:id", middleware.RequireAuth, middleware.CRUDAuth, blog.DeleteBlogPost())
	incomingRoutes.GET("/blog/:id", middleware.RequireAuth, blog.RetrieveBlogPost())
	incomingRoutes.POST("/blog/retrieve", middleware.RequireAuth, blog.RetrieveBlogPosts())
	incomingRoutes.POST("/blog/comment/:id", middleware.RequireAuth, blog.CreateComment())
	incomingRoutes.POST("/blog/react/:id", middleware.RequireAuth, blog.LikeUnlikeBlogPost())
	incomingRoutes.POST("/blog/search", middleware.RequireAuth, blog.SearchBlogPosts())
}
