package profile

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func SearchUserProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		var search_query SearchQuery	
		if err := c.ShouldBindJSON(&search_query); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var users []User
		temp := GetUserByIDs(search_query.UserID)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNameAndDegreeAndSkillsAndOrganizationAndCourses(search_query.Name, search_query.Degree, search_query.Skills, search_query.Organization, search_query.Courses)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNicknameAndDegreeAndSkillsAndOrganizationAndCourses(search_query.Name, search_query.Degree, search_query.Skills, search_query.Organization, search_query.Courses)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNameAndDegreeAndSkillsAndCourses(search_query.Name, search_query.Degree, search_query.Skills, search_query.Courses)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNicknameAndDegreeAndSkillsAndCourses(search_query.Name, search_query.Degree, search_query.Skills, search_query.Courses)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNameAndDegreeAndSkillsAndOrganization(search_query.Name, search_query.Degree, search_query.Skills, search_query.Organization)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNicknameAndDegreeAndSkillsAndOrganization(search_query.Name, search_query.Degree, search_query.Skills, search_query.Organization)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNameAndDegreeAndSkills(search_query.Name, search_query.Degree, search_query.Skills)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNicknameAndDegreeAndSkills(search_query.Name, search_query.Degree, search_query.Skills)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNameAndDegree(search_query.Name, search_query.Degree)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNicknameAndDegree(search_query.Name, search_query.Degree)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNameAndOrganization(search_query.Name, search_query.Organization)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNicknameAndOrganization(search_query.Name, search_query.Organization)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNameAndCourses(search_query.Name, search_query.Courses)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNicknameAndCourses(search_query.Name, search_query.Courses)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNameAndSkills(search_query.Name, search_query.Skills)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNicknameAndSkills(search_query.Name, search_query.Skills)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByName(search_query.Name)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByNickname(search_query.Name)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByDegree(search_query.Degree)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersBySkills(search_query.Skills)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByOrganization(search_query.Organization)
		if temp != nil {
			users = append(users, temp...)
		}

		temp = GetUsersByCourses(search_query.Courses)
		if temp != nil {
			users = append(users, temp...)
		}

		c.JSON(http.StatusOK, gin.H{"users": users})
	}
}
