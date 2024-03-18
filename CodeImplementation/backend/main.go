package main

import (
	"github.com/Naman-K-Jaiswal/ConnVerse/database"
	"github.com/Naman-K-Jaiswal/ConnVerse/mail"
	"github.com/Naman-K-Jaiswal/ConnVerse/routes"
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
		port = "8080"
	}

	database.InitDB()
	mail.InitMailSMTP()

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOriginFunc:  func(origin string) bool { return true },
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Content-Type"},
        AllowCredentials: true,
    }))

	routes.ProfilesRoutes(router)
	routes.BlogRoutes(router)
	routes.AuthRoutes(router)
	routes.FeedRoutes(router)

	err = router.Run(":" + port)
	if err != nil {
		log.Fatal(err)
	}
}
