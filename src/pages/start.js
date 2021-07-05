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
          <div><h2>Register as </h2></div>
          <br></br>
          <br></br>
          <div className="row">

          <div className='col-lg-6 col-md-12 col-sm-12'>
          <button onClick={this.handleSubmitStudent} className="btn-colour-2 btn btn-outline-success">
          <div className='register-card text-center' >
            <h2>Student</h2> 
          </div>
          </button>
          </div>
          
          <div className='col-lg-6 col-md-12 col-sm-12'>
          <button onClick={this.handleSubmitTeacher} className='btn-colour btn btn-outline-success' >
          <div className='register-card'>
          <h2>Teacher</h2>
          </div>
          </button>
          </div>
          </div>
          
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}

export default start;
