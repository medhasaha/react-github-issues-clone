import "./styles.css";
import React from "react";

import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography, Card, Chip, Hidden} from '@material-ui/core'
import CircleIcon from '@material-ui/icons/Adjust';
import Comment from '@material-ui/icons/ChatBubbleOutline';
import {timeSince} from "./ServiceClass"

const style = theme => ({
  card : {
    padding : "20px",
    cursor : "pointer",
    border : "1px grey",
    "border-bottom-style": "solid",
    '&:hover': {
      background: "#F5F5DC",
      // background: "rgba(233, 245, 248, 0.3)",
   },
  },
  title : {
    fontWeight : "600",
    display : "inline",
    margin : "0px 0px 0px 10px"
  },
  chip : {
    margin : "0px 0px 0px 10px",
    [theme.breakpoints.down('md')]: {
      marginTop : "5px",
      marginBottom : "5px"
    },
    fontWeight : 600
  },
  comments : {
    display : "inline",
    float : "right",
    color : "grey",
    fontSize : "13px"
  },
  commentIcon : {
    fontSize : "15px",
    margin: "0px 5px 0px 0px",
    verticalAlign : "middle"
  },
  info : {
    color : "grey",
    fontSize : "13px",
    margin : "0px 0px 0px 10px",
    display : "inline"
  }
})

const chipColor = {
  "Type: Bug" : {bgColor : "#D2042D", fColor : "#fff"},
  "Status: Unconfirmed" : {bgColor : "#D3D3D3", fColor : "#000"},
  "Component: Developer Tools" : {bgColor : "orange", fColor : "#000"},
  "Type: Enhancement" : {bgColor : "#5F9EA0", fColor : "#000"},
  "Type: Feature Request" : {bgColor : "#0096FF", fColor : "#000"}
}


const IssuesItem = (props) => {

  const onClick = () => {
    console.log("click")
  }

  const { classes } = props;
  let noOfDays = timeSince(new Date(props.createdAt))
  // console.log(noOfDays)
  let time = noOfDays === "1 days" ? "yesterday" : noOfDays + " ago"

  return (
    <Card className = {classes.card} onClick = {onClick}> 
      <Grid container> 
        <Grid item>
          <CircleIcon style={{ color: "green", marginTop : "4px"}}/>
        </Grid>
        <Grid item xs>
          <Typography variant = "subtitle1" className = {classes.title}>{props.title}</Typography>
          {props.labels && props.labels.length > 0 && props.labels.map(item => (
            <Chip label={item.name} 
                  key = {item.id}
                  variant="outlined" 
                  size = "small" 
                  style = {{backgroundColor : (chipColor[item.name] && chipColor[item.name].bgColor) || "#F5F5DC", 
                            color : (chipColor[item.name] && chipColor[item.name].fColor) || "black"}}
          className={classes.chip} />
          ))}
          <Hidden mdDown>
            <div style = {{marginTop : "10px"}}>
              <Typography className = {classes.info}>
                #{props.issueNo} opened at {time} by {props.userName}
              </Typography>
              {props.comments 
                ? <Typography className={classes.comments}>
                    <Comment className = {classes.commentIcon}/>{props.comments}
                  </Typography> 
                : null}
            </div>
          </Hidden>
          <Hidden mdUp>
            <Grid container style = {{marginTop : "10px"}}>
              <Grid item xs>
                <Typography className = {classes.info}>
                  #{props.issueNo} opened at {time} by {props.userName}
                </Typography>
              </Grid>
              <Grid item>
              {props.comments 
                ? <Typography className={classes.comments}>
                    <Comment className = {classes.commentIcon}/>{props.comments}
                  </Typography> 
                : null}
              </Grid>
            </Grid>
          </Hidden>
          </Grid>
      </Grid>
    </Card>
  );
}

export default withStyles(style)(IssuesItem);
