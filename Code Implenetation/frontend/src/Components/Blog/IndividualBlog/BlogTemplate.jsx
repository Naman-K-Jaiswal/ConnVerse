import React, {useEffect, useState} from 'react';
import './style.css';
import { useNavigate, useParams} from "react-router-dom";
import {formatDistanceToNow} from "date-fns";
import MetaData from '../../../MetaData';
import { useToast } from "@chakra-ui/toast";
import Loader from '../../Loader/Loader';

const BlogTemplate = () => {
  const toast = useToast();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [comment, setComment] = useState("")

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [likes, setLikes] = useState(0)
  const user = JSON.parse(localStorage.getItem("user"));

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
        timestamp: new Date()
      }
    ],
    tags: [],
    timestamp: new Date(),
    likedby: [],
    dislikedby: []
  })

  const handleUpvote = async () => {
    console.log(id)
    try {
      const res = await fetch(`http://localhost:8080/blog/react/${id}`, {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action:1, userid: user.userId }),
      })

      if(res.ok){
        if (!upvoted) {
          setUpvoted(true);
          setLikes(likes+1)
          setDownvoted(false);
        } else {
          setUpvoted(false);
          setLikes(Math.max(likes-1,0))
        }
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await fetch(`http://localhost:8080/blog/react/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 2, userid: user.userId }),
      })

      if(res.ok){
        if (!downvoted) {
          setDownvoted(true);
          setUpvoted(false);
        } else {
          setDownvoted(false);
        }
      }
    } catch (error) {
      console.error(error)
    }
  };

  const getDaysAgo = (timestamp) => {
    const postDate = new Date(timestamp);
    return formatDistanceToNow(postDate, { addSuffix: true });
  }

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/blog/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if(res.ok) {
          const data = await res.json()
          setBlogData(data.blog)
          setLikes(data.blog.likes)
          const response = await fetch(`http://localhost:8080/feed/add/tags`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userid: user.userId,
              tags: data.blog.tags
            })
          })
          const index = data.blog.likedby.indexOf(user.userId)
          if (index !== -1) {
            setUpvoted(true)
            setDownvoted(false)
          }

          const idx = data.blog.dislikedby.indexOf(user.userId)
          if(idx !== -1){
            setUpvoted(false)
            setDownvoted(true)
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
      } catch (error) {
      }
      setLoading(false);
    }
    func()
  }, [id]);

  const handleComment = async () => {
    try {
      const res = await fetch(`http://localhost:8080/blog/comment/${id}`, {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commenttext: comment, commenter: user.userName, commenterphoto: user.userImage , timestamp: new Date() }),
      })

      if(res.ok){
        const data = await res.json()
        const updatedComment = [...blogData.comments, {
            commenttext: comment,
            commenter: user.userName,
            commenterphoto: user.userImage,
            timestamp: new Date()
        }]
        const updatedBlogData = blogData
        updatedBlogData.comments = updatedComment
        setBlogData(updatedBlogData)
        setComment("")
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
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/blog/compose/delete/${id}`, {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requesterid: blogData.authorid }),
      })

      if(res.ok){
        navigate('/createblog')
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
  }

  return (
    <>
      <MetaData title={blogData.title} />
      {loading ? <Loader/> : 
        <div id="mainBodyDiv">
          <div key={blogData.ID} id="leftHalfBlogDiv">
            <div id="headBlogDiv">
              <div id="profileImageBlogDiv">
                <img src={`data:image/jpeg;base64,${blogData.authorimage}`} alt="" />
              </div>
              <div id="subHeadBlogDiv">
                <div id="titleBlogDiv">
                  {blogData.title}
                </div>
                <div id="subTitleBlogDiv">
                  <div id="userDetailsBlogDiv">
                    <div id="usernameBlogDiv">
                      {blogData.authorname}
                    </div>
                    <div id="uploadedDayBlogDiv">
                      {getDaysAgo(blogData.timestamp)}
                    </div>
                    <div>
                      <button onClick={handleDelete}>Delete</button>
                    </div>
                  </div>
                  <div id="votesNCommentsBlogDiv">
                    <div id="upVotesBlogDiv">
                      <button id="upVoteButton" onClick={handleUpvote} style={{ color: upvoted ? '#e2921b' : 'black' }}>
                        &#x21e7;
                      </button>
                      {likes}
                    </div>
                    <div id="downVotes">
                      <button id="downVoteButton" onClick={handleDownvote} style={{ color: downvoted ? 'red' : 'black' }}>
                        &#x21e9;
                      </button>
                    </div>
                    <div id="comments">
                      Comments: {blogData.comments!=null && blogData.comments.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="imagesBlogDiv">
              <img src={`data:image/jpeg;base64,${blogData.image}`} alt="" />
            </div>
            <div id="contentBlogDiv">
              {blogData.content}
            </div>
          </div>

          <div id="rightHalfCommentsDiv">
            <div id="headingCommentsDiv">
              Comments:
            </div>
            <div id="commentsListDiv">
              {blogData.comments!=null && blogData.comments.map((comment, index) => (
                  <div key={index} className="commentX">
                    <div className="commentHeadingDiv">
                      <div className="commentProfilePhoto">
                        <img src={`data:image/jpeg;base64,${comment.commenterphoto}`} alt="" />
                      </div>
                      <div className="commentTitle">
                        {comment.commenter}
                      </div>
                    </div>
                    <div className="commentContent">
                      {comment.commenttext}
                    </div>
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
}

export default BlogTemplate;