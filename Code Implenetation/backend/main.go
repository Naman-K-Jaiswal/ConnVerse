package main

import (
	"backend/database"
	"backend/routes"
	"github.com/gin-gonic/gin"
	"log"
	"os"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	database.InitDB()

	router := gin.New()
	router.Use(gin.Logger())

	//routes.ProfilesRoutes(router)
	//routes.BlogRoutes(router)
	routes.AuthRoutes(router)
	//routes.FeedRoutes(router)

	err := router.Run(":" + port)
	if err != nil {
		log.Fatal(err)
	}
}
