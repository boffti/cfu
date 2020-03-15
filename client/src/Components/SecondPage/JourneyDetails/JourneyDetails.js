import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ls from 'local-storage';
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginRight:10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Destination
        </Typography>
        <Typography variant="h5" component="h2">
          {ls.get('destination')}
        </Typography>
        <br />
        <Typography className={classes.pos} color="textSecondary">
        <PlaceIcon color="primary" fontSize="small"></PlaceIcon> &nbsp;
          {ls.get('distance')}km
        </Typography>
        <Typography variant="body2" component="p">
        <DepartureBoardIcon color="primary" fontSize="small"></DepartureBoardIcon> &nbsp;
          {ls.get('journeyTime')} day(s)
        </Typography>
        <br />
        <Typography variant="body2" component="p">
        <EventIcon color="primary" fontSize="small"></EventIcon> &nbsp;
         {ls.get('journeyDate')}
         </Typography>
      </CardContent>
    </Card>
  );
}