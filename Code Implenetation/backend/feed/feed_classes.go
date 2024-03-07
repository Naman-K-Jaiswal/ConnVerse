package feed

type Feed struct {
	UserID  string   `json:"userID"`
	BlogIDs []string `json:"blogIDs"`
	Tags    []string `json:"tags"`
}

type TagRequest struct {
	UserID string   `json:"userID"`
	Tags   []string `json:"tags"`
}
