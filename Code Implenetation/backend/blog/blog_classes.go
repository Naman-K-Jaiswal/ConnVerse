package blog

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type BlogPostRequest struct {
	Title       string   `json:"title"`
	Content     string   `json:"content"`
	Image       []byte   `json:"image"`
	Tags        []string `json:"tags"`
	AuthorID    string   `json:"authorid"`
	AuthorImage []byte   `json:"authorimage"`
	AuthorName  string   `json:"authorname"`
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
	ID          primitive.ObjectID `bson:"_id"`
	Title       string             `json:"title"`
	Content     string             `json:"content"`
	Image       []byte             `json:"image"`
	AuthorID    string             `json:"authorid"`
	AuthorName  string             `json:"authorname"`
	AuthorImage []byte             `json:"authorimage"`
	Likes       int                `json:"likes"`
	Dislikes    int                `json:"dislikes"`
	Comments    []Comment          `json:"comments"`
	Tags        []string           `json:"tags"`
	Timestamp   time.Time          `json:"timestamp"`
	LikedBy     []string           `json:"likedby"`
	DislikedBy  []string           `json:"dislikedby"`
}

type Comment struct {
	Content        string    `json:"commenttext"`
	Commenter      string    `json:"commenter"`
	CommenterPhoto []byte    `json:"commenterphoto"`
	Timestamp      time.Time `json:"timestamp"`
}

type SearchRequest struct {
	Title string `json:"title"`
}

type RetrieveRequest struct {
	AuthorId string `json:"authorid"`
}
