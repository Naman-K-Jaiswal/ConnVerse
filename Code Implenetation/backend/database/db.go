package database

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
)

var DB *mongo.Database

func InitDB() {
	client_options := options.Client().ApplyURI("mongodb+srv://user:mahadevs@cluster0.4f7oefr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
	client, err := mongo.Connect(context.Background(), client_options)
	if err != nil {
		log.Fatal(err)
	}
	DB = client.Database("ConnVerse")
}
