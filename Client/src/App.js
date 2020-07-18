import React from 'react';
import logo from './logo.png';
import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import {Home} from '../src/Ui/Home';
import {Browse} from '../src/Ui/Browse';
import {About} from '../src/Ui/About';


function App() {
  return (
    <React.Fragment>
     <Router>
       <Route exact path='/' component={Home}></Route>
       <Route path='/Browse' component={Browse}></Route>
       <Route path='/About' component={About}></Route>
     </Router>
    </React.Fragment>
  );
}

export default App;
