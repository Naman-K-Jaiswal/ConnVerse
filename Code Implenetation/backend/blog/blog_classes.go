package blog

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)



type BlogPost struct {
	ID        primitive.ObjectID `bson:"_id"`
	Title     string             `json:"title"`
	Content   string             `json:"content"`
	Image     string             `json:"image"`
	UserID    string             `json:"userId"`
	Likes     int                `json:"likes"`
	Dislikes  int                `json:"dislikes"`
	Comments  []Comment          `json:"comments"`
	Tags      []string           `json:"tags"`
	Timestamp time.Time          `json:"timestamp"`
	LikedBy   []string 			 `json:"likedBy"`
	DislikedBy []string			 `json:"dislikedBy"`
}

type Comment struct {
	CommentID primitive.ObjectID `bson:"commentId"`
	Content   string             `json:"commentText"`
	UserID    string             `json:"commenterId"`
	Timestamp time.Time          `json:"timestamp"`
	Replies   []Comment 		 `json:"replies"`
}



// Returns the number of comments on this blog post


