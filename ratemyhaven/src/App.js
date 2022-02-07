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


function App() {
  const [{},dispatch] = useStateValue();
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
      <Route path="/add-accomodation">
      <Header />
     <AddAccomodation />
     
    </Route>
      <Route path="/user-signup">
     
         <UserSignup />
        </Route>
      <Route path="/university-listings">
      <Header />
         <DisplayListings />
        </Route>
      <Route path="/service-addUni">
         <BackDoorAddUnis />
        </Route>
      <Route path="/unidisplay">
         <Test />
        </Route>

        <Route path="/">
          <div className="container">
            <Header />
          <MainCTA />
          <Mainpage_cards />
          </div>
          
        </Route>
        

      </Switch>
     
     
    </div>
    </Router>
  );
}

export default App;
