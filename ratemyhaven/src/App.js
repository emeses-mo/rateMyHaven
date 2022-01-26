

import './App.css';
import Header from './Header';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MainCTA from './MainCTA';
import Mainpage_cards from './Mainpage_cards';
import Test from './Test';


function App() {
  return (
    <Router >
    <div className="app">
      <Switch>
      <Route path="/test">
         <Test />
        </Route>

        <Route path="/">
          <Header />
          <MainCTA />
          <Mainpage_cards />
        </Route>
        

      </Switch>
     
     
    </div>
    </Router>
  );
}

export default App;
