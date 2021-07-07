import React, { Component } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

export class AttendanceDetail extends Component {
    state = {
        date: new Date(),
        data: [],
        nodata: false,
        attendance: "/attendancedetail/" + localStorage.getItem('isbatch'),
        quiz: "/quizshow/" + localStorage.getItem('isbatch'),
        students: "/batchlist/" + localStorage.getItem('isbatch')
    }

    onChange = date => this.setState({ date })



    handlePost = (event) => {
        console.log(localStorage.getItem("role"));
        console.log(localStorage.getItem("userid"));
        event.preventDefault();
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `JWT ${localStorage.getItem("token")}`,
        };
        // Typical usage (don't forget to compare props):
        //console.log(this.props);
        //console.log(localStorage.getItem("token"));
        const url = "http://localhost:8000/api/attendance-detail/" + this.props.match.params.id;
        console.log(url);
        const date = this.state.date;
        //console.log(typeof(date));


        const localDateString = date.toLocaleDateString('En-en');
        //console.log(localDateString);
        var formatted = moment(date).format('YYYY-MM-DD');
        console.log(typeof (formatted))
        console.log(formatted);

        // const dt=new Date(formatted);
        // console.log(dt);
        // console.log(typeof(dt));


        //const created_by = this.state.created_by;
        let bodyFormData = new FormData();

        bodyFormData.set("date", formatted);

        const body = JSON.stringify({
            date: formatted
        })
        //console.log(body);
        //bodyFormData.set("created_by", created_by);
        //console.log("cretaed", created_by);
        //console.log(typeof meet);


        axios
            .post(url, bodyFormData, { headers })
            .then((result) => {
                console.log(result);
                this.setState({ nodata: false });
                this.setState({ data: result.data });
                console.log(this.state.data)
                console.log(result.data["total_attendance_requests"]);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    this.setState({ nodata: true });
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
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
                    <a type="button" href={this.state.students}><button style={{ marginRight: '4px' }} className="btn btn-outline-success ">Students</button> </a>
                </div>


                <div className="container">
                    <div className="card card-login mx-auto mt-5">
                        <Calendar
                            onChange={this.onChange}


                        />

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={this.handlePost}
                            >
                                Show Attendance

                            </button>

                        </div>


                    </div>
                    <div>
                        {this.state.nodata ? <div><h2>Total Attendence Request: 0</h2><br></br><h2>No attendence was taken on this date</h2></div> : <div><h2>Total Attendence Request: {this.state.data["total_attendance_requests"]}</h2></div>
                        }
                    </div>

                    {this.state.nodata ? <div></div> : <div>
                        {Object.keys(this.state.data).map((val, i, arr) => {
                            if (arr.length - 1 != i) {
                                return (
                                    <div>
                                        <div className=" container attendancecardly">
                                            <h3>{val}: {this.state.data[val]} %</h3>


                                        </div>

                                    </div>
                                );
                            }
                        })}
                    </div>
                    }


                </div>
            </div>
        );
    }
}

export default AttendanceDetail;
