import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
export class start extends Component {
  state = {
    user: "",
  };

  componentDidMount(){
    if(localStorage.getItem("isLoggedIn")){
      if(localStorage.getItem("role")=="is_student"){
        
        this.props.history.push("/studenthome");
      }
      else this.props.history.push("/teacherhome");
    }
  }
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
    if (this.state.user == "is_student" || this.state.user == "is_teacher")
      return <Redirect to='/register' />

  };
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <div><h2>Register as </h2></div>
          <br></br>
          <br></br>
          <div className="row">

            <div className='col-lg-6 col-md-12 col-sm-12 margin ' >
              <button onClick={this.handleSubmitStudent} className=" radius  btn-outline-primary ">
                <div className='register-card text-center btn-colour' >
                  <h2>Student</h2>
                </div>
              </button>
            </div>

            <div className='col-lg-6 col-md-12 col-sm-12 margin'>
              <button onClick={this.handleSubmitTeacher} className=' radius btn-outline-success' >
                <div className='register-card register-card text-center btn-colour-2'>
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
