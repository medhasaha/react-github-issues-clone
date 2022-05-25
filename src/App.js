import "./styles.css";
import { getGithubIssues } from "./ServiceClass.js";
import React from "react";

import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography, Chip, Divider, Tabs, Tab} from '@material-ui/core'
import InfiniteScroll from "react-infinite-scroll-component";
import IssuesItem from "./IssuesItem";

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
  chip : {
    margin : "0px 0px 0px 10px"
  },
  chipDiv : {
    border : "1px rgba(0, 0, 0, 0.23) solid",
    borderRadius : "5px",
    display: "inline-block",
    padding : "5px",
    margin : "0px 10px",
    float : "right"
  },
  verticalDiv : {
    margin : "0px 10px"
  },
  tabItem : {
    fontWeight : 800
  },
  indicator: {
    backgroundColor: 'orange',
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
        hasMore : prevState.page === 5 ? false : true
      }))

    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container> 
        <Grid container className = {classes.header}>
          <Grid item xs = {6} >
            <Typography variant = "h6" style = {{display : "inline", color : "#0969da"}}>facebook</Typography>
            <Typography variant = "h6" style = {{display : "inline"}}> / </Typography>
            <Typography variant = "h6" style = {{display : "inline", color : "#0969da", fontWeight : 600}}>react</Typography>
            <Chip label="Public" variant="outlined" size = "small" className={classes.chip}/>
          </Grid>

          <Grid item xs = {6} >
            <div className={classes.chipDiv} style = {{display : "inline-flex"}}> 
              <Typography style = {{display : "flex"}}>Fork <Divider orientation="vertical" flexItem  className = {classes.verticalDiv}/> 35.3k</Typography>
            </div>
            <div className={classes.chipDiv} style = {{display : "inline-flex"}}> 
              <Typography style = {{display : "flex"}}>Star <Divider orientation="vertical" flexItem  className = {classes.verticalDiv}/> 175k</Typography>
            </div>
            <div className={classes.chipDiv}><Typography>Notifications</Typography></div>
          </Grid>

          <Tabs
          value={1}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          style = {{marginTop : "20px"}} classes={{
            indicator: classes.indicator
          }}>
            <Tab label="Code" className={classes.tabItem}/>
            <Tab label="Issues"  />
            <Tab label="Pull Requests"  />
            <Tab label="Actions" />
            <Tab label="Projects"  />
            <Tab label="Wiki"  />
            <Tab label="Security"  />
            <Tab label="Insights"  />
          </Tabs>
        </Grid>

        <Grid container ref={this.myRef}>
          <InfiniteScroll
            dataLength={this.state.data.length}
            next={this.fetch}
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}>
              {this.state.data && this.state.data.length > 0 && this.state.data.map((item, index) => (
                <Grid item xs = {12} key = {index}>
                  <IssuesItem title = {item.title} 
                              issueNo = {item.number}
                              createdAt = {item.created_at}
                              userName = {item.user.login}
                              labels = {item.labels}/>
                </Grid>
              ))}
            </InfiniteScroll>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(App);
