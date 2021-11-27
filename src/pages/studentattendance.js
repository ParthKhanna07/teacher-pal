import React, { Component } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import configData from './config.json'

export class StudentAttendance extends Component {
    state = {

        data: [],
        nodata: false,
        attendance: "/studentattendance/" + localStorage.getItem('isbatch'),
        quiz: "/studentquiz/" + localStorage.getItem('isbatch'),

    }


    componentDidMount() {
        // console.log(localStorage.getItem("role"));
        // console.log(localStorage.getItem("userid"));

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `JWT ${localStorage.getItem("token")}`,
        };
       
        //console.log(this.props);
        //console.log(localStorage.getItem("token"));
        const url = `${configData.SERVER_URL}student-attendance-list/` + this.props.match.params.id;
  //console.log(url);

        //console.log(typeof(date));



        //console.log(localDateString);


        axios
            .get(url, { headers })
            .then((result) => {
                //console.log(result);
                this.setState({ nodata: false });
                //console.log(result.data);
                this.setState({ data: result.data });
                // console.log(this.state.data)
                // console.log(result.data["total_attendance_requests"]);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //console.log(error.response.data);
                    this.setState({ nodata: true });
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    //console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                   // console.log('Error', error.message);
                }
                //console.log(error.config);
            });
        //window.location.reload();
    };

    render() {
        //console.log(this.props);
        return (
            <div >

                <div>

                    <a type="button" href={this.state.quiz}><button style={{ marginRight: '4px' }} className="btn btn-outline-success ">Quizes</button></a>
                    <a type="button" href={this.state.attendance}><button style={{ marginRight: '4px', color: 'white', backgroundColor: "green" }} className="btn btn-outline-success ">Attendance</button></a>

                </div>


                <div className="container">

                    <div>
                        {this.state.nodata ? <div><h2>Total Attendence : 0</h2><br></br><h2>No attendence was responded</h2></div> : <div>
                            {Object.keys(this.state.data).length==0 ? <div><br></br><h1>No attendance taken</h1></div> : <div>
                                {Object.keys(this.state.data).map((val, i, arr) => {

                                    return (

                                        <div className=" container attendancecardly">
                                            <h3>Date:- {moment(val).format("dddd, MMMM Do YYYY")} </h3>
                                            <h4>Total Attendence Count :{this.state.data[val].total_attendance_count}</h4>
                                            <h4>My Attendence Count: {this.state.data[val].my_attendance_count}</h4>
                                            <h4>My Attentivity: {this.state.data[val].attentivity} %</h4>
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
        );
    }
}

export default StudentAttendance;
