import React from 'react';
import './style.css';

const Home = () => {
  return (
    <div>
      {/* Main Body */}
      <div id="mainBody">
        <div id="searchBoxDiv">
          <input type="text" id="search" placeholder="Search for blogs" />
          <button id="searchButton">Search</button>
        </div>
        <div id="blogLists">
          {/* Blog 1 */}
          <div className="blogX">
            <div className="blogLeftHalfDiv">
              <div className="blogHeading">
                <div className="blogProfileImageDiv">
                  <img src="profile_photo.JPG" alt="Profile Photo" />
                </div>
                <div className="titleDetails">
                  <div className="blogTitle">Mastering the art of Leadership</div>
                  <div className="blogUsername">User123</div>
                  <div className="blogLastDate">10 days ago</div>
                  <div className="blogTags">
                    <div className="blogTagX">#Leadership</div>
                    <div className="blogTagX">#Management</div>
                    <div className="blogTagX">#Business</div>
                  </div>
                </div>
              </div>
              <div className="blogContent">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.
                </p>
              </div>
            </div>
            <div className="blogRightHalfDiv">
              <img src="backgroundImage.png" alt="Blog1 Image" />
            </div>
          </div>
          
          {/* Blog 2 */}
          <div className="blogX">
            <div className="blogLeftHalfDiv">
              <div className="blogHeading">
                <div className="blogProfileImageDiv">
                  <img src="profile_photo.JPG" alt="Profile Photo" />
                </div>
                <div className="titleDetails">
                  <div className="blogTitle">Mastering the art of Leadership</div>
                  <div className="blogUsername">User123</div>
                  <div className="blogLastDate">10 days ago</div>
                  <div className="blogTags">
                    <div className="blogTagX">#Leadership</div>
                    <div className="blogTagX">#Management</div>
                    <div className="blogTagX">#Business</div>
                  </div>
                </div>
              </div>
              <div className="blogContent">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.
                </p>
              </div>
            </div>
            <div className="blogRightHalfDiv">
              <img src="backgroundImage.png" alt="Blog2 Image" />
            </div>
          </div>
          
          {/* Blog 3 */}
          <div className="blogX">
            <div className="blogLeftHalfDiv">
              <div className="blogHeading">
                <div className="blogProfileImageDiv">
                  <img src="profile_photo.JPG" alt="Profile Photo" />
                </div>
                <div className="titleDetails">
                  <div className="blogTitle">Mastering the art of Leadership</div>
                  <div className="blogUsername">User123</div>
                  <div className="blogLastDate">10 days ago</div>
                  <div className="blogTags">
                    <div className="blogTagX">#Leadership</div>
                    <div className="blogTagX">#Management</div>
                    <div className="blogTagX">#Business</div>
                  </div>
                </div>
              </div>
              <div className="blogContent">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.
                </p>
              </div>
            </div>
            <div className="blogRightHalfDiv">
              <img src="backgroundImage.png" alt="Blog3 Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
