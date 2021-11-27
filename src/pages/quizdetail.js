import React, { Component } from 'react'
import axios from "axios";
import configData from './config.json'

export class Quizdetail extends Component {
  state = {
    batch: "",
    created_by: localStorage.getItem("userid"),
    data: [],
    student_response: [],
    nostudentdata: true,
    attendance: "/attendancedetail/" + localStorage.getItem('isbatch'),
    quiz: "/quizshow/" + localStorage.getItem('isbatch'),
    students: "/batchlist/" + localStorage.getItem('isbatch')
  };
  componentDidMount() {

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    };
    // Typical usage (don't forget to compare props):
    //console.log(this.props);
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
       // console.log(error);
      });

    const url2 = `${configData.SERVER_URL}quiz-detail/` + localStorage.getItem('quizid');
    axios
      .get(url2, { headers })
      .then((result) => {
        //console.log(result.data);
        this.setState({ student_response: result.data });
        //console.log(this.state.student_response["student1@gmail.com"].is_correct)
        this.setState({ nostudentdata: false });

      })
      .catch((error) => {
        //console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div>

          <a type="button" href={this.state.quiz}><button style={{ marginRight: '4px', color: 'white', backgroundColor: "green" }} className="btn btn-outline-success ">Quizes</button></a>
          <a type="button" href={this.state.attendance}><button style={{ marginRight: '4px' }} className="btn btn-outline-success ">Attendance</button></a>
          <a type="button" href={this.state.students}><button style={{ marginRight: '4px' }} className="btn btn-outline-success ">Students</button> </a>
        </div>
        <br></br>
        <div className="container"></div>
        <div className="container">


          <div>{this.state.data.map((val) => {
            if(val.id==localStorage.getItem('quizid'))
            return (
              
              <div className=" container quizlistcardly">
               
                <h4>Question: {val.question}</h4>
                <h4>
                  <ul>
                    <li>Option a:- {val.option_a}</li>
                    <li>Option b:- {val.option_b}</li>
                    <li>Option c:- {val.option_c}</li>
                    <li>Option d:- {val.option_d}</li>
                  </ul>
                </h4>
                <h4>Correct Answer: {val.answer}</h4>

              </div>

            );
          })}
          </div>

          {this.state.nodata ? <div>No student took the quiz</div> : <div>
            {Object.keys(this.state.student_response).map((val, i, arr) => {
              var ans = "Wrong";
              var classs = " fas fa-times";
              var color="red"
              if (this.state.student_response[val].is_correct) {
                ans = "Right";
                classs = " fas fa-check"
                color="green"
              }
              else if (this.state.student_response[val].is_correct == null) ans = "Not Answered"
              return (

                <div className=" container attendancecardly">
                  <h3>{val}: {ans} <i className={classs} style={{fontSize:"40px", color:color}} ></i></h3>

                </div>
              );

            })}
          </div>
          }

        </div>
      </div>
    )
  }
}

export default Quizdetail
