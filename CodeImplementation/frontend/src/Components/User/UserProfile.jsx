import React, { useState, useRef, useEffect } from "react";
import "./UserProfile.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import backgroundImageFile from "./backgroundImage.jpeg";
import profileImageFile from "./userProfileImage.jpeg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useToast } from "@chakra-ui/toast";
import { useParams, useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader';

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("Name");
  const [degree, setDegree] = useState("BT CSE");
  const [nickname, setNickname] = useState("Nickname");
  const user = JSON.parse(localStorage.getItem("user"));

  const [editable, setEditable] = useState(user.userId === id);
  const [edited, setEdited] = useState(false);

  const editNicknameRef = useRef(null);
  const [isNicknameEditable, setIsNicknameEditable] = useState(false);
  const handleChangeNickname = (event) => {
    setEdited(true);
    const par = event.target.parentNode.parentNode;
    const sib = par.querySelectorAll("p");
    const siblings = Array.from(sib);
    const newNickname = siblings[0].textContent;
    setNickname(newNickname);
    setIsNicknameEditable(false);
  };

  useEffect(() => {
    if (isNicknameEditable) {
      editNicknameRef.current.focus();

      const textLength = editNicknameRef.current.textContent.length;
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(editNicknameRef.current.childNodes[0], textLength);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [isNicknameEditable]);

  // profileImageAndDetail functionalities
  const [profileImage, setProfileImage] = useState(profileImageFile);
  const [backgroundImage, setBackgroundImage] = useState(backgroundImageFile);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

  const handleBackgroundImageChange = (event) => {
    event.preventDefault();
    setEdited(true);

    if (event.target.files.length > 0) {
      Promise.all([convertToBase64(event.target.files[0])]).then(([img]) => {
        setBackgroundImage(img);
      });
    }
  };

  const handleProfileImageChange = (event) => {
    event.preventDefault();
    setEdited(true);

    if (event.target.files.length > 0) {
      Promise.all([convertToBase64(event.target.files[0])]).then(([img]) => {
        setProfileImage(img);
        localStorage.setItem('user', JSON.stringify({
          userId: user.userId,
          userImage: img.substring(23),
          userName: user.userName
        }))
      });
    }
  };

  // Profile Description Functionalities
  const [descriptionProfileDescription, setDescriptionProfileDescription] =
    useState("");

  const [isEditingProfileDescription, setIsEditingProfileDescription] =
    useState(false);
  const [
    editedDescriptionProfileDescription,
    setEditedDescriptionProfileDescription,
  ] = useState(descriptionProfileDescription);

  const handleEditClickProfileDescription = () => {
    setIsEditingProfileDescription(true);
    setEditedDescriptionProfileDescription(descriptionProfileDescription);
  };

  const handleSaveClickProfileDescription = () => {
    setEdited(true);
    setDescriptionProfileDescription(editedDescriptionProfileDescription);
    setIsEditingProfileDescription(false);
  };
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditingProfileDescription) {
      // Set focus to the textarea
      textareaRef.current.focus();
      // Move cursor to the end of the text
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
        textareaRef.current.value.length;
    }
  }, [isEditingProfileDescription]);

  // Skills Functionalities
  const [skills, setSkills] = useState([]);

  const [editingIndexSkills, setEditingIndexSkills] = useState(null);
  const editRefSkills = useRef([]);

  const handleEditSkills = (index) => {
    setEditingIndexSkills(index);
    setTimeout(() => {
      if (editRefSkills.current[index]) {
        const textLength = editRefSkills.current[index].textContent.length;
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(editRefSkills.current[index].childNodes[0], textLength);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }, 0);
  };

  const handleSaveSkills = (event, index) => {
    setEdited(true);
    const newSkills = [...skills];
    newSkills[index] = event.target.textContent;
    setSkills(newSkills);
  };

  const handleDeleteSkills = (index) => {
    setEdited(true);
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleMoveUpSkills = (index) => {
    setEdited(true);
    if (index === 0) return; // Already at the top
    const newSkills = [...skills];
    [newSkills[index], newSkills[index - 1]] = [
      newSkills[index - 1],
      newSkills[index],
    ];
    setSkills(newSkills);
  };

  const handleMoveDownSkills = (index) => {
    setEdited(true);
    if (index === skills.length - 1) return; // Already at the bottom
    const newSkills = [...skills];
    [newSkills[index], newSkills[index + 1]] = [
      newSkills[index + 1],
      newSkills[index],
    ];
    setSkills(newSkills);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const up = ["New Skill", ...skills];
    setSkills(up);
  };

  //  Blog Posts Functionalities
  const [blogpostsBlogPosts, setBlogpostsBlogPosts] = useState([]);

  const [blogposts, setBlogposts] = useState([]);

  // achievements functionalites : here we will have to add the functionality to add, delete, edit and move up and down the achievements
  const [achievements, setAchievements] = useState([]);

  const [editingIndexAchievements, setEditingIndexAchievements] =
    useState(null);
  const editRefAchievements = useRef([]);

  const handleEditAchievements = (index) => {
    setEditingIndexAchievements(index);
    setTimeout(() => {
      if (editRefAchievements.current[index]) {
        const textLength =
          editRefAchievements.current[index].textContent.length;
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(
          editRefAchievements.current[index].childNodes[0],
          textLength
        );
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }, 0);
  };

  const handleSaveAchievements = (event, index) => {
    setEdited(true);
    const newAchievements = [...achievements];
    newAchievements[index] = event.target.textContent;
    setAchievements(newAchievements);
  };

  const handleDeleteAchievements = (index) => {
    setEdited(true);
    const newAchievements = [...achievements];
    newAchievements.splice(index, 1);
    setAchievements(newAchievements);
  };

  const handleMoveUpAchievements = (index) => {
    setEdited(true);
    if (index === 0) return; // Already at the top
    const newAchievements = [...achievements];
    [newAchievements[index], newAchievements[index - 1]] = [
      newAchievements[index - 1],
      newAchievements[index],
    ];
    setAchievements(newAchievements);
  };

  const handleMoveDownAchievements = (index) => {
    setEdited(true);
    if (index === achievements.length - 1) return; // Already at the bottom
    const newAchievements = [...achievements];
    [newAchievements[index], newAchievements[index + 1]] = [
      newAchievements[index + 1],
      newAchievements[index],
    ];
    setAchievements(newAchievements);
  };

  const handleAddAchievement = () => {
    setAchievements(["New Achievement", ...achievements]);
  };

  // credentials functionalities
  // here we will have to add the functionality to add, delete, edit and move up and down the credentials
  // we will have to add some extra features because we have to add the organisation and the time period also
  const [credentials, setCredentials] = useState([]);
  const [showCredentialPopup, setShowCredentialPopup] = useState(false);
  const [newCredential, setNewCredential] = useState({
    post: "",
    organisation: "",
    from: "",
    to: "",
  });
  const [editingCredentialIndex, setEditingCredentialIndex] = useState(null);
  const editRefCredentialPosts = useRef([]);
  const editRefCredentialOrganization = useRef(null);
  const editRefCredentialFromTo = useRef(null);

  const handleInputChangeCredential = (e) => {
    const { name, value } = e.target;
    setNewCredential((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddCredentialSubmit = (e) => {
    e.preventDefault();
    const dateRegex = /^[A-Z][a-z]{2}'\d{2}$/;
    if (!dateRegex.test(newCredential.from)) {
      toast({
          title: "Please Fill The Date In Mmm'YY Format!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
      });
      return;
    }
    if (!dateRegex.test(newCredential.to)) {
      toast({
          title: "Please Fill The Date In Mmm'YY Format!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
      });
      return;
    }
    // Add the new credential to the list of credentials
    setEdited(true);
    const updatedCredentials = [
      ...credentials,
      {
        post: newCredential.post,
        organisation: newCredential.organisation,
        from: newCredential.from,
        to: newCredential.to === "" ? "Present" : newCredential.to,
      },
    ];

    console.log(updatedCredentials);
    setCredentials(updatedCredentials);
    // Close the popup
    setShowCredentialPopup(false);

    setNewCredential({
      post: "",
      organisation: "",
      from: "",
      to: "",
    });
    setEditingCredentialIndex(null);
  };
  const handleEditCredential = (index) => {
    setEditingCredentialIndex(index);
    setTimeout(() => {
      if (editRefCredentialPosts.current[index]) {
        const textLength =
          editRefCredentialPosts.current[index].textContent.length;
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(
          editRefCredentialPosts.current[index].childNodes[0],
          textLength
        );
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  };
  const handleDeleteCredential = (index) => {
    setEdited(true);
    const newCredentials = [...credentials];
    newCredentials.splice(index, 1);
    setCredentials(newCredentials);
  };

  const handleSaveCredential = (event, index) => {
    setEdited(true);
    const par = event.target.parentNode.parentNode.parentNode;
    const sib = par.querySelectorAll("div");
    const siblings = Array.from(sib);
    const fromto = sib[2].querySelectorAll("span");
    const fromtos = Array.from(fromto);

    const newCredential = {
      post: siblings[0].textContent,
      organisation: siblings[1].textContent,
      from: fromtos[0].textContent,
      to: fromtos[2].textContent,
    };

    const updatedCredentials = [...credentials];
    updatedCredentials[index] = newCredential;
    console.log(updatedCredentials);
    setCredentials(updatedCredentials);
    setEditingCredentialIndex(null);
  };

  const [projects, setProjects] = useState([]);

  const [showProjectPopup, setShowProjectPopup] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    instructorname: "",
    description: "",
    from: "",
    to: "",
  });

  const [editProjectIndex, setEditProjectIndex] = useState(null);
  const editRefProjectNames = useRef([]);
  const editRefProjectInstructor = useRef(null);
  const editRefProjectDescription = useRef(null);
  // Functions for the project
  const handleInputChangeProject = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };
  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    const dateRegex = /^[A-Z][a-z]{2}'\d{2}$/;
    if (!dateRegex.test(newProject.from)) {
      toast({
          title: "Please Fill The Date In Mmm'YY Format!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
      });
      return;
    }
    if (!dateRegex.test(newProject.to)) {
      toast({
          title: "Please Fill The Date In Mmm'YY Format!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
      });
      return;
    }
    setEdited(true);
    const updatedProjects = [...projects, newProject];
    console.log(updatedProjects);
    setProjects(updatedProjects);
    setShowProjectPopup(false);
    setNewProject({
      name: "",
      instructorname: "",
      description: "",
      from: "",
      to: "",
    });
  };
  const handleEditProject = (index) => {
    setEditProjectIndex(index);
    setTimeout(() => {
      if (editRefProjectNames.current[index]) {
        const textLength =
          editRefProjectNames.current[index].textContent.length;
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(
          editRefProjectNames.current[index].childNodes[0],
          textLength
        );
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  };
  const handleDeleteProject = (index) => {
    setEdited(true);
    let newArray = projects.slice();
    newArray.splice(index, 1);
    setProjects(newArray);
  };
  const handleMoveUpProject = (index) => {
    setEdited(true);
    if (index === 0) return; // Already at the top
    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[index - 1];
    newProjects[index - 1] = temp;
    setProjects(newProjects);
  };

  const handleMoveDownProject = (index) => {
    setEdited(true);
    if (index === projects.length - 1) return; // Already at the bottom
    const newProjects = [...projects];
    [newProjects[index], newProjects[index + 1]] = [
      newProjects[index + 1],
      newProjects[index],
    ];
    setProjects(newProjects);
  };

  const handleSaveProjets = (event, index) => {
    setEdited(true);
    const par = event.target.parentNode.parentNode.parentNode;
    const sib = par.querySelectorAll("div");
    const siblings = Array.from(sib);
    const fromto = sib[2].querySelectorAll("span");
    const fromtos = Array.from(fromto);

    const newProject = {
      name: siblings[0].textContent,
      instructorname: siblings[1].textContent,
      description: siblings[4].textContent,
      from: fromtos[0].textContent,
      to: fromtos[2].textContent,
    };

    const updatedProjects = [...projects];
    updatedProjects[index] = newProject;
    console.log(updatedProjects);
    setProjects(updatedProjects);
    setEditProjectIndex(null);
  };

  // Course Functionalities: the functionalities are implemented in same way as the credentials
  const [courses, setCourses] = useState([]);

  const [showCoursePopup, setShowCoursePopup] = useState(false);
  const [newCourse, setNewCourse] = useState({
    coursename: "",
    instructorname: "",
    description: "",
    year: "",
    semester: "",
  });
  const [editCourseIndex, setEditCourseIndex] = useState(null);
  const editRefCourseNames = useRef([]);
  const editRefCourseInstructor = useRef(null);
  const editRefCourseDescription = useRef(null);
  const editRefCourseYear = useRef(null);
  const editRefCourseSemester = useRef(null);
  // Functions for the course
  const handleInputChangeCourse = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };
  const handleAddCourseSubmit = (e) => {
    e.preventDefault();

    const yearRegex = /^\d{4}\s*-\s*\d{4}$/;
    // const semesterRegex = /^[1-9]$/;
    // if (!semesterRegex.test(newCourse.semester)) {
    //   toast({
    //       title: "Please Fill Semester Correctly [ N ]!",
    //       status: "error",
    //       duration: 5000,
    //       isClosable: true,
    //       position: "bottom",
    //   });
    //   return;
    // }
    if (!yearRegex.test(newCourse.year)) {
      toast({
          title: "Please Fill In The Year Properly [ YYYY - YYYY ] !",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
      });
      return;
    }

    setEdited(true);

    courses.push(newCourse);
    setCourses([...courses]);
    setShowCoursePopup(false);
    setNewCourse({
      coursename: "",
      instructorname: "",
      description: "",
      year: "",
      semester: "",
    });
  };
  const handleEditCourse = (index) => {
    setEditCourseIndex(index);
    setTimeout(() => {
      if (editRefCourseNames.current[index]) {
        const textLength = editRefCourseNames.current[index].textContent.length;
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(
          editRefCourseNames.current[index].childNodes[0],
          textLength
        );
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  };
  const handleDeleteCourse = (index) => {
    setEdited(true);
    let newArray = courses.slice();
    newArray.splice(index, 1);
    setCourses(newArray);
  };
  const handleMoveUpCourse = (index) => {
    setEdited(true);
    if (index === 0) return; // Already at the top
    const newCourses = [...courses];
    [newCourses[index], newCourses[index - 1]] = [
      newCourses[index - 1],
      newCourses[index],
    ];
    setCourses(newCourses);
  };
  const handleMoveDownCourse = (index) => {
    setEdited(true);
    if (index === courses.length - 1) return; // Already at the bottom
    const newCourses = [...courses];
    [newCourses[index], newCourses[index + 1]] = [
      newCourses[index + 1],
      newCourses[index],
    ];
    setCourses(newCourses);
  };
  const handleSaveCourse = (event, index) => {
    const par = event.target.parentNode.parentNode.parentNode;
    const sib = par.querySelectorAll("div");
    const siblings = Array.from(sib);

    const newCourse = {
      coursename: siblings[0].textContent,
      instructorname: siblings[1].textContent,
      description: siblings[2].textContent,
      year: siblings[3].textContent,
      semester: siblings[4].textContent,
    };

    setEdited(true);

    const updatedCourses = [...courses];
    updatedCourses[index] = newCourse;
    console.log(updatedCourses);
    setCourses(updatedCourses);
    setEditCourseIndex(null);
  };

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://connverse-hcgzo.ondigitalocean.app/profile/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          console.log("bilkul bhai")
          const data = await res.json();
          if (data.user != null) {
            setName(data.user.name);
            setDegree(data.user.degree);
            setProfileImage("data:image/jpeg;base64," + data.user.profilephoto);
            setBackgroundImage(
              "data:image/jpeg;base64," + data.user.bannerphoto
            );
            if (data.user.about != "") {
              setDescriptionProfileDescription(data.user.about);
            } else {
              setDescriptionProfileDescription(
                "This is a default description. Please change it if you want to add your thoughts here."
              );
            }
            if (data.user.nickname != "") {
              setNickname(data.user.nickname);
            }
            if (data.user.skills != null) {
              setSkills(data.user.skills);
            } else {
              setSkills([]);
            }
            if (data.user.achievements != null) {
              setAchievements(data.user.achievements);
            } else {
              setAchievements([]);
            }
            if (data.user.blogposts != null && data.blogs != null) {
              setBlogpostsBlogPosts(data.user.blogposts);
              setBlogposts(data.blogs);
            } else {
              setBlogpostsBlogPosts([]);
              setBlogposts([]);
            }
            if (data.user.credentials != null) {
              setCredentials(data.user.credentials);
            } else {
              setCredentials([]);
            }
            if (data.user.projects != null) {
              setProjects(data.user.projects);
            } else {
              setProjects([]);
            }
            if (data.user.courses != null) {
              setCourses(data.user.courses);
            } else {
              setCourses([]);
            }
            if (data.blogs != null) {
              setBlogposts(data.blogs);
            } else {
              setBlogposts([]);
            }

            setEditable(user.userId === id);
          } else {
            toast({
              title: "Error fetching details!",
              description: "Please reload the page",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
        } else {
          toast({
              title: "Error fetching details!",
              description: "Please reload the page",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
        }
      } catch (error) {
        toast({
          title: "Error fetching details!",
          description: "Please reload the page",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      setLoading(false);
    };

    func();
  }, [id]);

  useEffect(() => {
    setLoading(true);
        const func = async () => {
          try {
            const res = await fetch(`https://connverse-hcgzo.ondigitalocean.app/profile/update`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userid: id,
                nickname: nickname,
                profilephoto: profileImage.substring(23),
                bannerphoto: backgroundImage.substring(23),
                about: descriptionProfileDescription,
                skills: skills,
                achievements: achievements,
                credentials: credentials,
                projects: projects,
                courses: courses,
              }),
            });

            if (res.ok) {
              toast({
                title: "Details updated successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            }
          } catch (error) {
              toast({
                title: "Error updating details!",
                description: "Please reload the page",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
          }
        };

        if(editable && edited){
          func();
          setEditable(false);
          setEditable(user.userId === id);
        }
        setLoading(false);
  }, [
    edited,
    profileImage,
    nickname,
    backgroundImage,
    descriptionProfileDescription,
    skills,
    achievements,
    credentials,
    projects,
    courses,
  ]);

  return (
    <>
      {loading?<Loader/>:
      <div>
      <div
        id="personalProfileMainDiv"
        className={
          showCredentialPopup || showProjectPopup || showCoursePopup
            ? "dimmed"
            : ""
        }
      >
        {/* profileImageAndDetailDiv Section */}
        <div id="profileImageAndDetailDiv">
          <div id="backgroundProfileImageDiv">
            <img
              id="backgroundProfileImageImg"
              src={backgroundImage}
              alt="Background Img"
            />
            {editable && (
              <>
                <label htmlFor="backgroundImageInput">
                  <AddAPhotoIcon
                    id="addBackgroundImageIcon"
                    style={{
                      marginLeft: "84.5vw",
                      position: "relative",
                      top: "-4.4vh",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                  />
                </label>
                <input
                  type="file"
                  id="backgroundImageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleBackgroundImageChange}
                />
              </>
            )}
          </div>

          <div id="profileImageDiv">
            <img id="profileImageImg" src={profileImage} alt="Profile Img" />
            {editable && (
              <>
                <label htmlFor="profileImageInput">
                  <AddAPhotoIcon
                    id="addProfileImageIcon"
                    style={{
                      fontSize: "30px",
                      color: "black",
                      position: "relative",
                      top: "-3.5vw",
                      left: "-0.5vw",
                      marginLeft: "20vw",
                      cursor: "pointer",
                    }}
                  />
                </label>
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfileImageChange}
                />
              </>
            )}
          </div>

          <div id="userProfileDescription">
            {isEditingProfileDescription && editable ? (
              <>
                <textarea
                  style={{
                    width: "58vw",
                    marginTop: "0vh",
                    minHeight: "17.7vh",
                  }}
                  ref={textareaRef}
                  value={editedDescriptionProfileDescription}
                  onChange={(e) =>
                    setEditedDescriptionProfileDescription(e.target.value)
                  }
                />
                <DoneIcon
                  onClick={handleSaveClickProfileDescription}
                  style={{
                    position: "absolute",
                    left: "58.5vw",
                    cursor: "pointer",
                  }}
                />
              </>
            ) : (
              <>
                <p>{descriptionProfileDescription}</p>
                {editable && (
                  <>
                    <EditIcon
                      onClick={handleEditClickProfileDescription}
                      style={{
                        position: "absolute",
                        left: "58.5vw",
                        cursor: "pointer",
                      }}
                    />
                  </>
                )}
              </>
            )}
          </div>
          <div id="userUsernameAndName">
            <div id="editableNickname" style={{
              display: "flex",
              flexDirection: "row",
            }}>
              <p
                ref={editNicknameRef}
                contentEditable={isNicknameEditable === true}
                style={{ 
                  fontSize: "2em", 
                  marginTop: editable ? "0" : "3.5vh",
              }}
              >
              {nickname}
              </p>
              {editable && !isNicknameEditable && (
                <div className="editIcons">
                  <EditIcon
                    onClick={() => {
                      setIsNicknameEditable(true);
                    }}
                    style={{
                      cursor: "pointer",
                      marginTop: "1.7vh",
                      marginLeft: "1vw",
                    }}
                  />
                </div>
              )}
              {editable && isNicknameEditable && (
                <div className="editIcons">
                  <DoneIcon
                    onClick={(event) => handleChangeNickname(event)}
                    style={{
                      // fontSize: "20px",
                      color: "black",
                      marginTop: "1.7vh",
                      marginLeft: "1vw",
                      // marginRight: "5px",
                      cursor: "pointer",
                    }}
                  ></DoneIcon>
                </div>
              )}
            </div>
            <p style={{ fontSize: "2em",textAlign:'center'}}>{degree}</p>
            <p style={{ fontSize: "1.5em" }}>{name}</p>
          </div>
        </div>

        {/* skillAndTopPostDiv Section */}
        <div id="skillAndTopPostDiv">
          <div id="skillsDiv">
            <div id="skillHeading">
              <div id="skillTitle">SKILLS</div>
              {editable && (
                <div id="addSkillIcon">
                  <AddCircleIcon
                    onClick={handleAddSkill}
                    style={{ fontSize: "30px", color: "black" }}
                  />
                </div>
              )}
            </div>
            <div id="skillList">
              <div id="skillListScroller">
                {skills.map((skill, index) => {
                  return (
                    <div key={index} id="skillItemX">
                      <div
                        contentEditable={editingIndexSkills === index}
                        onBlur={(event) => handleSaveSkills(event, index)}
                        ref={(el) => (editRefSkills.current[index] = el)}
                      >
                        {skill}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          marginRight: "1vw",
                        }}
                      >
                        {editingIndexSkills !== index ? (
                          <div className="editIcons">
                            {editable && (
                              <>
                                <EditIcon
                                  onClick={() => handleEditSkills(index)}
                                  style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginRight: "5px",
                                  }}
                                />
                                <DeleteIcon
                                  onClick={() => handleDeleteSkills(index)}
                                  style={{ fontSize: "20px", color: "black" }}
                                />
                                <ArrowUpwardIcon
                                  onClick={() => handleMoveUpSkills(index)}
                                  style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginLeft: "5px",
                                  }}
                                />
                                <ArrowDownwardIcon
                                  onClick={() => handleMoveDownSkills(index)}
                                  style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginLeft: "5px",
                                  }}
                                />
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="editIcons">
                            <DoneIcon
                              onClick={() => setEditingIndexSkills(null)}
                              style={{
                                fontSize: "20px",
                                color: "black",
                                marginRight: "5px",
                              }}
                            ></DoneIcon>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div id="topPostDiv">
            <div id="topPostHeading">
              <div id="topPostTitle">TOP POSTS</div>
            </div>
            <div id="topPostList">
              <div id="topPostListScroller">
                {blogpostsBlogPosts.map((blogpost, index) => {
                  return (
                    <div
                      key={index}
                      id="topPostItemX"
                      onClick={() => {
                        setLoading(false);
                        navigate(`/blog/${blogpost}`);
                      }}
                    >
                      <div>{blogposts[index]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* achievementsAndCredentialsDiv Section */}
        <div id="achievementsAndCredentialsDiv">
          <div id="achievementsDiv">
            <div id="achievementHeading">
              <div id="achievementTitle">ACHIEVEMENTS</div>
              {editable && (
                <div id="addAchievementIcon">
                  <AddCircleIcon
                    onClick={handleAddAchievement}
                    style={{ fontSize: "30px", color: "black" }}
                  />
                </div>
              )}
            </div>
            <div id="achievementList">
              <div id="achievementListScroller">
                {achievements.map((achievement, index) => {
                  return (
                    <div key={index} id="achievementItemX">
                      <div
                        contentEditable={editingIndexAchievements === index}
                        onBlur={(event) => handleSaveAchievements(event, index)}
                        ref={(el) => (editRefAchievements.current[index] = el)}
                      >
                        {achievement}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          marginRight: "1vw",
                        }}
                      >
                        {editingIndexAchievements !== index ? (
                          <div className="editIcons">
                            {editable && (
                              <>
                                <EditIcon
                                  onClick={() => handleEditAchievements(index)}
                                  style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginRight: "5px",
                                  }}
                                />
                                <DeleteIcon
                                  onClick={() =>
                                    handleDeleteAchievements(index)
                                  }
                                  style={{ fontSize: "20px", color: "black" }}
                                />
                                <ArrowUpwardIcon
                                  onClick={() =>
                                    handleMoveUpAchievements(index)
                                  }
                                  style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginLeft: "5px",
                                  }}
                                />
                                <ArrowDownwardIcon
                                  onClick={() =>
                                    handleMoveDownAchievements(index)
                                  }
                                  style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginLeft: "5px",
                                  }}
                                />
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="editIcons">
                            <DoneIcon
                              onClick={() => setEditingIndexAchievements(null)}
                              style={{
                                fontSize: "20px",
                                color: "black",
                                marginRight: "5px",
                              }}
                            ></DoneIcon>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div id="credentialsDiv">
            <div id="credentialHeading">
              <div id="credentialTitle">CREDENTIALS</div>
              <button onClick={() => setShowCredentialPopup(true)}>
                {editable && (
                  <div id="addCredentialIcon">
                    <AddCircleIcon
                      style={{ fontSize: "30px", color: "black" }}
                    />
                  </div>
                )}
              </button>
            </div>
            <div id="credentialList">
              <div id="credentialListScroller">
                {credentials.map((credential, index) => {
                  return (
                    <div key={index} id="credentialItemX">
                      <div
                        contentEditable={editingCredentialIndex === index}
                        ref={(el) =>
                          (editRefCredentialPosts.current[index] = el)
                        }
                        id="credentialItemPost"
                      >
                        {credential.post}
                      </div>
                      <div
                        contentEditable={editingCredentialIndex === index}
                        ref={editRefCredentialOrganization}
                        id="credentialItemOrganization"
                        style={{
                          fontSize: "0.8em",
                        }}
                      >
                        {credential.organisation}
                      </div>
                      <div
                        ref={editRefCredentialFromTo}
                        id="credentialItemFromTo"
                      >
                        <span
                          contentEditable={editingCredentialIndex === index}
                          style={{
                            fontSize: "1em",
                            backgroundColor: "#e2921b",
                            borderRadius: "8px",
                          }}
                        >
                          {credential.from}
                        </span>
                        <span>-</span>
                        <span
                          contentEditable={editingCredentialIndex === index}
                          style={{
                            fontSize: "1em",
                            borderRadius: "8px",
                            backgroundColor: "#e2921b",
                          }}
                        >
                          {credential.to}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          marginRight: "1vw",
                        }}
                      >
                        {editingCredentialIndex !== index ? (
                          <div className="editIcons">
                            {editable && (
                              <>
                                <EditIcon
                                  onClick={() => handleEditCredential(index)}
                                  style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginRight: "5px",
                                  }}
                                />
                                <DeleteIcon
                                  onClick={() => handleDeleteCredential(index)}
                                  style={{ fontSize: "20px", color: "black" }}
                                />
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="editIcons">
                            <DoneIcon
                              onClick={(event) =>
                                handleSaveCredential(event, index)
                              }
                              style={{
                                fontSize: "20px",
                                color: "black",
                                marginRight: "5px",
                              }}
                            ></DoneIcon>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* projectsListDiv Section */}
        <div id="projectsListDiv">
          <div id="projectHeading">
            <div id="projectTitle">PROJECTS</div>
            {editable && (
              <button onClick={() => setShowProjectPopup(true)}>
                <div id="addProjectIcon">
                  <AddCircleIcon style={{ fontSize: "30px", color: "black" }} />
                </div>
              </button>
            )}
          </div>
          <div id="projectList">
            <div id="projectListScroller">
              {projects.map((project, index) => {
                return (
                  <div key={index} id="projectItemX">
                    <div
                      contentEditable={editProjectIndex === index}
                      ref={(el) => (editRefProjectNames.current[index] = el)}
                      id="credentialItemPost"
                      style={{
                        fontSize: "1.5em",
                      }}
                    >
                      {project.name}
                    </div>
                    <div
                      contentEditable={editProjectIndex === index}
                      ref={editRefProjectInstructor}
                      id="credentialItemOrganization"
                    >
                      {project.instructorname}
                    </div>
                    <div
                      ref={editRefCredentialFromTo}
                      id="credentialItemFromTo"
                    >
                      <span contentEditable={editProjectIndex === index} style={{
                        fontSize: "1em",
                        backgroundColor: "#e2921b",
                        borderRadius: "8px",
                      }}>
                        {project.from}
                      </span>
                      <span>-</span>
                      <span contentEditable={editProjectIndex === index} style={{
                        fontSize: "1em",
                        borderRadius: "8px",
                        backgroundColor: "#e2921b",
                      }}>
                        {project.to}
                      </span>
                    </div>
                    <div
                      contentEditable={editProjectIndex === index}
                      ref={editRefProjectDescription}
                      id="credentialItemFromTo"
                      style={{
                        fontSize: "0.8em",
                      }}
                    >
                      {project.description.split(" ").slice(0, 50).join(" ")}
                      {project.description.split(" ").length > 50 ? "..." : ""}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        marginRight: "1vw",
                      }}
                    >
                      {editProjectIndex !== index ? (
                        <div className="editIcons">
                          {editable && (
                            <>
                              <EditIcon
                                onClick={() => handleEditProject(index)}
                                style={{
                                  fontSize: "20px",
                                  color: "black",
                                  marginRight: "5px",
                                }}
                              />
                              <DeleteIcon
                                onClick={() => handleDeleteProject(index)}
                                style={{ fontSize: "20px", color: "black" }}
                              />
                              <ArrowUpwardIcon
                                onClick={() => handleMoveUpProject(index)}
                                style={{
                                  fontSize: "20px",
                                  color: "black",
                                  marginLeft: "5px",
                                }}
                              />
                              <ArrowDownwardIcon
                                onClick={() => handleMoveDownProject(index)}
                                style={{
                                  fontSize: "20px",
                                  color: "black",
                                  marginLeft: "5px",
                                }}
                              />
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="editIcons">
                          <DoneIcon
                            onClick={(event) => handleSaveProjets(event, index)}
                            style={{
                              fontSize: "20px",
                              color: "black",
                              marginRight: "5px",
                            }}
                          ></DoneIcon>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* coursesTakenListDiv Section */}
        <div id="coursesTakenListDiv">
          <div id="courseHeading">
            <div id="courseTitle">COURSES TAKEN</div>
            {editable && (
              <button onClick={() => setShowCoursePopup(true)}>
                <div id="addCourseIcon">
                  <AddCircleIcon style={{ fontSize: "30px", color: "black" }} />
                </div>
              </button>
            )}
          </div>
          <div id="courseList">
            <div id="courseListScroller">
              {courses.map((course, index) => {
                return (
                  <div key={index} id="courseItemX">
                    <div
                      contentEditable={editCourseIndex === index}
                      ref={(el) => (editRefCourseNames.current[index] = el)}
                      id="credentialItemPost"
                      style={{
                        fontSize: "1.5em",
                      }}
                    >
                      {course.coursename}
                    </div>
                    <div
                      contentEditable={editCourseIndex === index}
                      ref={editRefCourseInstructor}
                      id="credentialItemOrganization"
                      style={{
                        fontSize: "0.9em",
                      }}
                    >
                      {course.instructorname}
                    </div>
                    <div
                      contentEditable={editCourseIndex === index}
                      ref={editRefCourseDescription}
                      id="credentialItemFromTo"
                      style={{
                        fontSize: "1em",
                        borderRadius: "8px",
                      }}  
                    >
                      {course.description.split(" ").slice(0, 50).join(" ")}
                      {course.description.split(" ").length > 50 ? "..." : ""}
                    </div>
                    <div
                      contentEditable={editCourseIndex === index}
                      ref={editRefCourseYear}
                      id="credentialItemFromTo"
                      style={{
                        fontSize: "1em",
                        borderRadius: "8px",
                        backgroundColor: "#e2921b",
                        display: "inline",
                      }}
                    >
                      {course.year}
                    </div>
                    <div
                      contentEditable={editCourseIndex === index}
                      ref={editRefCourseSemester}
                      id="credentialItemFromTo"
                    >
                      {course.semester}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        marginRight: "1vw",
                      }}
                    >
                      {editCourseIndex !== index ? (
                        <div className="editIcons">
                          {editable && (
                            <>
                              <EditIcon
                                onClick={() => handleEditCourse(index)}
                                style={{
                                  fontSize: "20px",
                                  color: "black",
                                  marginRight: "5px",
                                }}
                              />
                              <DeleteIcon
                                onClick={() => handleDeleteCourse(index)}
                                style={{ fontSize: "20px", color: "black" }}
                              />
                              <ArrowUpwardIcon
                                onClick={() => handleMoveUpCourse(index)}
                                style={{
                                  fontSize: "20px",
                                  color: "black",
                                  marginLeft: "5px",
                                }}
                              />
                              <ArrowDownwardIcon
                                onClick={() => handleMoveDownCourse(index)}
                                style={{
                                  fontSize: "20px",
                                  color: "black",
                                  marginLeft: "5px",
                                }}
                              />
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="editIcons">
                          <DoneIcon
                            onClick={(event) => handleSaveCourse(event, index)}
                            style={{
                              fontSize: "20px",
                              color: "black",
                              marginRight: "5px",
                            }}
                          ></DoneIcon>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* showCredentialPopup */}
      {showCredentialPopup && (
        <div id="credentialPopup">
          <h2 id="credentialPopupHeading">
            {editingCredentialIndex !== null
              ? "Edit Credential"
              : "Enter Details"}
          </h2>
          <form onSubmit={handleAddCredentialSubmit} id="credentialForm">
            <input
              type="text"
              name="post"
              placeholder="Position"
              autoComplete="off"
              value={newCredential.post}
              onChange={handleInputChangeCredential}
              required
            />
            <select
              name="organisation"
              value={newCredential.organisation}
              onChange={handleInputChangeCredential}
              required
            >
              <option value="">Select</option>
              <option value="Programming Club"> Programming club</option>
              <option value="Electronics Club"> Electronics Club</option>
              <option value="Finance & Analytics Club"> Finance & Analytics Club</option>
              <option value="IITK Consulting Group">
                {" "}
                IITK Consulting Group
              </option>
              <option value="IITK Motorsports"> IITK Motorsports</option>
              <option value="Robotics Club"> Robotics Club</option>
              <option value="AUV"> AUV</option>
              <option value="Aero Club"> Aeromodelling Club</option>
              <option value="Astro Club"> Astro Club</option>
              <option value="Dance Club"> Dance Club</option>
              <option value="Music Club"> Music Club</option>
              <option value="Fine Arts Club"> Fine Arts Club</option>
              <option value="Comedy"> Humour House </option>
              <option value="Dramatics Club"> Dramatics Club</option>
              <option value="Literary Club">
                {" "}
                English Literary Society
              </option>
              <option value="Hindi Sahitya Sabha">
                {" "}
                Hindi Sahitya Sabha
              </option>
              <option value="Quiz Club"> Quiz Club</option>
              <option value="Debating Club"> Debating Society</option>
              <option value="Photography Club"> Photography Club</option>
              <option value="Chess Club"> Chess Club</option>
              <option value="Badminton Club"> Badminton Team</option>
              <option value="Table Tennis team"> Table Tennis Team</option>
              <option value="Basketball Team"> Basketball Team</option>
              <option value="RaSet"> RaSet</option>
              <option value="Gymkhana"> President Gymkhana's Office</option>
              <option value="Counselling Service">
                {" "}
                Counselling Service
              </option>
              <option value="NCC"> NCC</option>
              <option value="NSS"> NSS</option>
            </select>
            <input
              type="text"
              name="from"
              placeholder="Start Date [ Mmm'YY ]"
              autoComplete="off"
              value={newCredential.from}
              onChange={handleInputChangeCredential}
              required
            />
            <input
              type="text"
              name="to"
              placeholder="End Date [ Mmm'YY ]"
              autoComplete="off"
              value={newCredential.to}
              onChange={handleInputChangeCredential}
            />
            <button type="submit" id="addNewCredBtn">
              Add Credential
            </button>
          </form>
          <button onClick={() => setShowCredentialPopup(false)}>
            <div id="closeBtn">Cancel</div>
          </button>
        </div>
      )}

      {/* showProjectPopup */}
      {showProjectPopup && (
        <div id="projectPopup">
          <h2 id="projectPopupHeading">
            {editProjectIndex !== null ? "Edit Project" : "Enter Details"}
          </h2>
          <form onSubmit={handleAddProjectSubmit} id="projectForm">
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              autoComplete="off"
              value={newProject.name}
              onChange={handleInputChangeProject}
              required
            />
            <input
              type="text"
              name="instructorname"
              placeholder="Instructor"
              autoComplete="off"
              value={newProject.instructorname}
              onChange={handleInputChangeProject}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              autoComplete="off"
              value={newProject.description}
              onChange={handleInputChangeProject}
              required
            />
            <input
              type="text"
              name="from"
              placeholder="Start Date: [ Mmm'YY ]"
              autoComplete="off"
              value={newProject.from}
              onChange={handleInputChangeProject}
              required
            />
            <input
              type="text"
              name="to"
              placeholder="End Date: [ Mmm'YY ]"
              autoComplete="off"
              value={newProject.to}
              onChange={handleInputChangeProject}
            />
            <button type="submit" id="addNewProjectBtn">
              Add Project
            </button>
          </form>
          <button onClick={() => setShowProjectPopup(false)}>
            <div id="closeBtn">Cancel</div>
          </button>
        </div>
      )}

      {/* showCoursePopup */}
      {showCoursePopup && (
        <div id="coursePopup">
          <h2 id="coursePopupHeading">
            {editCourseIndex !== null ? "Edit Course" : "Enter Details"}
          </h2>
          <form onSubmit={handleAddCourseSubmit} id="courseForm">
            <input
              type="text"
              name="coursename"
              placeholder="Course Name"
              autoComplete="off"
              value={newCourse.coursename}
              onChange={handleInputChangeCourse}
              required
            />
            <input
              type="text"
              name="instructorname"
              placeholder="Instructor"
              autoComplete="off"
              value={newCourse.instructorname}
              onChange={handleInputChangeCourse}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              autoComplete="off"
              value={newCourse.description}
              onChange={handleInputChangeCourse}
              required
            />
            <input
              type="text"
              name="year"
              placeholder="Year [ YYYY - YYYY ]"
              autoComplete="off"
              value={newCourse.year}
              onChange={handleInputChangeCourse}
              required
            />
            <select
              name="semester"
              value={newCourse.semester}
              onChange={handleInputChangeCourse}
              required
            >
              <option value="">Select Semester</option>
              <option value="Odd">Odd</option>
              <option value="Even">Even</option>
              <option value="Summer">Summer</option>
            </select>
            <button type="submit" id="addNewCourseBtn">
              Add Course
            </button>
          </form>
          <button onClick={() => setShowCoursePopup(false)}>
            <div id="closeBtn">Cancel</div>
          </button>
        </div>
        )}
        
      </div>
      }
    </>
  );
};

export default UserProfile;