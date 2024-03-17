package feed

type Feed struct {
	UserID  string   `json:"userid"`
	BlogIDs []string `json:"blogids"`
	Tags    []string `json:"tags"`
}

type TagRequest struct {
	UserID string   `json:"userid"`
	Tags   []string `json:"tags"`
}
