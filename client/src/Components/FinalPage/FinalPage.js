import React, { Component } from 'react';
import ls from 'local-storage';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import img from './trip.jpg';
import Driver from '../SecondPage/Driver/Driver';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';

const useStyles = {
    root: {
      maxWidth: 600,
      margin: 'auto'
    },
    media: {
      height: 200,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      marginLeft: 'auto',
      marginRight:10
    },
    avatar: {
      backgroundColor: red[500],
    },
  };

 
export default class FinalPage extends Component{

  constructor(props) {
    super(props);

    const token = ls.get('token');
        let loggedIn = true;
        token === null ? loggedIn = false : loggedIn = true;

    this.state = {
      confirmedDriver: null,
      loggedIn
    };
  
  }

  
  paymentHandler() {
    // e.preventDefault();

    const payment_amount = ls.get('confirmedDriver').price;
    const self = this;
    const options = {
        key: process.env.REACT_APP_RZP_KEY,
        amount: payment_amount*100,
        name: 'Car For U',
        description: 'Book your car by paying below',

        handler(response) {
        const paymentId = response.razorpay_payment_id;
        alert('You booking id is ' + paymentId);
        const url = process.env.URL+'/api/v1/rzp_capture/'+paymentId+'/'+payment_amount;
        // Using my server endpoints to capture the payment
        fetch(url, {
            method: 'get',
            headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
        .then(resp =>  resp.json())
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            self.setState({
            refund_id: response.razorpay_payment_id
            });
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
        },

        prefill: {
        name: 'Aneesh Melkot',
        email: '',
        },
        notes: {
        address: 'Bangalore, India',
        },
        theme: {
        color: '#1565C0',
        },
    };
    const rzp1 = new window.Razorpay(options);

    rzp1.open();
    }

    
  render() {

    if(this.state.loggedIn === false) {
      return <Redirect to="/login"/>
    }

    return (
        <div>
          <Container>
          <Card style={useStyles.root}>
          <CardHeader
            action={
              null
            }
            title={ls.get('destination')}
            subheader={ ls.get('journeyDate') }
          />
          <CardMedia
            style={useStyles.media}
            image={img}
            title="trip"
          />
          <CardContent>

          <TextField
            margin="normal"
            // onChange={this.onChange}
            label="Pickup Address"
            id="outlined-size-normal"
            // defaultValue={this.state.userName}
            variant="outlined"
            name="address"
          />
            <br/>
            <Typography>You driver-partner details</Typography>
            <Driver 
             name={ls.get('confirmedDriver').name}
             info={ls.get('confirmedDriver').pricePerKM}
             price={ls.get('confirmedDriver').price}
             etc={ls.get('confirmedDriver').lingo}
            displayButton={false}></Driver>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>

            <Button onClick={this.paymentHandler} style={useStyles.expand} size="large" variant="contained" color="primary">
            Confirm and Book
          </Button>

          </CardActions>
        </Card>
          </Container>
        </div>
      );
  }
    
  }