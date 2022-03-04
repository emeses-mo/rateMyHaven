import React ,{useState,useEffect} from 'react'
import logo from './Images/logoFinal.png'
import './Landing.css'
import cta from "./Images/CTA.svg"
import search from './Images/search.png'
import { db } from "./Firebase";
import { Link } from 'react-router-dom';
function Landing() {
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


  return (
    <div className='landing_main'>
        <div className="landing_header">
            <div className="landing_logo">
                <img src={logo} alt="" />    
            </div>
            <div className="landing_nav">
              <Link to='/' className='no-dec'><p>Home</p></Link>  
                <p>My Reviews</p>
                <p>About</p>    
            </div>
            <div className="landing_auth">
             <Link className='no-dec' to='user-login'><p>Login</p></Link>   
                <p>|</p>
            <Link className='no-dec' to='user-signup'> <p>Sign up</p></Link>   
            </div>
        </div>
        
        <div className="landing_hero">
            <div className="hero1">
                <div className="hero_text">
                <h2>Rate your haven</h2>
                <p>Share a review of the place <br /> where you live and love</p>    
                </div>
                <div className="hero_search">
                    <div className="search_wrapper">
                        <input type="search" value={wordEntered} onChange={handleFilter} />
                        <img src={search} alt="" />
                    </div>
                    <div className="search-result">
                        {
                            filteredData.length !== 0 &&(
                                <div className="result-box">
                                    {
                                        filteredData.slice(0,5).map((uname)=>{
                                            return (
                                                <Link className='no-dec' to="/university-listings" onClick={handleSearchClick(uname.Name)}>
                  <p >{uname.Name}</p>
                  </Link> 
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="hero2">
            <div className="cta_img">
        <img src={cta} alt="" />
    </div>  
                        
            </div>
        </div>
    </div>
  )
}

export default Landing