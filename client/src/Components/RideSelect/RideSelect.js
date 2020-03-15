import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputAutocomplete from './InputAutocomplete/InputAutocomplete';
import { Input, DatePicker, Radio, Button, Row, Col } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './RideSelect.css';
import ls from 'local-storage';
import history from '../../history';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  box_width: {
    maxWidth: 300,
  }
});

class RideSelect extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      type: 'ow',
      from : 'Bangalore',
      journeyDate: null,
      destination: null,
      lat:null,
      lng:null,
      distance: null,
      journeyTime: null,
      
    };
  }

componentDidMount() {
  ls.set('rideType', this.state.type);
  ls.set('origin', this.state.from);
}

destinationChangeHandler(event) {
  this.setState({ to: event.target.value });
}

dateChangeHandler(date, dateStr) {
  ls.set('journeyDate', dateStr);
  this.setState({ journeyDate: dateStr });
}

handleBooking = async e => {
  // e.preventDefault();
  const response = await fetch('/api/price', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lat: this.state.lat, lng: this.state.lng }),
  });
  const body = await response.json();
  
  ls.set('distance', body.distance);
  ls.set('journeyTime', body.days);
};

continueHandler = () => {
  history.push('/second-page')
}

getDestVal = (val) => {
  this.setState({destination : val[0], lat : val[1].lat, lng : val[1].lng})
  ls.set('destination', this.state.destination)
  ls.set('lat', this.state.lat)
  ls.set('lng', this.state.lng)
    
  console.log(this.state.destination);
}

nextPath(path) {
  if(this.state.destination != null) {
    this.handleBooking();
    this.props.history.push(path);
  }
}

  render() {

    return (
      <Card className={ useStyles.root }>
        <CardContent>
          <Typography variant="h5" component="h2">
              Chauffeur Driven, On Demand
          </Typography>
          <br />
          <div className="centerAlign">
            <Typography className={ useStyles.pos } color="textSecondary">
              Where to?
            </Typography>
            <Radio.Group defaultValue="ow" buttonStyle="solid">
              <Radio.Button value="ow">One Way</Radio.Button>
              <Radio.Button disabled value="rt">Round Trip</Radio.Button>
              <Radio.Button disabled value="m">Multicity</Radio.Button>
              <Radio.Button disabled value="a">Airport</Radio.Button>
            </Radio.Group>
          </div>
          <br />
          <Typography className={ useStyles.pos } color="textSecondary">
            Select your journey deets
          </Typography>
          <Row>
            <Col span={6}>
              <Input className={ useStyles.box_width } size="large" value={this.state.from} disabled="True" placeholder="Select Origin" prefix={<RightCircleOutlined />} />
            </Col>
            <Col span={6}>
              <InputAutocomplete getVal={this.getDestVal}></InputAutocomplete>
            </Col>
            <Col span={6}>
              <DatePicker style={{width : 295}} onChange={(date, dateStr) => this.dateChangeHandler(date, dateStr)} size="large" showToday="True"/>
            </Col>
            <Col span={6}>
            <Button type="primary" size="large" onClick={ () => this.nextPath('/second-page')}>
            Continue
          </Button>
            </Col>
          </Row>
          <br />
          
        </CardContent>
      </Card>

    
    );
  }
}

export default RideSelect;