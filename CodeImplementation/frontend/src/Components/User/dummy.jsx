import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TopPosts = () => {
  const [blogposts, setBlogposts] = useState(["hello", "Software Dev Seocond", "Software Dev","Software Dev", "Software Dev", "Software Dev Last", "Software Dev Last"," Software Dev Last", "Software"]);

  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index, newContent) => {
    const updatedPosts = [...blogposts];
    updatedPosts[index] = newContent;
    setBlogposts(updatedPosts);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const newBlogposts = [...blogposts];
    newBlogposts.splice(index, 1);
    setBlogposts(newBlogposts);
    setEditingIndex(null);
  };

  const handleAddPost = () => {
    const newPost = prompt("Enter the new post:");
    if (newPost) {
      setBlogposts([...blogposts, newPost]);
    }
  };

  return (
    <div id="topPostDiv">
      <div id="topPostHeading">
        <div id="topPostTitle">
          TOP POSTS
        </div>
        <div id="addTopPostIcon">
          <AddCircleIcon onClick={handleAddPost} style={{fontSize: '30px', color:'black'}}/>
        </div>
      </div>
      <div id="topPostList">
        <div id="topPostListScroller">
          {
            blogposts.map((blogpost, index) => {
              return (
                <div key={index} id="topPostItemX" >
                  <div contentEditable={editingIndex === index} onBlur={(e) => handleEdit(index, e.target.innerText)}>
                    {blogpost}
                  </div>
                  {editingIndex !== index && (
                    <div className="editIcons">
                      <EditIcon onClick={() => setEditingIndex(index)} style={{fontSize: '20px', color:'black', marginRight: '5px'}}/>
                      <DeleteIcon onClick={() => handleDelete(index)} style={{fontSize: '20px', color:'black'}}/>
                    </div>
                  )}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default TopPosts;
