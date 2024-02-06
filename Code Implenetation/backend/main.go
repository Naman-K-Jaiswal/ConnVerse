package main

import (
	"backend/database"
	"backend/routes"
	"fmt"
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

	router := gin.New()
	router.Use(gin.Logger())

	//routes.ProfilesRoutes(router)
	//routes.BlogRoutes(router)
	routes.AuthRoutes(router)
	//routes.FeedRoutes(router)

	err = router.Run(":" + port)
	if err != nil {
		log.Fatal(err)
	}
}
