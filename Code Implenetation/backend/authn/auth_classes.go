package authn

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LoginDetails struct {
	ID       primitive.ObjectID `bson:"_id"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
}
