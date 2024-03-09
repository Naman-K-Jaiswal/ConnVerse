import React from 'react';
import './style.css';

const BlogTemplate = () => {
  const blogData = [
    {
      id: 1,
      title: "Mastering the art of Leadership",
      username: "User12",
      lastDate: "13 days ago",
      profileImageSrc: require('./blog_img.jpeg'),
      blogImages: [require('./blog_img.jpeg'),require('./blog_img.jpeg'),require('./blog_img.jpeg'),require('./blog_img.jpeg'), require('./blog_img.jpeg'), require('./blog_img.jpeg'), require('./blog_img.jpeg'), require('./blog_img.jpeg')],
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
              <div id="usernameBlogDiv">
                {blog.username}
              </div>
              <div id="uploadedDayBlogDiv">
                {blog.lastDate}
              </div>
            </div>
          </div>
          <div id="imagesBlogDiv">
            {blog.blogImages.map((image, index) => (
              <img key={index} src={image} alt={`Blog Image ${index}`} />
            ))}
          </div>
          <div id="contentBlogDiv">
            {blog.content}
          </div>
        </div>
      ))}
      <div id="rightHalfCommentsDiv">
        <div id="headingCommentsDiv">
          COMMENTS:
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
