import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import MetaData from "../../MetaData";
import Loader from '../Loader/Loader';
import { useToast } from "@chakra-ui/toast";

const Home = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [search, setSearch] = useState("");
  const [num, setNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const getDaysAgo = (timestamp) => {
    const postDate = new Date(timestamp);
    return formatDistanceToNow(postDate, { addSuffix: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const us = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(
          `http://localhost:8080/feed/reload/${us.userId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          try {
            const res = await fetch(
              `http://localhost:8080/feed/load/0/${us.userId}`,
              {
                method: "GET",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (res.ok) {
              const data = await res.json();
              setBlogData(data.blogs);
            }
          } catch (error) {
            toast({
              title: "Error Fetching Feed!",
              description: "Please reload the page",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
          }
        }
      } catch (error) {
        toast({
          title: "Error Fetching Feed!",
          description: "Please reload the page",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  const appendBlogOnScroll = async () => {
    const thres = 100;
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - thres;

    if (isBottom && search === "") {
      try {
        const us = JSON.parse(localStorage.getItem("user"));
        const { data } = await axios.get(
          `http://localhost:8080/feed/load/${num}/${us.userId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (data.blogs != null) {
          if (data.blogs.length > 0) {
            setBlogData([...blogData, ...data.blogs]);
            setNum((prevState) => prevState + 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      appendBlogOnScroll();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [appendBlogOnScroll]);

  const [bottomRef, bottomInView] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (bottomInView) {
      appendBlogOnScroll();
    }
  }, [bottomInView]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/blog/search`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: search }),
      });

      if (response.ok) {
        const data = await response.json();
        setBlogData(data.posts);
        setNum(0);
      } else {
        const data = await response.json();
        setBlogData([]);
        toast({
          description: data["error"],
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    } catch (error) {
      setBlogData([]);
      toast({
        title: "Something went wrong!",
        description: "Please reload the page",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }

    if (search === "") {
      setNum(1);
    }
  };

  const handleRedirect = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <>
      <MetaData title={"Home"} />
      <div style={{ backgroundColor: "#f4f4f4" }}>
        <div id="mainBody">
          <div id="searchBoxDiv">
            <input
              type="text"
              id="search"
              placeholder="Search for blogs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button id="searchButton" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div id="blogLists">
            {blogData!=null && blogData.length === 0 && <Loader/>}
            {blogData!=null && blogData.length > 0 &&
              blogData.map((blog) => (
                <div
                  key={blog._id}
                  className="blogX"
                  onClick={() => handleRedirect(blog.ID)}
                >
                  <div className="blogLeftHalfDiv">
                    <div className="blogHeading">
                      <div className="blogProfileImageDiv">
                        <img
                          src={`data:image/jpeg;base64,${blog.authorimage}`}
                          alt="Profile Photo"
                        />
                      </div>
                      <div className="titleDetails">
                        <div
                          className="blogTitle"
                          style={{
                            fontFamily: "Roboto",
                            fontWeight: "bold",
                            fontSize: "24px",
                          }}
                        >
                          {blog.title}
                        </div>
                        <div
                          className="blogUsername"
                          style={{ fontFamily: "Pacifico", fontSize: "20px" }}
                        >
                          {blog.authorname}
                        </div>
                        <div
                          className="blogLastDate"
                          style={{
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontStyle: "italic",
                          }}
                        >
                          {getDaysAgo(blog.timestamp)}
                        </div>
                        <div
                          className="blogTags"
                          style={{ fontFamily: "Montserrat", fontSize: "16px" }}
                        >
                          {blog.tags!=null && blog.tags.slice(0,4).map((tag, index) => (
                            <div
                              key={index}
                              className="blogTagX"
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="blogContent">
                      <p>
                        {blog.content.split(" ").slice(0, 80).join(" ")}
                        {blog.content.split(" ").length > 100 ? "..." : ""}
                      </p>
                    </div>
                  </div>
                  <div className="blogRightHalfDiv">
                    <img
                      src={`data:image/jpeg;base64,${blog.image}`}
                      alt="title image"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
