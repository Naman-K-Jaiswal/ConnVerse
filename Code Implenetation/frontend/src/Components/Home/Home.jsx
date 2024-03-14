import React, { useState } from 'react';
import './style.css';

// ProfileImageSrc -> attribute for profile image of user 
// Username -> attribute for username of user
// lastDate -> attribute for last date of blog

const Home = () => {
  const [blogData] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <div style={{ backgroundColor: '#f4f4f4' }}>
      <div id="mainBody">
        <div id="searchBoxDiv">
          <input
            type="text"
            id="search"
            placeholder="Search for blogs"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
          <button id="searchButton">Search</button>
        </div>
        <div id="blogLists">
          {blogData.map((blog) => (
            <div key={blog.ID} className="blogX">
              <div className="blogLeftHalfDiv">
                <div className="blogHeading">
                  <div className="blogProfileImageDiv">
                    <img src={blog.ProfileImageSrc} alt="Profile Photo" />
                  </div>
                  <div className="titleDetails">
                    <div className="blogTitle">{blog.Title}</div>
                    <div className="blogUsername">{blog.Username}</div>
                    <div className="blogLastDate">{blog.lastDate}</div>
                    <div className="blogTags">
                      {blog.Tags.map((tag, index) => (
                        <div key={index} className="blogTagX">{tag}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="blogContent">
                  <p>{blog.Content}</p>
                </div>
              </div>
              <div className="blogRightHalfDiv">
                <img src={blog.Image} alt={`Blog${blog.ID} Image`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
