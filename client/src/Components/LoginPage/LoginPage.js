import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import ls from 'local-storage';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const useStyles = {
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
};


class LoginPage extends Component {

  constructor(props) {
    super(props);
    let loggedIn = false;
    this.state = {
      username: '',
      password:'',
      loggedIn
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);

  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if(username === "admin" && password === "admin") {
      ls.set("token", "56@cysXs");
      this.setState({
        loggedIn: true
      });
    } else {
      return <p>Invalid Creds</p>
    }
  }

 render() {
   if(this.state.loggedIn){
     return <Redirect to="/" />
   }
  return (
    <div>
       <Container>
       <Card>
         <CardContent>
           <Typography variant="h5" component="h2">
               Login
           </Typography>
           <br />
        <form onSubmit={this.submitForm}>
          <TextField
            margin="normal"
            onChange={this.onChange}
            label="Username"
            id="outlined-size-normal"
            // defaultValue={this.state.userName}
            variant="outlined"
            name="username"
          />
          <br />
            <TextField
            margin="normal"
            onChange={this.onChange}
            label="Password"
            id="outlined-size-normal"
            variant="outlined"
            type="password"
            name="password"
          />
          <br />
          <Button type="submit" size="large" variant="contained" color="primary">
            Login
          </Button>
        </form>
          
           
         </CardContent>
       </Card>
       </Container>
    </div>
   );
 }
};

export default LoginPage;