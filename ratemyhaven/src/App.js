import { auth } from './Firebase';
import { useStateValue } from './StateProvider';
import './App.css';
import React, {useEffect} from 'react';
import Header from './Header';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MainCTA from './MainCTA';
import Mainpage_cards from './Mainpage_cards';
import Test from './Test';
import BackDoorAddUnis from './BackDoorAddUnis';
import DisplayListings from './DisplayListings';
import UserSignup from './UserSignup';
import AddAccomodation from './AddAccomodation';
import AccomodationReviews from './AccomodationReviews';
import AddReview from './AddReview';
import Login from './Login';
import Landing from './Landing';
import DisplayNew from './DisplayNew';
import Nav1 from './Nav1';
import MyReviews from './MyReviews';
import AdminDash from './AdminDash';
import ManageProfile from './ManageProfile';


function App() {
  const [{ user },dispatch]= useStateValue();
  
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      console.log("User is>" , authUser);
      if(authUser){
        dispatch({
          type:'SET_USER',
          user:authUser,
        });
      }
      else{
        dispatch({
          type:'SET_USER',
          user:null,
        });

      }
    })
  }, [])



  return (
    <Router >
    <div className="app">
      <Switch>
        <Route path='/manage-profile'>
        <Nav1 />
          <ManageProfile />
        </Route>
        <Route path='/admin-dashboard'>
            <AdminDash />
        </Route>
        <Route path='/my-reviews'>
       
          {
            user ? <div>  <Nav1 /><MyReviews /></div>  : <Login />
          
          }
         
        </Route>
        <Route path='/newdisplay'>
          <DisplayNew />
        </Route>
        <Route path='/user-login'>
          <Login />
        </Route>
      <Route path="/add-review">
      {
        user ?  <AddReview /> :  <Login />
      }
    
      
     </Route>
      <Route path="/accomodation-reviews">
      
     <AccomodationReviews />
     
    </Route>
      <Route path="/add-accomodation">
        {
          user ? <div><Header />
          <AddAccomodation /></div> : <Login />
        }
      
     
    </Route>
    <Route path="/test">
      {/* <Header />
     <AddAccomodation /> */}

    <Nav1 />
    </Route>
      <Route path="/user-signup">
      <Nav1 />
         <UserSignup />
        </Route>
      <Route path="/university-listings">
      <DisplayNew />
        </Route>
      <Route path="/service-addUni">
         <BackDoorAddUnis />
        </Route>
      <Route path="/unidisplay">
         <Test />
        </Route>
<Route path='/home'>
  
</Route>
        <Route path="/">
          <div className="container">
          <Nav1 />
          <Landing />
          </div>
          
        </Route>
        

      </Switch>
     
     
    </div>
    </Router>
  );
}

export default App;
