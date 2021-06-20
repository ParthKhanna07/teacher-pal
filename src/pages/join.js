import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
export class join extends Component {
  state ={
    redirect:false
  }
  componentDidMount() {
    const batch = this.props.match.params.id;
    const student = localStorage.getItem("userid");
    const batchid=parseInt(batch);
    if(localStorage.getItem('userid')==null){
      console.log("login first");
      this.setState({ redirect: true});
    }
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`
    };
    // Typical usage (don't forget to compare props):
    
    const url="http://localhost:8000/api/batch-students/"+batchid;
    console.log(url);
    let bodyFormData = new FormData();
    
    bodyFormData.set("batch", batchid);
    bodyFormData.set("student", student);
    axios
      .post(url, bodyFormData,{ headers})
      .then((result) => {
        console.log(result.data);
        
      })
      .catch((error) => {
        console.log(error);
        
      });
    
  }
  renderRedirect = () => {
    if(this.state.redirect)
      return <Redirect to="/" />;
  };
  render() {
    //console.log(this.props);
    
    return (
      <div>
        <div>
        <h1>Hello {this.props.match.params.id}</h1>
          </div>
      
      {this.renderRedirect()}
      </div>
    );
  }
}

export default join;
