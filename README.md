# Car For U

> A sample app made using React to book cars for intercity travel.

![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)

## Table of Contents

- [Car For U](#car-for-u)
  - [Table of Contents](#table-of-contents)
  - [Clone](#clone)
  - [Installation](#installation)
  - [Setup](#setup)
  - [Docker Configuration](#docker-configuration)
  - [Features](#features)
  - [Tests](#tests)
  - [Created By](#created-by)
  - [FAQ](#faq)
  - [Support](#support)
  - [License](#license)

---

## Clone

- Clone this repo to your local machine using 

```shell
$ git clone https://github.com/boffti/cfu.git
```

---

## Installation

- Replace the `XXX` of the `<Script>` tag in `client\public\index.html` with your [Google Places API](https://developers.google.com/places/web-service/intro) Key.
- Replace the `key` and `secret` in `server.js` with your [RazorPay API](https://razorpay.com/docs/api/) Key and Secret. This can be done with a `.env` file placed in the root of server dir. The variables are `REACT_APP_RZP_KEY` and `REACT_APP_RZP_SECRET`.

## Setup

- Install all the Frontend and Backend dependencies.

> Backend

```shell
$ cd cfu
$ cd server
$ npm install or yarn install
```

> Frontend

```shell
$ cd cfu
$ cd client
$ npm install or yarn install
```

> To run the Node server and the client app server, `cd` into project root dir.

```shell
$ cd cfu
$ cd server
$ npm run dev or yarn dev
```
This will serve both the backend and front end.

App is served on [`localhost:3000`](http://localhost:3000/).

Node server running on [`localhost:5000`](http://localhost:5000/).

The credentials to Login in the app - 

- username - `admin`
- password - `admin`

---

## Docker Configuration

A docker compose file has been written.

Install Docker from [here](https://www.docker.com/products/docker-desktop)

To configure docker, perform the following steps - 

- Change the proxy in `server/package.json`

```json
"proxy" : "http://cfy_server:5000/"
```

- Build the images and start the containers

```shell
$ docker-compose up --build
```

---

## Features

- Material Design
- Backend NodeJS and Express
- Destination Autocomplete using Google Places API
- Calendar Date Picker
- RazorPay payments integration for checkout


## Tests 

- Basic Unit test scripts have been written for a couple of components.

```shell
$ cd cfu
$ npm test or yarn test
```

---

## Created By

 <a href="http://github.com/boffti" target="_blank">**Aneesh Melkot**</a> 

 [![AneeshMelkot](https://media-exp1.licdn.com/dms/image/C5603AQHsiim3D67V_A/profile-displayphoto-shrink_200_200/0?e=1586995200&v=beta&t=INRP5iwYUJ8RuCuQK5E0VRmGySKlVMga1fgS0jszh6Q)](http://github.com/boffti)  
 
 <a href="http://github.com/boffti" target="_blank">`http://github.com/boffti`</a>

---

## FAQ

- How did you calculate the distance between the origin and the destination?

    Ans - Using the haversine function which determines the great-circle distance between two points on a sphere given their longitudes and latitudes. Haven't used any API for this yet.

- Do I have to give my real details to check the RazorPay Booking Payment feature?

    Ans - **NO**. Just give any dummy values for the payment fields as it is running in Test Mode. Booking ID will be generated after Fake Payment.

---

## Support

Reach out to me at one of the following places!

- Twitter at <a href="http://twitter.com/aneeshmelkot" target="_blank">`@aneeshmelkot`</a>

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © Aneesh Melkot