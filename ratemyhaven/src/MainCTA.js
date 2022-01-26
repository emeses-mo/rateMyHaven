import React ,{useState,useEffect} from 'react'
import  './MainCTA.css'
import cta from "./Images/CTA.svg"
import { db } from "./Firebase";
import { Link } from 'react-router-dom';
function MainCTA() {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [uniNames,setUninames] = useState([])

  

  useEffect(()=>{
    db.collection("Universities").onSnapshot((querySnapshot)=>{
      const uniData=[]
      querySnapshot.forEach((doc)=>{
        uniData.push(doc.data())
      })
setUninames(uniData)
    })
  },[])
  function handleSearchClick(uniname){
    localStorage.setItem("UniversityClicked",JSON.stringify(uniname))
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log("SearchWord",  searchWord)
    setWordEntered(searchWord);
    
    const newFilter = uniNames.filter((value) => {
      return value.Name.toLowerCase().includes(searchWord.toLowerCase());
    });
    
    if (searchWord === "") {
      setFilteredData([]);
      localStorage.clear()
    } else {
      setFilteredData(newFilter);
    }
  };


  return <div className='main_cta'>
    <div className="maincta_container">
    <div className="cta_img">
        <img src={cta} alt="" />
    </div>
    <div className="cta_action">
        <div className="cta_action_text">
             <h1 >Rate Your Haven</h1>
        <p>Share a review of the place where you live and love.</p>
        <input type="text" placeholder='Search for your university' value={wordEntered}
          onChange={handleFilter} />
        <div className="searchResult">
          {filteredData.length !== 0 &&(
            <div className="resultBox">
              {filteredData.slice(0,5).map((uname)=>{
                return (
                  <Link to="/unidisplay" onClick={handleSearchClick(uname.Name)}>
                  <p >{uname.Name}</p>
                  </Link> 

                )
                
                 
              })}
            </div>
          )}
        </div>
        </div>
       
    </div>
    </div>
  </div>
}

export default MainCTA;
