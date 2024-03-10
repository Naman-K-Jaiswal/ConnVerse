import React,{useState} from 'react';
import './style.css';


const BlogTemplate = () => {

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

  const blogData = [
    {
      id: 1,
      title: "Mastering the art of Leadership",
      username: "User12",
      lastDate: "13 days ago",
      upvotes: "10",
      noOfComments: "12",
      profileImageSrc: require('./blog_img.jpeg'),
      blogImages: require('./blog_img.jpeg'),
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque r Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque re Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque re Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque re Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque reLorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum harum minus nobis at laborum qui et tempora. Sequi dolorum iste amet vitae harum exercitationem deserunt vel doloremque eveniet facere.  Maiores ipsam quasi officiis atque error magnam facilis enim, perspiciatis voluptas illum delectus aperiam ipsa quos sed harum recusandae totam porro ab? At nisi est facilis necessitatibus nemo, officiis cumque!Esse veritatis illum delenitcusantium deserunt tempore quis impedit sit aliquid minima non, mollitia neque harum modi esse maiores libero cum. Minus similique officia ratione est porro! Incidunt, cumque recumque recumque reepudiandae"
,
      comments: [
        { id: 1, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg')},
        { id: 2, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg')},
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 4, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg')},
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
        { id: 3, username: "User12", content: "GoodJob", profileImage: require('./blog_img.jpeg') },
      ]
    }
  ];

  return (
    <div id="mainBodyDiv">
      {blogData.map((blog) => (
        <div key={blog.id} id="leftHalfBlogDiv">
          <div id="headBlogDiv">
            <div id="profileImageBlogDiv">
              <img src={blog.profileImageSrc} alt="" />
            </div>
            <div id="subHeadBlogDiv">
              <div id="titleBlogDiv">
                {blog.title}
              </div>
              <div id="subTitleBlogDiv">
                    {/* subTitleBlogDiv for displaying : userDetails(username and upload time) & #upvotes #comments */}
                    <div id="userDetailsBlogDiv">
                      <div id="usernameBlogDiv">
                        {blog.username}
                      </div>
                      <div id="uploadedDayBlogDiv">
                        {blog.lastDate}
                      </div>
                    </div>
                    
                    <div id="votesNCommentsBlogDiv">
                      <div id="upVotesBlogDiv">
                        <button id="upVoteButton" onClick={handleUpvote} style={{ color: upvoted ? '#e2921b' : 'black' }}>
                          &#x21e7;
                        </button>
                        {blog.upvotes} 
                      </div>
                      <div id="downVotes">
                        <button id="downVoteButton" onClick={handleDownvote} style={{ color: downvoted ? 'red' : 'black' }}>
                        &#x21e9;
                        </button>
                      </div>
                      <div id="comments">
                        Comments: {blog.noOfComments}
                      </div>
                    </div>

              </div>
            </div>
          </div>
          <div id="imagesBlogDiv">
          <img src={blog.blogImages} alt="" />
          </div>
          <div id="contentBlogDiv">
            {blog.content}
          </div>
        </div>
      ))}
      
      <div id="rightHalfCommentsDiv">
        <div id="headingCommentsDiv">
          Comments:
        </div>
        <div id="commentsListDiv">
          {blogData.map((blog) => (
            blog.comments.map((comment) => (
              <div key={comment.id} className="commentX">
                <div className="commentHeadingDiv">
                  <div className="commentProfilePhoto">
                    <img src={comment.profileImage} alt="" />
                  </div>
                  <div className="commentTitle">
                    {comment.username}
                  </div>
                </div>
                <div className="commentContent">
                  {comment.content}
                </div>
              </div>
            ))
          ))}
        </div>
        <div id="addCommentsDiv">
          <input type="text" placeholder="Add a comment" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default BlogTemplate;
