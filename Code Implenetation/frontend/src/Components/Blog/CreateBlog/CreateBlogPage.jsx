import React, {useEffect, useState} from 'react';
import styles from './style.module.css';
import {formatDistanceToNow} from "date-fns";
import {useNavigate} from "react-router-dom";

const CreateBlogPage = () => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        image: '',
        authorID: '',
        tags: [],
    });

    const [posts, setPosts] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const [profileDetails, setProfileDetails] = useState({
        username: user.userName,
        lastPost: "",
        totalPoints: "",
        pointsThisYear: "",
        contributions: "",
        profileImg: user.userImage
    });

    const getPosts = async () => {
        try {
            const us = JSON.parse(localStorage.getItem("user"));
            const response = await fetch('http://localhost:8080/blog/retrieve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ authorid: us.userId }),
            });

            if (response.ok) {
                const data = await response.json();
                const updatedPosts = data.posts

                if(updatedPosts != null){
                    setPosts(updatedPosts);
                    const totalLikes = updatedPosts.reduce((acc, post) => acc + post.likes, 0);
                    const totalDislikes = updatedPosts.reduce((acc, post) => acc + post.dislikes, 0);
                    const totalPoints = totalLikes - totalDislikes;
                    const contributions = updatedPosts.length;

                    // Find the last post
                    const lastPost = contributions > 0 ? updatedPosts[contributions - 1].title : '';

                    // Find posts made this year
                    const currentYear = new Date().getFullYear();
                    const postsThisYear = updatedPosts.filter(post => new Date(post.timestamp).getFullYear() === currentYear).length;

                    setProfileDetails({
                        ...profileDetails,
                        lastPost,
                        totalPoints,
                        postsThisYear,
                        contributions,
                    });
                }
            } else {
                alert("Failed to retrieve your blog posts.")
            }
        } catch (error) {
            alert("Failed to retrieve your blog posts.")
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    const getDaysAgo = (timestamp) => {
        const postDate = new Date(timestamp);
        return formatDistanceToNow(postDate, { addSuffix: true });
    }

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const convertToBase64 = (file) => new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            })
            Promise.all([convertToBase64(files[0])]).then(([img])=>{
                console.log(img.substring(23))
                setPostData((prevData) => ({ ...prevData, [name]: img.substring(23) }));
            })
        } else if (name === 'tags') {
            const tagsArray = value.split(',').map(tag => tag.trim());
            setPostData((prevData) => ({ ...prevData, [name]: tagsArray }));
        } else {
            setPostData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const us = JSON.parse(localStorage.getItem("user"));
            const response = await fetch('http://localhost:8080/blog/compose/new', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    'title': postData.title,
                    'content': postData.content,
                    'image': postData.image,
                    'tags': postData.tags,
                    'authorid': us.userId,
                    'authorimage': us.userImage,
                    'authorname': us.userName,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(prevPosts => [data.blog, ...prevPosts]);
                alert('Blog post created successfully')
                setProfileDetails({
                    username: profileDetails.username,
                    lastPost: postData.title,
                    totalPoints: profileDetails.totalPoints,
                    pointsThisYear: profileDetails.pointsThisYear + 1,
                    contributions: profileDetails.contributions + 1,
                    profileImg: us.userImage
                })
                setPostData({
                    title: '',
                    content: '',
                    image: postData.image,
                    authorID: us.userId,
                    tags: [],
                });
            } else {
                console.error('Failed to create blog post');
                alert('Failed to create blog post')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create blog post')
        }
    };


    const blogs = [
        {
            title: "Interview at DevRev",
            lastTime: "7 days ago",
            tags: ["Web Development", "Interview"],
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At ea ducimus, ex adipisci labore quisquam nam reprehenderit tempore officiis soluta perspiciatis autem. Modi recusandae nemo, beatae magni quia quo odio? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos quidem quibusdam suscipit expedita ea cum facilis voluptatibus voluptatum dolorem neque. Molestias voluptatum quia et, nostrum doloremque officia assumenda omnis inventore."
        },
        {
            title: "Interview at DevRev",
            lastTime: "7 days ago",
            tags: ["Web Development", "Interview"],
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At ea ducimus, ex adipisci labore quisquam nam reprehenderit tempore officiis soluta perspiciatis autem. Modi recusandae nemo, beatae magni quia quo odio? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos quidem quibusdam suscipit expedita ea cum facilis voluptatibus voluptatum dolorem neque. Molestias voluptatum quia et, nostrum doloremque officia assumenda omnis inventore. "
        },
        {
            title: "Interview at DevRev",
            lastTime: "7 days ago",
            tags: ["Web Development", "Interview"],
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At ea ducimus, ex adipisci labore quisquam nam reprehenderit tempore officiis soluta perspiciatis autem. Modi recusandae nemo, beatae magni quia quo odio? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos quidem quibusdam suscipit expedita ea cum facilis voluptatibus voluptatum dolorem neque. Molestias voluptatum quia et, nostrum doloremque officia assumenda omnis inventore."
        },
        {
            title: "Interview at DevRev",
            lastTime: "7 days ago",
            tags: ["Web Development", "Interview"],
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At ea ducimus, ex adipisci labore quisquam nam reprehenderit tempore officiis soluta perspiciatis autem. Modi recusandae nemo, beatae magni quia quo odio? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos quidem quibusdam suscipit expedita ea cum facilis voluptatibus voluptatum dolorem neque. Molestias voluptatum quia et, nostrum doloremque officia assumenda omnis inventore."
        },
        {
            title: "Interview at DevRev",
            lastTime: "7 days ago",
            tags: ["Web Development", "Interview"],
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At ea ducimus, ex adipisci labore quisquam nam reprehenderit tempore officiis soluta perspiciatis autem. Modi recusandae nemo, beatae magni quia quo odio? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos quidem quibusdam suscipit expedita ea cum facilis voluptatibus voluptatum dolorem neque. Molestias voluptatum quia et, nostrum doloremque officia assumenda omnis inventore."
        },
        // Add more blog objects here
    ];

    const handleRedirect = (id) => {
        navigate(`/blog/${id}`);
    }

    return (
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
                                <input type="text" id={styles.search} placeholder="Search Blogs" />
                                <button id={styles.searchButton}>Search</button>
                            </div>
                            <div id={styles.blogsList}>
                                {posts!=null && posts.length === 0 && (<div>No blog to show</div>)}
                                {posts!=null && posts.length > 0 && posts.map((blog, index) => (
                                    <div key={index} className={styles.blogItemPrevBlogX} onClick={()=>handleRedirect(blog.ID)}>
                                        <div className={styles.blogItemTop}>
                                            <div className={styles.blogItemHeading}>
                                                <div className={styles.blogItemTitle}>{blog.title}</div>
                                                <div className={styles.blogItemLastTime}>{getDaysAgo(blog.timestamp)}</div>
                                            </div>
                                            <div className={styles.blogItemTags}>
                                                {blog.tags.map((tag, index) => (
                                                    <div key={index} className={styles.blogItemTagX}>{tag}</div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.blogItemContent}>{blog.content}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Profile Details Section */}
                    <div id={styles.profileDetails}>
                        <img id={styles.profile_photo} src={`data:image/jpeg;base64,${profileDetails.profileImg}`} alt="Profile Photo" className={styles['profile-photo']}/>
                        <div id={styles.username}>{profileDetails.username}</div>
                        <div id={styles['last-post']}>{profileDetails.lastPost}</div>
                        <div id={styles['total-points']}>{profileDetails.totalPoints}</div>
                        <div id={styles['points-this-year']}>{profileDetails.pointsThisYear}</div>
                        <div id={styles.contributions}>{profileDetails.contributions}</div>
                    </div>
                </div>

                {/* Edit Blog Section */}
                <div id={styles.editBlog}>
                    <div className={styles['input-group']} id={styles['input-group-title']}>
                        <label htmlFor={styles.title}>TITLE:</label>
                        <input type="text" id={styles.title} placeholder="Enter title" name="title" value={postData.title} onChange={handleChange} />
                    </div>
                    <div className={styles['input-group']} id={styles['input-group-tags']}>
                        <label htmlFor={styles.tags}>TAGS:</label>
                        <input type="text" id={styles.tags} placeholder="Enter tags separated by commas" name="tags" value={postData.tags} onChange={handleChange}/>
                    </div>
                    <div className={styles['input-group']} id={styles['input-group-images']}>
                        <label htmlFor={styles.images}>IMAGES:</label>
                        <input type="file" id={styles.images} name="image" onChange={handleChange} accept='image/*'/>
                    </div>
                    <div id={styles.content}>
                        <textarea id={styles.content} placeholder="What do you want to share" name="content" value={postData.content} onChange={handleChange}></textarea>
                        <button id={styles.uploadButton} onClick={handleSubmit}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBlogPage;
