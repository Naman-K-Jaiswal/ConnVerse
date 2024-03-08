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
	AuthorID string   `form:"authorid" json:"authorid"`
}

type EditPostRequest struct {
	Title           string   `form:"title" json:"title"`
	Content         string   `form:"content" json:"content"`
	Image           []byte   `form:"image" json:"image"`
	Tags            []string `form:"tags" json:"tags"`
	DeleteCommentID []int    `form:"deletecommentid" json:"deletecommentid"`
	AuthorID        string   `form:"authorid" json:"authorid"`
}

type ReactRequest struct {
	Action int    `json:"action"`
	UserID string `json:"userid"`
}

type BlogPost struct {
	ID         primitive.ObjectID `bson:"_id"`
	Title      string             `json:"title"`
	Content    string             `json:"content"`
	Image      []byte             `json:"image"`
	AuthorID   string             `json:"authorid"`
	Likes      int                `json:"likes"`
	Dislikes   int                `json:"dislikes"`
	Comments   []Comment          `json:"comments"`
	Tags       []string           `json:"tags"`
	Timestamp  time.Time          `json:"timestamp"`
	LikedBy    []string           `json:"likedby"`
	DislikedBy []string           `json:"dislikedby"`
}

type Comment struct {
	Content     string    `json:"commenttext"`
	CommenterID string    `json:"commenterid"`
	Timestamp   time.Time `json:"timestamp"`
}

// Returns the number of comments on this blog post
