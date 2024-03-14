package database

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
)

var DB *mongo.Database

func InitDB() {
	client_options := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.Background(), client_options)
	if err != nil {
		log.Fatal(err)
	}
	DB = client.Database("ConnVerse")
}
