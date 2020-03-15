import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import logo from './drive.png'; 

const useStyles = makeStyles({
  root: {
    display: 'flex',
    marginLeft:10,
    height: 200
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 250,
  }
});

export default function MediaControlCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardMedia
        className={classes.cover}
        image={logo}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Cayenne
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Porche
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}