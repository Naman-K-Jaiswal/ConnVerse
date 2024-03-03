package authn

import (
	"backend/database"
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"math/rand"
	"time"
)

func GenerateRandomString(length int) string {
	rand.Seed(time.Now().UnixNano())

	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	result := make([]byte, length)

	for i := 0; i < length; i++ {
		result[i] = chars[rand.Intn(len(chars))]
	}

	return string(result)
}

func DeleteEntries(email string, ln int) {
	collection := database.DB.Collection("login_details")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if ln == 0 {
		_, err := collection.DeleteMany(ctx, bson.M{"email": email})
		if err != nil && !errors.Is(err, mongo.ErrNoDocuments) {
			log.Fatal(err)
		}
	} else {
		var temp LoginDetails
		cursor, err := collection.Find(ctx, bson.M{"email": email})
		if errors.Is(err, mongo.ErrNoDocuments) {
			return
		} else if err != nil {
			log.Fatal(err)
		}

		defer func(cursor *mongo.Cursor, ctx context.Context) {
			err := cursor.Close(ctx)
			if err != nil {
				log.Fatal(err)
			}
		}(cursor, ctx)

		for cursor.Next(ctx) {
			if err := cursor.Decode(&temp); err == nil && len(temp.Password) == ln {
				_, err := collection.DeleteOne(ctx, bson.M{"_id": temp.ID})
				if err != nil {
					log.Fatal(err)
				}
			}
		}
	}
}

func MatchPass(given_pass string, given_email string) int {
	var temp LoginDetails
	collection := database.DB.Collection("login_details")

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{"email": given_email})
	if errors.Is(err, mongo.ErrNoDocuments) {
		return 1
	} else if err != nil {
		return 1
	}

	flag := false

	for cursor.Next(ctx) {
		if err := cursor.Decode(&temp); err == nil && temp.Password == given_pass {
			flag = true
		}
	}

	if flag == true {
		return 0
	} else {
		return 2
	}
}

func CreatePassword(signup_details SignupDetails) error {
	DeleteEntries(signup_details.Email, 0)

	collection := database.DB.Collection("login_details")

	var login_detail LoginDetails = LoginDetails{
		ID:       primitive.NewObjectID(),
		Email:    signup_details.Email,
		Password: signup_details.NewPassword,
	}

	_, err := collection.InsertOne(context.Background(), login_detail)
	return err
}
