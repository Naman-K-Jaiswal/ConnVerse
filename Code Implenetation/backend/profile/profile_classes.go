package profile

type User struct {
	UserID       string       `json:"userid"`
	Name         string       `json:"name"`
	Nickname     string       `json:"nickname"`
	Email        string       `json:"email"`
	ProfilePhoto []byte       `json:"profilephoto"`
	BannerPhoto  []byte       `json:"bannerphoto"`
	Degree       string       `json:"degree"`
	About        string       `json:"about"`
	Skills       []string     `json:"skills"`
	BlogPosts    []string     `json:"blogposts"`
	Credentials  []Credential `json:"credentials"`
	Achievements []string     `json:"achievements"`
	Projects     []Project    `json:"projects"`
	Courses      []Course     `json:"courses"`
}

type Credential struct {
	Post         string `json:"post"`
	Organisation string `json:"organisation"`
	From         string `json:"from"`
	To           string `json:"to"`
}

type Project struct {
	Name           string `json:"name"`
	InstructorName string `json:"instructorname"`
	Description    string `json:"description"`
	From           string `json:"from"`
	To             string `json:"to"`
}

type Course struct {
	CourseName     string `json:"coursename"`
	InstructorName string `json:"instructorname"`
	Description    string `json:"description"`
	Year           string `json:"year"`
	Semester       string `json:"semester"`
}

type UserUpdate struct {
	UserID       string       `json:"userid"`
	Nickname     string       `json:"nickname"`
	ProfilePhoto []byte       `json:"profilephoto"`
	BannerPhoto  []byte       `json:"bannerphoto"`
	About        string       `json:"about"`
	Skills       []string     `json:"skills"`
	BlogPosts    []string     `json:"blogposts"`
	Credentials  []Credential `json:"credentials"`
	Achievements []string     `json:"achievements"`
	Projects     []Project    `json:"projects"`
	Courses      []Course     `json:"courses"`
}

type SearchQuery struct {
	UserID       string   `json:"userid"`
	Name         string   `json:"name"`
	Skills       []string `json:"skills"`
	Degree       string   `json:"degree"`
	Organization string   `json:"organisation"`
	Courses      []string `json:"courses"`
}
