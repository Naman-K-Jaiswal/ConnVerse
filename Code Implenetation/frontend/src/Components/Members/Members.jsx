import React, { useState, useEffect, useRef } from "react";
import styles from "./Members.module.css";
import profileImg from "./pp.jpeg";
import searchb from "./image.png";
import filter from "./filter.png";
import { useNavigate } from "react-router-dom";

//Branches = { "CSE", "EE", "ME", "CE", "MSE", "AE", "MTH", "PHY", "ECO", "CHE", "MBA","ES","BSBE","ES"}

const Members = () => {
  const navigate = useNavigate();
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const filterPopupRef = useRef(null);
  const [search, setSearch] = useState("");

  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showFilterPopup &&
        filterPopupRef.current &&
        !filterPopupRef.current.contains(event.target)
      ) {
        setShowFilterPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterPopup]);
  const toggleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  const [filters, setFilters] = useState({
    name : "",
    userid: "",
    degree: "",
    skills: [],
    organisation: "",
    courses: [],
  });
  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newFilters = {
      name: filters.name,
      userid: filters.userid,
      degree: formData.get("programme") + " " + formData.get("branch"),
      skills: [formData.get("skill1"), formData.get("skill2"), formData.get("skill3"),formData.get("skill4")],
      organisation: formData.get("Organisation"),
      courses: [formData.get("course1"), formData.get("course2"),formData.get("course3"), formData.get("course4")],
    };

    setFilters(newFilters);
    setShowFilterPopup(false);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    function containsOnlyNumbers(str) {
      return /^\d+$/.test(str);
    }

    if(containsOnlyNumbers(search)){
      const newFilters = {
        userid: search,
        name: "",
        degree: filters.degree,
        skills: filters.skills,
        organisation: filters.organisation,
        courses: filters.courses,
      }
      setFilters(newFilters);
    } else {
      const newFilters = {
        userid: "",
        name: search,
        degree: filters.degree,
        skills: filters.skills,
        organisation: filters.organisation,
        courses: filters.courses,
      }
      setFilters(newFilters);
    }
  };

  const handleSearchChange = (event) => {
    const val = event.target.value;
    setSearch(val);
  }

  useEffect(() => {
    const func = async () => {
      try{
        const res = await fetch(`http://localhost:8080/profile/search`,{
          method: 'POST',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: filters.userid,
            name: filters.name,
            degree: filters.degree,
            skills: filters.skills,
            organisation: filters.organisation,
            courses: filters.courses,
          })
        })

        if(res.ok){
          const data = await res.json();
          console.log(data);

          if(data.users != null){
            setMemberData(data.users);
          } else {
            setMemberData([]);
          }
        }
      } catch(error) {

      }
    }

    func();
  }, [filters]);

  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <div className={styles.mainBody}>
        <div className={styles.searchBoxDiv}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search for members"
            onChange={handleSearchChange}
          />
          <button className={styles.searchbarButton} onClick={handleSearchSubmit}>
            <div className={styles.searchButtonimage}>
              <img src={searchb} alt="search" />
            </div>
          </button>
          <button
            className={styles.searchbarButton}
            onClick={toggleFilterPopup}
          >
            <div className={styles.filterButtonimage}>
              <img src={filter} alt="search" />
            </div>
          </button>
        </div>
        <div id={styles.memberLists}>
          {memberData.map((member) => (
            <div key={member.ID} className={styles.memberX} onClick={() => navigate(`/userprofile/${member.userid}`)}>
              <div className={styles.memberLeftHalfDiv}>
                <div className={styles.memberHeading}>
                  <div className={styles.memberProfileImageDiv}>
                    <img src={`data:image/jpeg;base64,${member.profilephoto}`} alt="Profile Photo" />
                  </div>
                  <div className={styles.memberUsername}>{member.name}</div>
                </div>
              </div>

              <div className={styles.memberRightHalfDiv}>
                <div className={styles.memberhead}>
                  <div className={styles.memberheadingLeft}>
                    <div className={styles.memberDegree}>{member.degree}</div>
                  </div>
                  <div className={styles.memberheadingRight}>
                    <div className={styles.memberTags}>
                      {member.skills.slice(0,5).map((tag, index) => (
                        <div key={index} className={styles.memberTagX}>
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.memberAbout}>
                  <p>{member.about}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showFilterPopup && (
        // Inside the filterPopup div in the JSX
        <div className={styles.filterPopup}>
          <h2>Filter Results</h2>
          <form className={styles.filterForm} onSubmit={handleFilterSubmit}>
            <div>
              <label htmlFor="skills">Skills:</label>
              <div className={styles.skillInputs}>
                {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    className={styles.skillInput}
                    name={`skill${index + 1}`}
                    placeholder={`Skill ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.programme}>
                <label htmlFor="programme">Programme :</label>
                <select name="programme" id={styles.programme}>
                  <option value="BS">BS</option>
                  <option value="BTech">BTech</option>
                  <option value="MS">MS</option>
                  <option value="MTech">MTech</option>
                  <option value="PhD">PhD</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className={styles.branch}>
                <label htmlFor="branch">Branch :</label>
                <select name="branch" id={styles.branch}>
                  <option value="Computer Science and Engineering">CSE</option>
                  <option value="Electrical Engineering">EE</option>
                  <option value="Mechanical Engineering">ME</option>
                  <option value="Civil Engineering">CE</option>
                  <option value="Materials Science and Engineering">MSE</option>
                  <option value="Aerospace Engineering">AE</option>
                  <option value="Mathematics and Scientific Computing">
                    MTH
                  </option>
                  <option value="Physics">PHY</option>
                  <option value="Economics">ECO</option>
                  <option value="Chemical Engineering">CHE</option>
                  <option value="Earth Science">ES</option>
                  <option value="Biological Sciences and Engineering">
                    BSBE
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="courses">Courses Taken :</label>
              <div className={styles.skillInputs}>
                {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    className={styles.skillInput}
                    name={`course${index + 1}`}
                    placeholder={`Course ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="Organisation">Organisation</label>
              <div className={styles.branch}>
                <select name="Organisation" id={styles.branch}>
                  <option value="Programming Club"> Programming club</option>
                  <option value="Electronics Club"> Electronics Club</option>
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
              </div>
            </div>
            <div>
              <input
                type="submit"
                value="ApplyFilters"
                className={styles.ApplyButton}
              />
            </div>
          </form>

          {/* Add more filters here if needed */}
        </div>
      )}
    </div>
  );
};

export default Members;
