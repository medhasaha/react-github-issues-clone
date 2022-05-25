import "./styles.css";
import { getGithubIssues } from "./ServiceClass.js";
import React from "react";

import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography, Chip, Divider, Tabs, Tab} from '@material-ui/core'
import InfiniteScroll from "react-infinite-scroll-component";
import IssuesItem from "./IssuesItem";
import withWidth from '@material-ui/core/withWidth';

import CodeIcon from '@material-ui/icons/Code';
import CircleIcon from '@material-ui/icons/Adjust';
import ForkIcon from '@material-ui/icons/CallSplit';
import PullRequestIcon from '@material-ui/icons/AccountTree';
import ActionIcon from '@material-ui/icons/PlayCircleFilledWhite';
import ProjectIcon from '@material-ui/icons/Assessment';
import WikiIcon from '@material-ui/icons/MenuBook';
import SecurityIcon from '@material-ui/icons/VerifiedUser';
import InsightIcon from '@material-ui/icons/TrendingUp';
import CheckIcon from '@material-ui/icons/Check';

const style = theme => ({
  div : {
    height : "100px",
  },
  header : {
    "height" : "100%",
    width : "100%",
    "background-color" : "#e9f5f8",
    "border-bottom" : "1px grey solid",
    padding : "30px 20px 0px 20px"
  },
  secondHeader : {
    width : "100%",
    "background-color" : "#e9f5f8",
    padding : "20px 20px 20px 20px"
  },
  chip : {
    margin : "0px 0px 0px 10px",
    fontWeight : 600,
    verticalAlign : "initial"
  },
  customChip : {
    border : "1px rgba(0, 0, 0, 0.23) solid",
    borderRadius : "5px",
    display: "inline-block",
    // padding : "5px",
    margin : "0px 10px",
    [theme.breakpoints.down('md')]: {
      marginTop : "5px",
      marginBottom : "5px"
    },
    [theme.breakpoints.up('md')]: {
      float : "right"
    },
  },
  typoCustomChip : {
    fontWeight : 600,
    fontSize : "13px"
  },
  verticalDiv : {
    margin : "0px 0px"
  },
  tabItem : {
    fontWeight : 800
  },
  indicator: {
    backgroundColor: 'orange',
  },
  icon : {
    fotSize : "20px",
    margin: "0px 10px 0px 0px",
    verticalAlign : "bottom",
    color : "rgba(0, 0, 0, 0.23)"
  },
  checkIcon : {
    fotSize : "20px",
    margin: "0px 10px 0px 20px",
    verticalAlign : "bottom",
    color : "rgba(0, 0, 0, 0.23)"
  },
  tablabel : {
    fontWeight : 500,
    color : "#000",
    fontSize : "14px"
  },
  issuesGrid : {
    [theme.breakpoints.up('md')]: {
      margin : "20px 100px 0px 100px",
    },
    overflowX : "hidden",
    border : "1px rgba(0, 0, 0, 0.23) solid",
    "border-top-style": "solid",
    "border-right-style": "solid",
    "border-left-style": "solid",
  },
  infiniteScroll : {
    width : "100vw",
    [theme.breakpoints.down('md')]: {
      width : "100vw"
    },
  }
})

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [],
      page : 1,
      hasMore : true
    };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    getGithubIssues(this.state.page)
    .then((res) => {
      console.log(res);
      // this.setState({
      //   data : res
      // }) 
      this.setState(prevState => ({
        data: prevState.data.concat(res),
        page: prevState.page + 1,
        hasMore : prevState.page === 10 ? false : true
      }))

    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container> 
        <Grid container className = {classes.header}>
          <Grid item md = {6} xs = {12}>
            <Typography variant = "h6" style = {{display : "inline", color : "#0969da"}}>facebook</Typography>
            <Typography variant = "h6" style = {{display : "inline"}}> / </Typography>
            <Typography variant = "h6" style = {{display : "inline", color : "#0969da", fontWeight : 600}}>react</Typography>
            <Chip label="Public" variant="outlined" size = "small" className={classes.chip}/>
          </Grid>

          <Grid item md = {6} xs = {12}>
            <Grid className={classes.customChip} style = {{display : "inline-flex"}}> 
              <Grid item style = {{padding : "5px 5px 5px 10px"}}>
                <Typography style = {{display : "flex"}} className = {classes.typoCustomChip}>Fork </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem  className = {classes.verticalDiv}/> 
              <Grid item style = {{padding : "5px 10px 5px 5px", backgroundColor : "#fff"}}>
                <Typography className = {classes.typoCustomChip}>35.3k</Typography>
              </Grid>
            </Grid>
            <Grid className={classes.customChip} style = {{display : "inline-flex"}}> 
              <Grid item style = {{padding : "5px 5px 5px 10px"}}>
                <Typography style = {{display : "flex"}} className = {classes.typoCustomChip}>Star </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem  className = {classes.verticalDiv}/> 
              <Grid item style = {{padding : "5px 10px 5px 5px", backgroundColor : "#fff"}}>
                <Typography className = {classes.typoCustomChip}>175k</Typography>
              </Grid>
            </Grid>
            <div className={classes.customChip} style = {{padding : "5px"}}>
              <Typography className = {classes.typoCustomChip}>Notifications</Typography>
            </div>
          </Grid>

          <Tabs
          value={1}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          style = {{marginTop : "20px"}} 
          classes={{
            indicator: classes.indicator
          }}>
            <Tab label={<Typography className = {classes.tablabel}><CodeIcon className={classes.icon}/>Code</Typography>}/>
            <Tab label={<Typography className = {classes.tablabel}><CircleIcon className={classes.icon}/>Issues</Typography>} />
            <Tab label={<Typography className = {classes.tablabel}><PullRequestIcon className={classes.icon}/>Pull Request</Typography>}  />
            <Tab label={<Typography className = {classes.tablabel}><ActionIcon className={classes.icon}/>Actions</Typography>} />
            <Tab label={<Typography className = {classes.tablabel}><ProjectIcon className={classes.icon}/>Projects</Typography>} />
            <Tab label={<Typography className = {classes.tablabel}><SecurityIcon className={classes.icon}/>Security</Typography>}  />
            <Tab label={<Typography className = {classes.tablabel}><InsightIcon className={classes.icon}/>Insights</Typography>} />
          </Tabs>
        </Grid>

        <Grid container ref={this.myRef} className = {classes.issuesGrid}>
          <Grid item xs = {12} className = {classes.secondHeader}>
            <Typography>
              <CircleIcon className = {classes.icon} style = {{color : "#000"}}/> 625 Open 
              <CheckIcon className={classes.checkIcon}/>10,140 Closed
            </Typography>
          </Grid>
          <InfiniteScroll
            dataLength={this.state.data.length}
            next={this.fetch}
            style = {{width: this.props.width === "xs" || this.props.width === "xl" ? "100vw" : "100%", overflowX : ""}}
            hasMore={this.state.hasMore}>
              {this.state.data && this.state.data.length > 0 && this.state.data.map((item, index) => (
                <Grid item xs = {12} key = {index}>
                  <IssuesItem title = {item.title} 
                              issueNo = {item.number}
                              createdAt = {item.created_at}
                              userName = {item.user.login}
                              comments = {item.comments}
                              labels = {item.labels}/>
                </Grid>
              ))}
            </InfiniteScroll>
        </Grid>
      </Grid>
    );
  }
}

export default withWidth()(withStyles(style)(App));
