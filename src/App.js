import "./styles.css";
import { getGithubIssues } from "./ServiceClass.js";
import React from "react";

import { withStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import InfiniteScroll from "react-infinite-scroll-component";

const style = theme => ({
  div : {
    height : "100px"
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
      <div>
        <h1>Basic</h1>
        <Grid container ref={this.myRef}>
          <InfiniteScroll
            dataLength={this.state.data.length}
            next={this.fetch}
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}>
              {this.state.data && this.state.data.length > 0 && this.state.data.map((item, index) => (
                <Grid item xs = {12} key = {index}>
                  <div className = {classes.div}>
                    {index} {item.title}
                  </div>
                </Grid>
              ))}
            </InfiniteScroll>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(App);
