import React from 'react';
import myreviews from './Images/myreviews.svg'
import nearby from './Images/nearbyuni.svg'
import profile from './Images/myprofile.svg'
import cu from './Images/CU.jpg'
import  './Mainpage_cards.css'
function Mainpage_cards() {
  return <div className='mainpage_cards'>
      <div className="main_cardcontainer">
          <div className="main_card">
              <div className="altimage">
                  <img src={myreviews} alt="" />
              </div>
              <h2>My Reviews</h2>
              <p>Checkout all of your reviews</p>
              <button>View Reviews</button>
          </div>
          <div className="main_card">
              <div className="altimage">
                  <img src={nearby} alt="" />
              </div>
              <h2>Universities Nearby</h2>
              <p>Checkout universities near you</p>
              <button>Locate</button>
          </div>
          <div className="main_card">
              <div className="altimage">
                  <img src={profile} alt="" />
              </div>
              <h2>My Profile</h2>
              <p>Update/Manage your profile</p>
              <button>Edit</button>
          </div>
      </div>
      <h2 className='main_divider'>Most Reviewed Universities</h2>
      <div className="main_cardcontainer">
         
          <div className="main_unicard">
              <div className="uni_img">
                  <img src={cu} alt="" />
              </div>
              <div className="uni_info">
                  <h3>Christ University</h3>
                  <p>13 Accomodations</p>
                  <button>Show Me</button>
              </div>
          </div>
          <div className="main_unicard">
              <div className="uni_img">
                  <img src={cu} alt="" />
              </div>
              <div className="uni_info">
                  <h3>Christ University</h3>
                  <p>13 Accomodations</p>
                  <button>Show Me</button>
              </div>
          </div>
          <div className="main_unicard">
              <div className="uni_img">
                  <img src={cu} alt="" />
              </div>
              <div className="uni_info">
                  <h3>Christ University</h3>
                  <p>13 Accomodations</p>
                  <button>Show Me</button>
              </div>
          </div>
      </div>

  </div>;
}

export default Mainpage_cards;
