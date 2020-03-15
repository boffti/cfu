const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const shortid = require('shortid');

const Razorpay = require('razorpay');

const key = "XXX";
const secret = "XXX";

const instance = new Razorpay({
  key_id: key,
  key_secret: secret
});

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Courtesy GOOGLE
const blr_coordinates = {
  lat: 12.9716,
  lng: 77.5946
};

let driver_deets = [
  { name: 'Driver 1', pricePerKM:"₹15/km", price:0, lingo:"Hindi", priceMod: 15 },
  { name: 'Driver 2', pricePerKM:"₹18/km", price:0, lingo:"Kannada", priceMod: 18 },
  { name: 'Driver 3', pricePerKM:"₹20/km", price:0, lingo:"English", priceMod: 20 },
];

// Using the Haversine function to calculate the distance between
// as I dont want to be charged for a buttload of API Queries.
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

app.get('/api/driver-deets', (req, res) => {
  res.json(driver_deets);
});

let distance = null;
let days = null;

app.post('/api/price', (req, res) => {
  distance = getDistanceFromLatLonInKm(blr_coordinates.lat, blr_coordinates.lng, req.body.lat, req.body.lng);
  days = distance / 300;

  res.json({
    distance: Math.ceil(distance),
    days: Math.ceil(days)
  }
  );
});

app.get('/api/v1/rzp_capture/:payment_id/:amount', (req, res) => {
  const {payment_id } = req.params;
  const amount = Number(req.params.amount*100);
  instance.payments.capture(payment_id, amount).then((data) => {
    res.json(data);
    // console.log(data);
  }).catch((error) => {
    res.json(error);
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));