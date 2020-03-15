import React, { Component } from 'react';
import { BrowserRouter as BR, Route, Switch } from 'react-router-dom'; 
import RideSelect from './Components/RideSelect/RideSelect';
import SecondPage from './Components/SecondPage/SecondPage';
import AppBar from './Components/AppBar/AppBar';
import Container from '@material-ui/core/Container';
import LoginPage from './Components/LoginPage/LoginPage';
import FinalPage from './Components/FinalPage/FinalPage';
import ls from 'local-storage';
import './App.css';

class App extends Component {

state = {
    rideType: 'ow'
  };

  componentDidMount() {
    ls.clear();
    ls.set('confirmedDriver', null);
  }  

  render() {    
    return (
      <BR>
        <div className="App">
          <AppBar></AppBar>
          <br />
          <Container>
            <Switch>
              <Route path="/" exact component={ RideSelect } />
              <Route path="/login" component={ LoginPage }/>
              <Route path="/second-page" component={ SecondPage } />
              <Route path="/final-page" component={ FinalPage } />
            </Switch>
          </Container>          
        </div>
      </BR>
    );
  }
}

export default App;
