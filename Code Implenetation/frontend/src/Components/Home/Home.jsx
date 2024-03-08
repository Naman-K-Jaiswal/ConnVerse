import React from 'react';
import './style.css';

const Home = () => {
  const blogData = [
    {
      id: 1,
      title: "Mastering the art of Leadership",
      username: "User123",
      lastDate: "10 days ago",
      tags: ["#Leadership", "#Management", "#Business"],
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      imageSrc: './pp.jpg', 
      profileImageSrc: require('./pp.jpg')
    },
    {
      id: 2,
      title: "Mastering the art of Leadership",
      username: "User123",
      lastDate: "10 days ago",
      tags: ["#Leadership", "#Management", "#Business"],
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      imageSrc: './pp.jpg', 
      profileImageSrc: require('./pp.jpg')
    },
    {
      id: 3,
      title: "Mastering the art of Leadership",
      username: "User123",
      lastDate: "10 days ago",
      tags: ["#Leadership", "#Management", "#Business"],
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      imageSrc: './pp.jpg', 
      profileImageSrc: require('./pp.jpg')
    },
  ];
  

  return (
    <div>
      {/* Main Body */}
      <div id="mainBody">
        <div id="searchBoxDiv">
          <input type="text" id="search" placeholder="Search for blogs" />
          <button id="searchButton">Search</button>
        </div>
        <div id="blogLists">
          {blogData.map((blog) => (
            <div key={blog.id} className="blogX">
              <div className="blogLeftHalfDiv">
                <div className="blogHeading">
                  <div className="blogProfileImageDiv">
                    <img src={blog.profileImageSrc} alt="Profile Photo" />
                  </div>
                  <div className="titleDetails">
                    <div className="blogTitle">{blog.title}</div>
                    <div className="blogUsername">{blog.username}</div>
                    <div className="blogLastDate">{blog.lastDate}</div>
                    <div className="blogTags">
                      {blog.tags.map((tag, index) => (
                        <div key={index} className="blogTagX">{tag}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="blogContent">
                  <p>{blog.content}</p>
                </div>
              </div>
              <div className="blogRightHalfDiv">
                <img src={blog.imageSrc} alt={`Blog${blog.id} Image`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
