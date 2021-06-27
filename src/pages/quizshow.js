import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export class Quizshow extends Component {
  state = {
    batch: "",
    created_by: localStorage.getItem("userid"),
    data: [],
  };
  handleBatchChange = (event) => {
    this.setState({ batch: event.target.value });
  };
  

  handleGet = (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    };
    // Typical usage (don't forget to compare props):
    console.log(this.props);
    const url =
      "http://localhost:8000/api/quiz?created_by=" + this.state.created_by+"&batch="+this.state.batch;
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
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        
        <div className="container">
          <div className="card card-login mx-auto mt-5">
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
           
          </div>
          {this.state.data.length==0?<div><h2>No Quizes were taken in this batch</h2></div>:
          <div>{this.state.data.map((val) => {
                  return (
                    <div className=" container cardly">
                      <h3>Created At:{val.created_at}</h3>
                      <h3>Duration: {val.duration}</h3>
                      <h3>Question:{val.question}</h3>
                      <h3>Answer: {val.answer}</h3>
                    </div>
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
