package authn

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LoginDetails struct {
	ID       primitive.ObjectID `bson:"_id"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
}

type ToEmail struct {
	Email string `json:"email"`
}

type SignupDetails struct {
	Email       string `json:"email"`
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}
