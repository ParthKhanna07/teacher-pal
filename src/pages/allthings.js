import React, { Component } from 'react'

export class Allthings extends Component {

    handleattendance = (event) => {
        const url = "/attendancedetail/" + localStorage.getItem('isbatch');
        this.props.history.push(url);
    }


    handlestudents = (event) => {
        const url = "/batchlist/" + localStorage.getItem('isbatch');
        this.props.history.push(url);
    }

    handlequizes = (event) => {
        const url = "/quizshow/" + localStorage.getItem('isbatch');
        this.props.history.push(url);
    }
    render() {
        return (
            <div>
                <button onClick={this.handleattendance}>Attendance</button>
                <button onClick={this.handlestudents}> Students List</button>
                <button onClick={this.handlequizes}>Quizes</button>

            </div>
        )
    }
}

export default Allthings
