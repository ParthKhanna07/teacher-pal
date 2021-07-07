import React, { Component } from 'react'
import axios from "axios";
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';
export class StudentQuiz extends Component {
  state = {
    batch: "",
    created_by: localStorage.getItem("userid"),
    data: [],
    attempted_quizzes: 0,
    missed_quizzes: 0,
    attendance: "/studentattendance/" + localStorage.getItem('isbatch'),
    quiz: "/studentquiz/" + localStorage.getItem('isbatch'),
    missed_click: false,
    attempt_click: true,
    is_missed_active: false,
    is_attempted_active: true
  };
  componentDidMount() {

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    };
    // Typical usage (don't forget to compare props):
    console.log(this.props);
    const url =
      "http://localhost:8000/api/student-quiz-list/" + this.props.match.params.id;
    console.log(url);


    axios
      .get(url, { headers })
      .then((result) => {
        console.log(result.data);
        this.setState({ data: result.data });
        console.log(this.state.data.attempted_quizzes.length)
        this.setState({ attempted_quizzes: this.state.data.attempted_quizzes.length });
        this.setState({ missed_quizzes: this.state.data.missed_quizzes.length });

      })
      .catch((error) => {
        console.log(error);
      });


  }
  render() {
    return (
      <div>
        <div>
          <div>

            <a type="button" href={this.state.quiz}><button style={{ marginRight: '4px', color: 'white', backgroundColor: "green" }} className="btn btn-outline-success ">Quizes</button></a>
            <a type="button" href={this.state.attendance}><button style={{ marginRight: '4px' }} className="btn btn-outline-success ">Attendance</button></a>

          </div>
          <br></br>
          <button style={{ marginRight: '4px' }} className={this.state.is_attempted_active ? "activeness btn  " : "btn butt-hover "} onClick={() => this.setState({ missed_click: false, attempt_click: true, is_attempted_active: true, is_missed_active: false })}>Attempted Quizes</button>
          <span>  |  </span>
          <button style={{ marginRight: '4px' }} className={this.state.is_missed_active ? "activeness btn  " : "btn butt-hover"} onClick={() => this.setState({ attempt_click: false, missed_click: true, is_attempted_active: false, is_missed_active: true })}>Missed Quizzes</button>
          <div>
            <br></br>
            {this.state.attempt_click == true ? <div>

              <div className=" container attempt-cardly"><h3>Attempted Quizes</h3></div>
              {this.state.attempted_quizzes === 0 ? <div><br></br><h2>No Quiz was Attempted</h2></div> :
                <div>

                  {Object.keys(this.state.data.attempted_quizzes).map((val, i, arr) => {


                    var ans = "No";
                    if (this.state.data.attempted_quizzes[val].is_correct) {
                      ans = "Yes";
                    }

                    return (
                      <div>

                        <div className=" container attendancecardly">
                          <h3>Held At: {moment(this.state.data.attempted_quizzes[val].quiz.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")} </h3>
                          <h3>Question: {this.state.data.attempted_quizzes[val].quiz.question} </h3>
                          <h4>Options
                            <ul>
                              <li>Option a:- {this.state.data.attempted_quizzes[val].quiz.option_a}</li>
                              <li>Option b:- {this.state.data.attempted_quizzes[val].quiz.option_b}</li>
                              <li>Option c:- {this.state.data.attempted_quizzes[val].quiz.option_c}</li>
                              <li>Option d:- {this.state.data.attempted_quizzes[val].quiz.option_d}</li>
                            </ul>
                          </h4>
                          <h3>Correct Answer: {this.state.data.attempted_quizzes[val].quiz.answer} </h3>
                          <h3>My Answer: {this.state.data.attempted_quizzes[val].answer}</h3>
                          <h3>Am I correct? {ans}</h3>
                        </div>
                      </div>
                    );

                  })}
                </div>
              };
            </div>
              :
              <div>

                <div className=" container attempt-cardly"><h3>Missed Quizes</h3></div>
                {this.state.missed_quizzes === 0 ? <div><br></br><h2>No Quiz was Missed</h2></div> :
                  <div>

                    {Object.keys(this.state.data.missed_quizzes).map((val, i, arr) => {




                      return (
                        <div>

                          <div className=" container attendancecardly">
                            <h3>Held At: {moment(this.state.data.missed_quizzes[val].created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")} </h3>
                            <h3>Question: {this.state.data.missed_quizzes[val].question} </h3>
                            <h4>Options
                              <ul>
                                <li>Option a:- {this.state.data.missed_quizzes[val].option_a}</li>
                                <li>Option b:- {this.state.data.missed_quizzes[val].option_b}</li>
                                <li>Option c:- {this.state.data.missed_quizzes[val].option_c}</li>
                                <li>Option d:- {this.state.data.missed_quizzes[val].option_d}</li>
                              </ul>
                            </h4>
                            <h3>Correct Answer: {this.state.data.missed_quizzes[val].answer} </h3>

                          </div>
                        </div>
                      );

                    })}
                  </div>
                }
              </div>
            }
          </div>


        </div>
      </div>
    )
  }
}

export default StudentQuiz
