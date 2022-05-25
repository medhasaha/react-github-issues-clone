import "./styles.css";
import React from "react";

import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography, Card, Chip} from '@material-ui/core'
import CircleIcon from '@material-ui/icons/Adjust';

import {timeSince} from "./ServiceClass"

const style = theme => ({
  card : {
    padding : "20px",
    // display : "flex"
  },
  title : {
    fontWeight : "600",
    display : "inline",
    margin : "0px 0px 0px 10px"
  },
  chip : {
    margin : "0px 0px 0px 10px",
    fontWeight : 600
  },
})

const chipColor = {
  "Type: Bug" : {bgColor : "#D2042D", fColor : "#fff"},
  "Status: Unconfirmed" : {bgColor : "#D3D3D3", fColor : "#000"},
  "Component: Developer Tools" : {bgColor : "orange", fColor : "#000"},
  "Type: Enhancement" : {bgColor : "#5F9EA0", fColor : "#000"},
  "Type: Feature Request" : {bgColor : "#0096FF", fColor : "#000"}
}


class IssuesItem extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.labels)
  }

  render() {
    const { classes } = this.props;

    let noOfDays = timeSince(new Date(this.props.createdAt))
    // console.log(noOfDays)
    let time = noOfDays === "1 days" ? "yesterday" : noOfDays + " ago"

    return (
      <Card className = {classes.card}> 
        <CircleIcon style={{ color: "green", alignSelf : "center"}}/>
        <Typography variant = "h6" className = {classes.title}>{this.props.title}</Typography>
        {this.props.labels && this.props.labels.length > 0 && this.props.labels.map(item => (
          <Chip label={item.name} 
                variant="outlined" 
                size = "small" 
                style = {{backgroundColor : (chipColor[item.name] && chipColor[item.name].bgColor) || "#F5F5DC", 
                          color : (chipColor[item.name] && chipColor[item.name].fColor) || "black"}}
        className={classes.chip} />
        ))}
        <div>
          <Typography>
            #{this.props.issueNo} opened at {time} by {this.props.userName}
          </Typography>
        </div>
      </Card>
    );
  }
}

export default withStyles(style)(IssuesItem);
