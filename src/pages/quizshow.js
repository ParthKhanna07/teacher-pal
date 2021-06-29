import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import  SideNav  from "./sidenav";
export class Quizshow extends Component {
  state = {
    batch: "",
    created_by: localStorage.getItem("userid"),
    data: [],
  };
  // handleBatchChange = (event) => {
  //   this.setState({ batch: event.target.value });
  // };
  

  quizdetailhandler=(e,id)=>{
    
    const url="/quizdetail/"+id;
    this.props.history.push(url);
  } 
  componentDidMount() {
    
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    };
    // Typical usage (don't forget to compare props):
    console.log(this.props);
    const url =
      "http://localhost:8000/api/quiz?created_by=" + this.state.created_by+"&batch="+localStorage.getItem('isbatch');
    console.log(url);

    axios
      .get(url, { headers })
      .then((result) => {
        console.log(result.data);
        this.setState({ data: result.data });
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // handleGet = (event) => {
  //   event.preventDefault();
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: `JWT ${localStorage.getItem("token")}`,
  //   };
  //   // Typical usage (don't forget to compare props):
  //   console.log(this.props);
  //   const url =
  //     "http://localhost:8000/api/quiz?created_by=" + this.state.created_by+"&batch="+localStorage.getItem('isbatch');
  //   console.log(url);

  //   axios
  //     .get(url, { headers })
  //     .then((result) => {
  //       console.log(result.data);
  //       this.setState({ data: result.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  render() {
    //console.log(this.props);
    return (
      <div>
        <SideNav></SideNav>
        <div className="container">
        
          {/* <div className="card card-login mx-auto mt-5">
            <div className="card-header">Enter Batch</div>
            <div className="card-body">
              <form onSubmit={this.handleGet}>
                <div className="form-group">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="batch"
                      className="form-control"
                      placeholder="Batch ID"
                      name="batch"
                      onChange={this.handleBatchChange}
                      required
                    />
                    <label htmlFor="batch">Batch ID</label>
                  </div>
                </div>
                
                
              </form>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                onClick={this.handleGet}
              >
                Show Quizes
                
              </button>
              
            </div>
           
          </div> */}
          {this.state.data.length==0?<div><h2>No Quizes were taken in this batch</h2></div>:
          <div>{this.state.data.map((val) => {
                  return (
                    
                    <button onClick={(e) => this.quizdetailhandler(e,val.id)}>
                      <div className=" container quizcardly">
                      <h3>Quiz: {val.id}</h3>
                      <h3>Held At : {moment(val.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")} </h3>
                      {/* <h3>Duration: {val.duration}</h3>
                      <h3>Question:{val.question}</h3>
                      <h3>Answer: {val.answer}</h3> */}
                    </div>
                    </button>
                  );
                })}
                </div>
                }
        </div>
      </div>
    );
  }
}

export default Quizshow;
