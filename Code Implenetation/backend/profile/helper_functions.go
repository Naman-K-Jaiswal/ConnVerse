package profile

import (
	"backend/database"
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

func InitializeUser(res bson.M) error {
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	url := "https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/" + res["i"].(string) + "_0.jpg"
	banner_url := "https://dummyimage.com/16:9x1080/"

	response, err := http.Get(url)
	if err != nil {
		return err
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("Error closing response body:", err)
		}
	}(response.Body)

	imageBytes, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return err
	}

	response, err = http.Get(banner_url)
	if err != nil {
		return err
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("Error closing response body:", err)
		}
	}(response.Body)

	bannerBytes, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return err
	}

	new_user := User{
		UserID:       res["i"].(string),
		Name:         res["n"].(string),
		Degree:       res["p"].(string) + " " + res["d"].(string),
		ProfilePhoto: imageBytes,
		BannerPhoto:  bannerBytes,
	}

	_, err = collection.InsertOne(ctx, new_user)
	if err != nil {
		return err
	}

	return nil
}

func AddUserToDB(new_user User) (string, error) {
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	res, err := collection.InsertOne(ctx, new_user)
	if err != nil {
		log.Fatal(err)
		return "", err
	}

	id := res.InsertedID.(primitive.ObjectID).Hex()
	return id, nil
}

func UpdateUserInDB(updated_user UserUpdate) error {
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	_, err := collection.UpdateOne(ctx, bson.M{"userID": updated_user.UserID}, bson.M{"$set": updated_user})
	if err != nil {
		return err
	}

	return nil
}

