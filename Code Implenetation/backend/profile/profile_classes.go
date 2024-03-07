package profile

type User struct {
	UserID       string       `json:"userID"`
	Name         string       `json:"name"`
	Nickname     string       `json:"nickname"`
	ProfilePhoto []byte       `json:"profilePhoto"`
	BannerPhoto  []byte       `json:"bannerPhoto"`
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
	Name           string   `json:"name"`
	InstructorName string   `json:"instructorName"`
	Skills         []string `json:"skills"`
	Description    string   `json:"description"`
	From           string   `json:"from"`
	To             string   `json:"to"`
}

type Course struct {
	CourseName     string `json:"courseName"`
	InstructorName string `json:"instructorName"`
	Description    string `json:"description"`
	Year           string `json:"year"`
	Semester       string `json:"semester"`
}

type UserUpdate struct {
	UserID       string       `json:"userID"`
	Nickname     string       `json:"nickname"`
	ProfilePhoto []byte       `json:"profilePhoto"`
	BannerPhoto  []byte       `json:"bannerPhoto"`
	About        string       `json:"about"`
	Skills       []string     `json:"skills"`
	BlogPosts    []string     `json:"blogposts"`
	Credentials  []Credential `json:"credentials"`
	Achievements []string     `json:"achievements"`
	Projects     []Project    `json:"projects"`
	Courses      []Course     `json:"courses"`
}

type SearchQuery struct {
	UserID       string   `json:"userID"`
	Name         string   `json:"name"`
	Skills       []string `json:"skills"`
	Degree       string   `json:"degree"`
	Organization string   `json:"organisation"`
	Courses      []string `json:"courses"`
}
