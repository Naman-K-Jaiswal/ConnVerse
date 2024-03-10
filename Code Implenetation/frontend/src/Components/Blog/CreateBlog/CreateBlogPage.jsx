import React from 'react';
import styles from './style.module.css';

const CreateBlogPage = () => {
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

    const profileDetails = {
        username: "Indranil saha",
        department: "CSE",
        lastPost: "Last Post: 3 Days Ago",
        totalPoints: "Total Points: 500",
        pointsThisYear: "Points This Year: 200",
        contributions: "Contributions: 10",
        profileImg: require('./profile_photo.jpg')
    };

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
                                {/* Blog Items */}
                                {blogs.map((blog, index) => (
                                    <div key={index} className={styles.blogItemPrevBlogX}>
                                        <div className={styles.blogItemTop}>
                                            <div className={styles.blogItemHeading}>
                                                <div className={styles.blogItemTitle}>{blog.title}</div>
                                                <div className={styles.blogItemLastTime}>{blog.lastTime}</div>
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
                        <img id={styles.profile_photo} src={profileDetails.profileImg} alt="Profile Photo" className={styles['profile-photo']}/>
                        <div id={styles.username}>{profileDetails.username}</div>
                        <div id={styles.department}>{profileDetails.department}</div>
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
                        <input type="text" id={styles.title} placeholder="Enter title" />
                    </div>
                    <div className={styles['input-group']} id={styles['input-group-tags']}>
                        <label htmlFor={styles.tags}>TAGS:</label>
                        <input type="text" id={styles.tags} placeholder="Enter tags (max 5) separated by commas" />
                    </div>
                    <div className={styles['input-group']} id={styles['input-group-images']}>
                        <label htmlFor={styles.images}>IMAGES:</label>
                        <input type="file" id={styles.images} />
                    </div>
                    <div id={styles.content}>
                        <textarea id={styles.content} placeholder="What do you want to share"></textarea>
                        <button id={styles.uploadButton}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBlogPage;
