package main

import (
	"backend/database"
	"backend/mail"
	"backend/routes"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		return
	}

	port := os.Getenv("PORT")

	if port == "" {
		fmt.Println("PORT environment variable not set")
		return
	}

	database.InitDB()
	mail.InitMailSMTP()

	router := gin.New()
	router.Use(gin.Logger())
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{os.Getenv("FRONTEND_URL")}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	routes.ProfilesRoutes(router)
	routes.BlogRoutes(router)
	routes.AuthRoutes(router)
	routes.FeedRoutes(router)

	err = router.Run(":" + port)
	if err != nil {
		log.Fatal(err)
	}
}
