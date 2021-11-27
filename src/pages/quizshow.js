import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import configData from './config.json'

export class Quizshow extends Component {
  state = {
    batch: "",
    created_by: localStorage.getItem("userid"),
    data: [],
    attendance: "/attendancedetail/" + localStorage.getItem('isbatch'),
    quiz: "/quizshow/" + localStorage.getItem('isbatch'),
    students: "/batchlist/" + localStorage.getItem('isbatch')
  };
  // handleBatchChange = (event) => {
  //   this.setState({ batch: event.target.value });
  // };


  quizdetailhandler = (e, id) => {
    localStorage.setItem('quizid', id);
    const url = "/quizdetail/" + id;
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
    `${configData.SERVER_URL}quiz?created_by=` + this.state.created_by + "&batch=" + localStorage.getItem('isbatch');
   // console.log(url);

    axios
      .get(url, { headers })
      .then((result) => {
        //console.log(result.data);
        this.setState({ data: result.data });

      })
      .catch((error) => {
        //console.log(error);
      });
  }
  

  render() {
    //console.log(this.props);
    return (
      <div>
        <div>

          <a type="button" href={this.state.quiz}><button style={{ marginRight: '4px', color: 'white', backgroundColor: "green" }} className="btn btn-outline-success ">Quizes</button></a>
          <a type="button" href={this.state.attendance}><button style={{ marginRight: '4px' }} className="btn btn-outline-success ">Attendance</button></a>
          <a type="button" href={this.state.students}><button style={{ marginRight: '4px' }} className="btn btn-outline-success ">Students</button> </a>
        </div>
        <br></br>
        <div className="container">

          {this.state.data.length == 0 ? <div><h2>No Quizes were taken in this batch</h2></div> :
            <div>{this.state.data.map((val) => {
              return (

                <button className="btn btn-outline-success btn-block batches" onClick={(e) => this.quizdetailhandler(e, val.id)}>
                  <div className=" container ">
                    <h3>Quiz: {val.id}</h3>
                    <h3>Held At : {moment(val.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")} </h3>
                  
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
