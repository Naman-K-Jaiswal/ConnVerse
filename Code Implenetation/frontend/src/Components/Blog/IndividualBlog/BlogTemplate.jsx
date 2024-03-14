import React, { useState } from 'react';
import './style.css';

const BlogTemplate = () => {

  const [comment, setComment] = useState([])

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const handleUpvote = () => {
    if (!upvoted) {
      setUpvoted(true);
      setDownvoted(false);
    } else {
      setUpvoted(false);
    }
  };

  const handleDownvote = () => {
    if (!downvoted) {
      setDownvoted(true);
      setUpvoted(false);
    } else {
      setDownvoted(false);
    }
  };

  const [blogData] = useState({
    ID: 1,
    Title: "Mastering the art of Leadership",
    Username: "User12",
    LastDate: "13 days ago",
    Upvotes: "10",
    ProfileImageSrc: require('./blog_img.jpeg'),
    BlogImages: require('./blog_img.jpeg'),
    Content: "Lorem ipsum dolor",
    Comments: [
      { ID: 1, Username: "User12", Content: "GoodJob", ProfileImage: require('./blog_img.jpeg')},
      { ID: 2, Username: "User12", Content: "GoodJob", ProfileImage: require('./blog_img.jpeg')},
    ]
  });

  return (
    <div id="mainBodyDiv">
      <div key={blogData.ID} id="leftHalfBlogDiv">
        <div id="headBlogDiv">
          <div id="profileImageBlogDiv">
            <img src={blogData.ProfileImageSrc} alt="" />
          </div>
          <div id="subHeadBlogDiv">
            <div id="titleBlogDiv">
              {blogData.Title}
            </div>
            <div id="subTitleBlogDiv">
              <div id="userDetailsBlogDiv">
                <div id="usernameBlogDiv">
                  {blogData.Username}
                </div>
                <div id="uploadedDayBlogDiv">
                  {blogData.LastDate}
                </div>
              </div>
              <div id="votesNCommentsBlogDiv">
                <div id="upVotesBlogDiv">
                  <button id="upVoteButton" onClick={handleUpvote} style={{ color: upvoted ? '#e2921b' : 'black' }}>
                    &#x21e7;
                  </button>
                  {blogData.Upvotes} 
                </div>
                <div id="downVotes">
                  <button id="downVoteButton" onClick={handleDownvote} style={{ color: downvoted ? 'red' : 'black' }}>
                    &#x21e9;
                  </button>
                </div>
                <div id="comments">
                  Comments: {blogData.Comments.length}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="imagesBlogDiv">
          <img src={blogData.BlogImages} alt="" />
        </div>
        <div id="contentBlogDiv">
          {blogData.Content}
        </div>
      </div>

      <div id="rightHalfCommentsDiv">
        <div id="headingCommentsDiv">
          Comments:
        </div>
        <div id="commentsListDiv">
          {blogData.Comments.map((comment) => (
            <div key={comment.ID} className="commentX">
              <div className="commentHeadingDiv">
                <div className="commentProfilePhoto">
                  <img src={comment.ProfileImage} alt="" />
                </div>
                <div className="commentTitle">
                  {comment.Username}
                </div>
              </div>
              <div className="commentContent">
                {comment.Content}
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
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default BlogTemplate;

