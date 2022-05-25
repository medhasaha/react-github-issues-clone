import "./styles.css";
import { getGithubIssues } from "./ServiceClass.js";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.setState = {};
  }

  componentDidMount() {
    getGithubIssues().then((res) => {
      console.log(res); 
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Basic</h1>
      </div>
    );
  }
}
