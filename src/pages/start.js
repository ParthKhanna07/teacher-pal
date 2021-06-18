import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
export class start extends Component {
  state = {
    user: "",
  };

  handleSubmitStudent = () => {
    localStorage.setItem("user", "is_student");
    this.setState({ user: "is_student" });
    const { user } = this.state;

  
  };
  handleSubmitTeacher = () => {
    localStorage.setItem("user", "is_teacher");
    this.setState({ user: "is_teacher" });
    const { user } = this.state;
    
   
  };
  renderRedirect = () => {
    if(this.state.user=="is_student" || this.state.user=="is_teacher") 
        return <Redirect to='/register'/>
    
    };
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <button onClick={this.handleSubmitStudent}>Student </button>
          <button onClick={this.handleSubmitTeacher}>Teacher</button>
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}

export default start;
