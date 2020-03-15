import React, { Component } from 'react';
import Driver from './Driver/Driver';
import ls from 'local-storage';
import './SecondPage.css';
import JourneyDetails from './JourneyDetails/JourneyDetails';
import CarDetails from './CarDetails/CarDetails';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

// import img from '../../../matthew.png';
class DriverType extends Component {

    constructor(props) {
        super(props);

        const token = ls.get('token');
        let loggedIn = true;
        token === null ? loggedIn = false : loggedIn = true;

        this.state = {
            rideType: '',
            origin: '',
            destination: '',
            latLng: null,
            date:'',
            drivers: [],
            price: null,
            loggedIn
          };
    }

    componentDidMount() {
        this.getDriverDeets()
            .then(res => {
            res.map(driver => {
                driver.price = driver.priceMod * ls.get('distance');
                return true;
            });
            this.setState({drivers:[...res]});
            ls.set('drivers', this.state.drivers);
            })
            .catch(err => console.log(err));
    }

    getDriverDeets = async () => {
        const driverDeets = await fetch('/api/driver-deets');
        const body = await driverDeets.json();
        if (driverDeets.status !== 200) throw Error(body.message);
        
        return body;
    };

    confirmBookingHandler = (index) => {
        const drivers = this.state.drivers;
        ls.set('confirmedDriver', drivers[index])
        this.props.history.push('/final-page');
    }

    nextPath(path) {
        this.props.history.push(path);
    }   

    render() {

        if(this.state.loggedIn === false) {
            return <Redirect to="/login"/>
          }

        return (
            <div>
                <button onClick={ () => this.nextPath('/') }>Back</button>
                <br/>
                <Grid container>
                    <Grid item xs={6}>
                        <h2>Journey Details</h2>
                        <JourneyDetails />
                    </Grid>
                    <Grid item xs={6}>
                        <h2>Your car details</h2>
                        <CarDetails/>
                    </Grid>
                </Grid>
               
               <br />
               <h2>Select your driver-partner</h2>
               <div className="three">
               { this.state.drivers.map( (driver, index) => {
                   return(
                    <Driver 
                    key={index}
                    name={driver.name}
                    info={driver.pricePerKM}
                    price={driver.price}
                    etc={driver.lingo}
                    click={() => this.confirmBookingHandler(index)}
                    displayButton={true}
               />
                   );
               }) }
               </div>
            </div>
        );
    }
}

export default DriverType;