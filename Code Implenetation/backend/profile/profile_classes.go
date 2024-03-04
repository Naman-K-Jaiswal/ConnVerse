package profile
import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type User struct {
	ID           primitive.ObjectID `json:"id" bson:"_id"`
	Name         string     `json:"Name"`
	Degree       string     `json:"degree"`
	About        string     `json:"about"`
	Skills       []string   `json:"skills"`
	BlogPosts    []string      `json:"blogposts"`
	Credentials  []Credential `json:"credentials"`
	Achievements []string   `json:"achievements"`
	Projects     []Project  `json:"projects"`
	Courses      []Course   `json:"courses"`
	CreatedAt    time.Time  `json:"created_at"`
}

type Credential struct {
	Post         string `json:"post"`
	Organisation string `json:"organisation"`
	Year         string `json:"year"`
}

type Project struct {
	Name           string   `json:"name"`
	InstructorName string   `json:"instructorName"`
	Skills         []string `json:"skills"`
	Description    string   `json:"description"`
	StartDate      string   `json:"startDate"` 
}

type Course struct {
	CourseName     string `json:"courseName"`
	InstructorName string `json:"instructorName"`
	Description    string `json:"description"`
	StartDate      string `json:"startDate"` 
}
