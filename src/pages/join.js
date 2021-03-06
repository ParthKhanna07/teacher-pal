import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import configData from './config.json'

export class join extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    if (localStorage.getItem('userid') == null) {
      //console.log("login first");
      this.setState({ redirect: true });
    }
    const batch = this.props.match.params.id;
    const student = localStorage.getItem("userid");
    const batchid = parseInt(batch);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`
    };
    // Typical usage (don't forget to compare props):

    const url = `${configData.SERVER_URL}batch-students/` + batchid;
    //console.log(url);
    let bodyFormData = new FormData();

    bodyFormData.set("batch", batchid);
    bodyFormData.set("student", student);
    axios
      .post(url, bodyFormData, { headers })
      .then((result) => {
       // console.log(result.data);
        

      })
      .catch((error) => {
        // console.log(error);
        // console.log("login first");
        this.setState({ redirect: true });
       

      });

  }

  render() {
    //console.log(this.props);
    if(this.state.redirect){
      this.setState({ redirect:false});
      return (
        <div>
          <h1>Please Login/Register first</h1>
        </div>
      );
    }
    else {

    return (
      <div>
        <div>
          <h1>You are added to batch:- {this.props.match.params.id}</h1>
        </div>

        
      </div>
    );
    }
  }
}

export default join;