func GetUserByNickName(nickname string) (*User, error) {
	if nickname == "" {
		return nil, nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var user User
	err := collection.FindOne(ctx, User{Nickname: nickname}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func GetUsersByName(name string) []User {
	if name == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"name": bson.M{"$regex": primitive.Regex{Pattern: name, Options: "i"}}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNickname(nickname string) []User {
	if nickname == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"nickname": bson.M{"$regex": primitive.Regex{Pattern: nickname, Options: "i"}}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersBySkills(skills []string) []User {
	if len(skills) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"skills": bson.M{"$in": skills}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByDegree(degree string) []User {
	if degree == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"degree": bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByOrganization(organization string) []User {
	if organization == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"credentials.organisation": bson.M{"$regex": primitive.Regex{Pattern: organization, Options: "i"}}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByCourses(courses []string) []User {
	if len(courses) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"courses.courseName": bson.M{"$in": courses}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUserByID(userID string) (*User, error) {
	if userID == "" {
		return nil, nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"userID": bson.M{"$regex": primitive.Regex{Pattern: userID, Options: "i"}}}
	var user User
	err := collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func GetUsersByNameAndSkills(name string, skills []string) []User {
	if name == "" || len(skills) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"name": bson.M{"$regex": primitive.Regex{Pattern: name, Options: "i"}}, "skills": bson.M{"$in": skills}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNameAndDegree(name string, degree string) []User {
	if name == "" || degree == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"name": bson.M{"$regex": primitive.Regex{Pattern: name, Options: "i"}}, "degree": bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNameAndOrganization(name string, organization string) []User {
	if name == "" || organization == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"name": bson.M{"$regex": primitive.Regex{Pattern: name, Options: "i"}}, "credentials.organisation": bson.M{"$regex": primitive.Regex{Pattern: organization, Options: "i"}}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNameAndCourses(name string, courses []string) []User {
	if name == "" || len(courses) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"name": bson.M{"$regex": primitive.Regex{Pattern: name, Options: "i"}}, "courses.courseName": bson.M{"$in": courses}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNicknameAndSkills(nickname string, skills []string) []User {
	if nickname == "" || len(skills) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"nickname": bson.M{"$regex": primitive.Regex{Pattern: nickname, Options: "i"}}, "skills": bson.M{"$in": skills}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNicknameAndDegree(nickname string, degree string) []User {
	if nickname == "" || degree == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"nickname": bson.M{"$regex": primitive.Regex{Pattern: nickname, Options: "i"}}, "degree": bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNicknameAndOrganization(nickname string, organization string) []User {
	if nickname == "" || organization == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"nickname": bson.M{"$regex": primitive.Regex{Pattern: nickname, Options: "i"}}, "credentials.organisation": bson.M{"$regex": primitive.Regex{Pattern: organization, Options: "i"}}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNicknameAndCourses(nickname string, courses []string) []User {
	if nickname == "" || len(courses) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"nickname": bson.M{"$regex": primitive.Regex{Pattern: nickname, Options: "i"}}, "courses.courseName": bson.M{"$in": courses}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNameAndDegreeAndSkills(name string, degree string, skills []string) []User {
	if name == "" || degree == "" || len(skills) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"name": bson.M{"$regex": primitive.Regex{Pattern: name, Options: "i"}}, "degree": bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}, "skills": bson.M{"$in": skills}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNameAndDegreeAndSkillsAndOrganization(name string, degree string, skills []string, organization string) []User {
	if name == "" || degree == "" || len(skills) == 0 || organization == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{}
	filter["name"] = bson.M{"$regex": primitive.Regex{Pattern: name, Options: "i"}}
	filter["degree"] = bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}
	filter["skills"] = bson.M{"$in": skills}
	filter["credentials.organisation"] = bson.M{"$regex": primitive.Regex{Pattern: organization, Options: "i"}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNameAndDegreeAndSkillsAndCourses(name string, degree string, skills []string, courses []string) []User {
	if name == "" || degree == "" || len(skills) == 0 || len(courses) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{}
	filter["name"] = bson.M{"$regex": primitive.Regex{Pattern: name, Options: "i"}}
	filter["degree"] = bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}
	filter["skills"] = bson.M{"$in": skills}
	filter["courses.courseName"] = bson.M{"$in": courses}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNicknameAndDegreeAndSkills(nickname string, degree string, skills []string) []User {
	if nickname == "" || degree == "" || len(skills) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{}
	filter["nickname"] = bson.M{"$regex": primitive.Regex{Pattern: nickname, Options: "i"}}
	filter["degree"] = bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}
	filter["skills"] = bson.M{"$in": skills}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNicknameAndDegreeAndSkillsAndOrganization(nickname string, degree string, skills []string, organization string) []User {
	if nickname == "" || degree == "" || len(skills) == 0 || organization == "" {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{}
	filter["nickname"] = bson.M{"$regex": primitive.Regex{Pattern: nickname, Options: "i"}}
	filter["degree"] = bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}
	filter["skills"] = bson.M{"$in": skills}
	filter["credentials.organisation"] = bson.M{"$regex": primitive.Regex{Pattern: organization, Options: "i"}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNicknameAndDegreeAndSkillsAndCourses(nickname string, degree string, skills []string, courses []string) []User {
	if nickname == "" || degree == "" || len(skills) == 0 || len(courses) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{}
	filter["nickname"] = bson.M{"$regex": primitive.Regex{Pattern: nickname, Options: "i"}}
	filter["degree"] = bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}
	filter["skills"] = bson.M{"$in": skills}
	filter["courses.courseName"] = bson.M{"$in": courses}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNameAndDegreeAndSkillsAndOrganizationAndCourses(name string, degree string, skills []string, organization string, courses []string) []User {
	if name == "" || degree == "" || len(skills) == 0 || organization == "" || len(courses) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{}
	filter["name"] = bson.M{"$regex": primitive.Regex{Pattern: name, Options: "i"}}
	filter["degree"] = bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}
	filter["skills"] = bson.M{"$in": skills}
	filter["credentials.organisation"] = bson.M{"$regex": primitive.Regex{Pattern: organization, Options: "i"}}
	filter["courses.courseName"] = bson.M{"$in": courses}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}

func GetUsersByNicknameAndDegreeAndSkillsAndOrganizationAndCourses(nickname string, degree string, skills []string, organization string, courses []string) []User {
	if nickname == "" || degree == "" || len(skills) == 0 || organization == "" || len(courses) == 0 {
		return nil
	}
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{}
	filter["nickname"] = bson.M{"$regex": primitive.Regex{Pattern: nickname, Options: "i"}}
	filter["degree"] = bson.M{"$regex": primitive.Regex{Pattern: degree, Options: "i"}}
	filter["skills"] = bson.M{"$in": skills}
	filter["credentials.organisation"] = bson.M{"$regex": primitive.Regex{Pattern: organization, Options: "i"}}
	filter["courses.courseName"] = bson.M{"$in": courses}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	var users []User
	err = cursor.All(ctx, &users)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	return users
}
