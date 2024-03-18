package feed

func calcScore(tgs map[string][]string, mp map[string]bool, id string) int {
	ct := 0
	for _, str := range tgs[id] {
		if mp[str] {
			ct++
		}
	}

	return ct
}
