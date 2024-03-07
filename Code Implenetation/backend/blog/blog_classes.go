package blog

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type BlogPostRequest struct {
	Title    string   `form:"title" json:"title"`
	Content  string   `form:"content" json:"content"`
	Image    []byte   `form:"image" json:"image"`
	Tags     []string `form:"tags" json:"tags"`
	AuthorID int      `form:"authorId" json:"authorId"`
}

type EditPostRequest struct {
	Title           string   `form:"title" json:"title"`
	Content         string   `form:"content" json:"content"`
	Image           []byte   `form:"image" json:"image"`
	Tags            []string `form:"tags" json:"tags"`
	DeleteCommentID []int    `form:"deleteCommentId" json:"deleteCommentId"`
}

type ReactRequest struct {
	Action int `json:"action"`
	UserID int `json:"userId"`
}

type BlogPost struct {
	ID         primitive.ObjectID `bson:"_id"`
	Title      string             `json:"title"`
	Content    string             `json:"content"`
	Image      []byte             `json:"image"`
	AuthorID   int                `json:"authorId"`
	Likes      int                `json:"likes"`
	Dislikes   int                `json:"dislikes"`
	Comments   []Comment          `json:"comments"`
	Tags       []string           `json:"tags"`
	Timestamp  time.Time          `json:"timestamp"`
	LikedBy    []int              `json:"likedBy"`
	DislikedBy []int              `json:"dislikedBy"`
}

type Comment struct {
	Content     string    `json:"commentText"`
	CommenterID int       `json:"commenterId"`
	Timestamp   time.Time `json:"timestamp"`
}

// Returns the number of comments on this blog post
