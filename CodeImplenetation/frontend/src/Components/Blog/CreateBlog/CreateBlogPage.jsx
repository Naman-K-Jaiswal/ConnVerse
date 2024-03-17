import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../MetaData";
import Loader1 from '../../Loader/Loader1';
import Loader from "../../Loader/Loader";
import { useToast } from "@chakra-ui/toast";

const CreateBlogPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    authorID: "",
    tags: [],
  });

  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const [profileDetails, setProfileDetails] = useState({
    username: user.userName,
    totalPoints: "",
    postsThisYear: "",
    contributions: "",
    profileImg: user.userImage,
  });

  const getPosts = async () => {
    try {
      const us = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:8080/blog/retrieve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ authorid: us.userId }),
      });
      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        const updatedPosts = data.posts;
        if (data.posts == null) {
          setLoading(false)
        } else {
          if (data.posts.length === 0) {
            setLoading(false)
          }
        }

        if (updatedPosts != null) {
          setPosts(updatedPosts);
          const totalLikes = updatedPosts.reduce(
            (acc, post) => acc + post.likes,
            0
          );
          const totalDislikes = updatedPosts.reduce(
            (acc, post) => acc + post.dislikes,
            0
          );
          const totalPoints = totalLikes - totalDislikes;
          const contributions = updatedPosts.length;

          // Find posts made this year
          const currentYear = new Date().getFullYear();
          const postsThisYear = updatedPosts.filter(
            (post) => new Date(post.timestamp).getFullYear() === currentYear
          ).length;

          setProfileDetails({
            ...profileDetails,
            totalPoints,
            postsThisYear,
            contributions,
          });
        }
      } else {
        toast({
            title: "Please Try Again!",
            description: "Failed to retrieve your Blog Posts",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });

      }
    } catch (error) {
      toast({
            title: "Please Try Again!",
            description: "Failed to retrieve your Blog Posts",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getDaysAgo = (timestamp) => {
    const postDate = new Date(timestamp);
    return formatDistanceToNow(postDate, { addSuffix: true });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      Promise.all([convertToBase64(files[0])]).then(([img]) => {
        console.log(img.substring(23));
        setPostData((prevData) => ({ ...prevData, [name]: img.substring(23) }));
      });
    } else if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setPostData((prevData) => ({ ...prevData, [name]: tagsArray }));
    } else {
      setPostData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const us = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:8080/blog/compose/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          image: postData.image,
          tags: postData.tags,
          authorid: us.userId,
          authorimage: us.userImage,
          authorname: us.userName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPosts((prevPosts) => [data.blog, ...prevPosts]);
        toast({
            title: "Blog post created successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setProfileDetails({
          username: profileDetails.username,
          totalPoints: profileDetails.totalPoints,
          postsThisYear: profileDetails.postsThisYear + 1,
          contributions: profileDetails.contributions + 1,
          profileImg: us.userImage,
        });
        setPostData({
          title: "",
          content: "",
          image: postData.image,
          authorID: us.userId,
          tags: [],
        });
      } else {
        console.error("Failed to create blog post");
        toast({
          title: "Please Try Again!",
          description: "Failed to create blog post",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
          title: "Please Try Again!",
          description: "Failed to create blog post",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    }
  };

  const handleRedirect = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <MetaData title="Create Blog" />
      {loading ? <Loader/> : 
        <div id={styles.mainBody}>
        {/* Main Body */}
        <div id={styles.mainBody}>
          {/* Upper Half */}
          <div id={styles.upperHalf}>
            {/* Activity Section */}
            <div id={styles.activitySection}>
              <div id={styles.yourActivity}>Your Activity</div>
              <div id={styles.previousBlogs}>
                <div id={styles.searchBlogs}>
                  <input
                    type="text"
                    id={styles.search}
                    placeholder="Search Blogs"
                  />
                  <button id={styles.searchButton}>Search</button>
                </div>
                <div id={styles.blogsList}>
                  {/* {posts!=null && posts.length === 0 && <Loader1/>} */}
                  {posts!=null && posts.length > 0 &&
                    posts.map((blog, index) => (
                      <div
                        key={index}
                        className={styles.blogItemPrevBlogX}
                        onClick={() => handleRedirect(blog.ID)}
                      >
                        <div className={styles.blogItemTop}>
                          <div className={styles.blogItemHeading}>
                            <div
                              className={styles.blogItemTitle}
                              style={{
                                fontFamily: "Arial, sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              {blog.title}
                            </div>
                            <div
                              className={styles.blogItemLastTime}
                              style={{
                                fontFamily: "Georgia, serif",
                                fontStyle: "italic",
                              }}
                            >
                              {getDaysAgo(blog.timestamp)}
                            </div>
                          </div>
                          <div className={styles.blogItemTags}>
                            {blog.tags.map((tag, index) => (
                              <div
                                key={index}
                                className={styles.blogItemTagX}
                                style={{
                                  fontFamily: "Helvetica, sans-serif",
                                  fontWeight: "bold",
                                }}
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div id={styles.profileDetails}>
              <hr className={styles.dottedLine} />
              <img
                id={styles.profile_photo}
                src={`data:image/jpeg;base64,${profileDetails.profileImg}`}
                alt="Profile Photo"
                className={styles["profile-photo"]}
              />
              <div
                id={styles.username}
                style={{
                  fontFamily: "helvetica neue, Helvetica, Arial, sans-serif",
                  textDecoration: "none !important",
                  fontWeight: 700,
                  color: "black",
                }}
              >
                {" "}
                {profileDetails.username}
              </div>
              <div
                id={styles["total-points"]}
                style={{
                  fontFamily: "helvetica neue, Helvetica, Arial, sans-serif",
                  textDecoration: "none !important",
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Total Points:{" "}
                <span
                  style={{
                    color: profileDetails.totalPoints < 10 ? "red" : "green",
                  }}
                >
                  {profileDetails.totalPoints}
                </span>
              </div>
              <div
                id={styles["points-this-year"]}
                style={{
                  fontFamily: "helvetica neue, Helvetica, Arial, sans-serif",
                  textDecoration: "none !important",
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Posts This Year: {profileDetails.postsThisYear}
              </div>
              <div
                id={styles.contributions}
                style={{
                  fontFamily: "helvetica neue, Helvetica, Arial, sans-serif",
                  textDecoration: "none !important",
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Total Posts: {profileDetails.contributions}
              </div>
            </div>
          </div>

          {/* Edit Blog Section */}
          <div id={styles.editBlog}>
            <div
              className={styles["input-group"]}
              id={styles["input-group-title"]}
            >
              <label htmlFor={styles.title}>TITLE:</label>
              <input
                type="text"
                id={styles.title}
                placeholder="Enter title"
                name="title"
                value={postData.title}
                onChange={handleChange}
              />
            </div>
            <div
              className={styles["input-group"]}
              id={styles["input-group-tags"]}
            >
              <label htmlFor={styles.tags}>TAGS:</label>
              <input
                type="text"
                id={styles.tags}
                placeholder="Enter maximum of three tags separated by commas"
                name="tags"
                value={postData.tags}
                onChange={handleChange}
              />
            </div>
            <div
              className={styles["input-group"]}
              id={styles["input-group-images"]}
            >
              <label htmlFor={styles.images}>IMAGES:</label>
              <input
                type="file"
                id={styles.images}
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            <div id={styles.content}>
              <textarea
                id={styles.content}
                placeholder="What do you want to share"
                name="content"
                value={postData.content}
                onChange={handleChange}
              ></textarea>
              <button id={styles.uploadButton} onClick={handleSubmit}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default CreateBlogPage;
