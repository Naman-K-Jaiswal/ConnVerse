import React, { useState, useEffect, useRef } from 'react';
import styles from './Members.module.css';
import searchb from './image.png'
import filter from './filter.png'

//Branches = { "CSE", "EE", "ME", "CE", "MSE", "AE", "MTH", "PHY", "ECO", "CHE", "MBA","ES","BSBE","ES"}

const Members = () => {
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const filterPopupRef = useRef(null);
  const [search, setSearch] = useState("");

  const memberData = [];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterPopup && filterPopupRef.current && !filterPopupRef.current.contains(event.target)) {
        setShowFilterPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterPopup]);
  const toggleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  return (
    <div style={{backgroundColor:'#f4f4f4'}}>
      <div className={styles.mainBody}>
        <div className={styles.searchBoxDiv}>
          <input type="text" className={styles.search} placeholder="Search for members" value={search} onChange={(e) => setSearch(e.target.value)}/>
           <button className={styles.searchbarButton}>
            <div className={styles.searchButtonimage}>
                <img src= {searchb} alt="search"/>
            </div>
           </button>
           <button className={styles.searchbarButton} onClick={toggleFilterPopup}>
            <div className={styles.filterButtonimage}>
                <img src= {filter} alt="search" />
            </div>
           </button>
        </div>
        <div id={styles.memberLists}>
  {memberData.map((member) => (
    <div key={member.id} className={styles.memberX}>
      <div className={styles.memberLeftHalfDiv}>
        <div className={styles.memberHeading}>
          <div className={styles.memberProfileImageDiv}>
            <img src={member.profileImageSrc} alt="Profile Photo" />
          </div>
          <div className={styles.memberUsername} style={{ fontWeight: 'bold' }}>{member.username}</div>
        </div>
      </div>
    
      <div className={styles.memberRightHalfDiv}>
        <div className={styles.memberhead}>
          <div className={styles.memberheadingLeft}>
            <div className={styles.memberDegree} style={{ fontWeight: 'bold' }}>{member.degree}</div>
          </div>
          <div className={styles.memberheadingRight}>                    
            <div className={styles.memberTags}>
              {member.tags.map((tag, index) => (
                <div key={index} className={styles.memberTagX} style={{ color: 'black' }}>{tag}</div>
              ))}
            </div>
          </div>
        </div>
        <hr style={{ border: '1px solid black', width: '11%' }} />
        <div className={styles.memberAbout}>
          <p style={{ fontStyle: 'italic', marginRight: '2vw'}}>{member.about}</p>
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
          <div>
            <label htmlFor="skills">Skills:</label>
            <div className={styles.skillInputs}>
              {[...Array(5)].map((_, index) => (
                <input key={index} type="text" className={styles.skillInput} name={`skill${index + 1}`} placeholder={`Skill ${index + 1}`} />
              ))}
            </div>
          </div>
          <div className={styles.filterRow}>
            <div className={styles.programme}>
              <label htmlFor="programme">Programme :</label>
              <select name="programme" id={styles.programme}>
                <option value="BS">BS</option>
                <option value="BT">BTech</option>
                <option value="MS">MS</option>
                <option value="MT-BT">MT-BT</option>
                <option value="MT">MTech</option>
                <option value="PhD">PhD</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className={styles.branch}>
              <label htmlFor="branch">Branch :</label>
              <select name="branch" id={styles.branch}>
                <option value="CSE">CSE</option>
                <option value="EE">EE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="MSE">MSE</option>
                <option value="AE">AE</option>
                <option value="MTH">MTH</option>
                <option value="PHY">PHY</option>
                <option value="ECO">ECO</option>
                <option value="CHE">CHE</option>
                <option value="MBA">MBA</option>
                <option value="ES">ES</option>
                <option value="BSBE">BSBE</option>
                <option value="ES">ES</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
          {/* Add more filters here if needed */}
        </div>

      )}
    </div>
  );
}

export default Members;
