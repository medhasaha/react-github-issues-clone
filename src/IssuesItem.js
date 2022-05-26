import "./styles.css";
import React, {useState} from "react";

import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography, Card, Chip, Hidden, Popper, Popover} from '@material-ui/core'
import CircleIcon from '@material-ui/icons/Adjust';
import Comment from '@material-ui/icons/ChatBubbleOutline';
import {timeSince, formattedDate} from "./ServiceClass"

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
    margin : "0px 0px 0px 10px",
    '&:hover': {
      color : "blue"
    },
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
  },
  popperDiv : {
    // height : "50px",
    maxWidth : "400px",
    pointerEvents: "auto",
		borderRadius : "6px",
		border : `1px solid rgba(0, 0, 0, 0.23)`
  },
  popperCard : {
		padding : "20px",
  },
  issueTitle : {
    fontWeight : "600",
    display : "inline",
    lineHeight : "1.25",
    fontSize : "0.8rem",
  },
  issueNo : {
    color : "grey",
    fontSize : "0.8rem",
    display : "inline",
    margin : "0px 0px 0px 10px"
  },
  issueBody : {
    fontSize : "0.8rem",
		fontWeight : 400,
		color : "grey",
		marginTop: "0px !important",
		lineHeight: "1.2rem !important",
		textOverflow: "ellipsis",
		overflow: "hidden",
		"-webkit-line-clamp": 2,
		"-webkit-box-orient": "vertical",
		maxHeight: "2.5rem",
		display: "-webkit-box",
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
  //anchor elemnt for popper
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onClick = () => {
    console.log("click")
  }

  //onMouseOver for title
  const handlePoperOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //onMouseOut for title
  const handlePoperClose = () => {
    setAnchorEl(null);
  };

  const { classes } = props;
  const open = Boolean(anchorEl); // open - T/F for popper to open
  let noOfDays = timeSince(new Date(props.createdAt))
  // console.log(noOfDays)
  // console.log(formattedDate(props.createdAt))
  let time = noOfDays === "1 days" ? "yesterday" : noOfDays + " ago"

  return (
    <React.Fragment>
    <Card className = {classes.card} onClick = {onClick}> 
      <Grid container> 
        <Grid item>
          <CircleIcon style={{ color: "green", marginTop : "4px"}}/>
        </Grid>

        <Grid item xs>
          {/*issue title*/}
          <Typography variant = "subtitle1" 
                      className = {classes.title} 
                      onMouseEnter={handlePoperOpen}
                      onMouseLeave={handlePoperClose}>
            {props.title}
          </Typography>

          {/*issue label or tags*/}
          {props.labels && props.labels.length > 0 && props.labels.map(item => (
            <Chip label={item.name} 
                  key = {item.id}
                  variant="outlined" 
                  size = "small" 
                  style = {{backgroundColor : (chipColor[item.name] && chipColor[item.name].bgColor) || "#F5F5DC", 
                            color : (chipColor[item.name] && chipColor[item.name].fColor) || "black"}}
          className={classes.chip} />
          ))}

          {/*time and user*/}
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
    
    {/*on hover for title*/}
    <Popper open={open} 
            anchorEl={anchorEl} 
            className={classes.popperDiv}
            placement="bottom"
            disablePortal={false}
            modifiers={{
              flip: {
                enabled: true,
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'scrollParent',
              }
            }}>
      <Card className={classes.popperCard}>
        <Grid container>

          <Grid item xs = {12} style = {{marginBottom : "10px"}}>
            <Typography variant = "body2">facebook/react on {formattedDate(props.createdAt)}</Typography>
          </Grid>

          <Grid item>
            <CircleIcon style={{ color: "green", margin : "4px 10px 0px 0px"}}/>
          </Grid>
          <Grid item xs>
            <Typography variant = "subtitle1" className = {classes.issueTitle} >
              {props.title} 
            </Typography>
            <Typography variant = "subtitle1" className = {classes.issueNo}>
              #{props.issueNo}
            </Typography>
          </Grid>

          {/*issue body - needs formatting*/}
          <Grid item xs = {12} style = {{marginTop : "10px"}}>
            <Typography variant = "subtitle1" className = {classes.issueBody}>{props.issueBody}</Typography>
          </Grid>

        </Grid>
      </Card>
    </Popper>
    </React.Fragment>
  );
}

export default withStyles(style)(IssuesItem);
