import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import MetaData from "../../../MetaData";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Loader from "../../Loader/Loader";
import { useToast } from "@chakra-ui/toast";

const BlogTemplate = () => {
  const { id } = useParams();
  const toast = useToast();

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [likes, setLikes] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [editable, isEditable] = useState(false);

  const [blogData, setBlogData] = useState({
    _id: "",
    title: "",
    content: "",
    image: "",
    authorid: "",
    authorname: "",
    authorimage: "",
    likes: 0,
    dislikes: 0,
    comments: [
      {
        commenttext: "",
        commenter: "",
        commenterphoto: "",
        timestamp: new Date(),
      },
    ],
    tags: [],
    timestamp: new Date(),
    likedby: [],
    dislikedby: [],
  });

  const handleUpvote = async () => {
    console.log(id);
    try {
      const res = await fetch(`https://connverse-hcgzo.ondigitalocean.app/blog/react/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: 1, userid: user.userId }),
      });

      if (res.ok) {
        if (!upvoted) {
          setUpvoted(true);
          setLikes(likes + 1);
          setDownvoted(false);
        } else {
          setUpvoted(false);
          setLikes(Math.max(likes - 1, 0));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await fetch(`https://connverse-hcgzo.ondigitalocean.app/blog/react/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: 2, userid: user.userId }),
      });

      if (res.ok) {
        if (!downvoted) {
          setDownvoted(true);
          setUpvoted(false);
          setLikes(Math.max(likes - 1, 0));
        } else {
          setDownvoted(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDaysAgo = (timestamp) => {
    const postDate = new Date(timestamp);
    return formatDistanceToNow(postDate, { addSuffix: true });
  };

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://connverse-hcgzo.ondigitalocean.app/blog/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setBlogData(data.blog);
          setLikes(data.blog.likes);
          if (data.blog.authorid == user.userId) {
            isEditable(true);
          }
          const response = await fetch(`https://connverse-hcgzo.ondigitalocean.app/feed/add/tags`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userid: user.userId,
              tags: data.blog.tags,
            }),
          });
          const index = data.blog.likedby.indexOf(user.userId);
          if (index !== -1) {
            setUpvoted(true);
            setDownvoted(false);
          }

          const idx = data.blog.dislikedby.indexOf(user.userId);
          if (idx !== -1) {
            setUpvoted(false);
            setDownvoted(true);
          }
        } else {
          toast({
            title: "Error Fetching Blog!",
            description: "Please reload the page",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      } catch (error) {}
      setLoading(false);
    };

    func();
  }, [id]);

  const handleComment = async () => {
    if (comment === "") {
      toast({
        title: "Comment cannot be empty!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const res = await fetch(`https://connverse-hcgzo.ondigitalocean.app/blog/comment/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commenttext: comment,
          commenter: user.userName,
          commenterphoto: user.userImage,
          timestamp: new Date(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedComment = [
          ...blogData.comments,
          {
            commenttext: comment,
            commenter: user.userName,
            commenterphoto: user.userImage,
            timestamp: new Date(),
          },
        ];
        const updatedBlogData = blogData;
        updatedBlogData.comments = updatedComment;
        setBlogData(updatedBlogData);
        setComment("");
      } else {
        toast({
          title: "Error Adding Comment!",
          description: "Please try again",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Error Adding Comment!",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `https://connverse-hcgzo.ondigitalocean.app/blog/compose/delete/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requesterid: blogData.authorid }),
        }
      );

      if (res.ok) {
        toast({
          title: "Blog Deleted Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/createblog");
      } else {
        toast({
          title: "Error Deleting Blog!",
          description: "Please try again",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Error Deleting Blog!",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <MetaData title={blogData.title} />
      {loading ? <Loader /> :
      <div id="mainBodyDiv">
        <div key={blogData.ID} id="leftHalfBlogDiv">
          <div id="headBlogDiv">
            <div id="profileImageBlogDiv">
              <img
                src={`data:image/jpeg;base64,${blogData.authorimage}`}
                alt=""
              />
            </div>
            <div id="subHeadBlogDiv">
              <div id="titleBlogDiv">{blogData.title}</div>
              <div id="subTitleBlogDiv">
                <div id="userDetailsBlogDiv">
                  <div id="rowUsername">
                    <div id="usernameBlogDiv" style={{ marginRight: "5vw" }}>
                      {blogData.authorname}
                    </div>
                    <div
                      id="votesNCommentsBlogDiv"
                      style={{ marginLeft: "4vw" }}
                    >
                      <div id="upVotesBlogDiv">
                        <button id="upVoteButton" onClick={handleUpvote}>
                          {upvoted ? (
                            <FavoriteIcon sx={{ color: "#e2921b" }} />
                          ) : (
                            <FavoriteBorderIcon sx={{ color: "black" }} />
                          )}
                        </button>
                        {likes}
                      </div>
                      <div id="downVotes">
                        <button id="downVoteButton" onClick={handleDownvote}>
                          {downvoted ? (
                            <HeartBrokenIcon sx={{ color: "black" }} />
                          ) : (
                            <HeartBrokenOutlinedIcon sx={{ color: "black" }} />
                          )}
                        </button>
                      </div>
                      <div
                        id="comments"
                        style={{
                          fontFamily: "Arial, sans-serif",
                          fontSize: "1.2em",
                          color: "#333",
                        }}
                      >
                        Comments:{" "}
                        {blogData.comments != null && blogData.comments.length}
                      </div>
                      {editable && (
                        <div>
                        <button
                          onClick={handleDelete}
                          style={{ cursor: "pointer" }}
                        >
                          <DeleteForeverOutlinedIcon sx={{ color: "black" }} />
                        </button>
                      </div>
                      )}
                    </div>
                  </div>
                  <div id="uploadedDayBlogDiv">
                    {getDaysAgo(blogData.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="contentBlogDiv" style={{ marginTop: "12vh" }}>
            <hr className="solid" />
            {blogData.content}
          </div>
          <div id="imagesBlogDiv">
            <img src={`data:image/jpeg;base64,${blogData.image}`} alt="" />
          </div>
        </div>

        <div id="rightHalfCommentsDiv">
          <div id="headingCommentsDiv">Comments</div>
          <div id="commentsListDiv">
            {blogData.comments != null &&
              blogData.comments.map((comment, index) => (
                <div key={index} className="commentX">
                  <div className="commentHeadingDiv">
                    <div className="commentProfilePhoto">
                      <img
                        src={`data:image/jpeg;base64,${comment.commenterphoto}`}
                        alt=""
                      />
                    </div>
                    <div className="commentTitle">{comment.commenter}</div>
                  </div>
                  <div className="commentContent">{comment.commenttext}</div>
                </div>
              ))}
          </div>
          <div id="addCommentsDiv">
            <input
              type="text"
              id="search"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleComment}>Submit</button>
          </div>
        </div>
        </div>
      }
    </>
  );
};

export default BlogTemplate;
