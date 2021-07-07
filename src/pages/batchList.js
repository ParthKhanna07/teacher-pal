import React, { Component } from "react";
import axios from "axios";

export class Batch extends Component {
  state = {
    data: [],
    attendance:"/attendancedetail/"+localStorage.getItem('isbatch'),
            quiz:"/quizshow/"+localStorage.getItem('isbatch'),
            students:"/batchlist/"+localStorage.getItem('isbatch'),
            copySuccess: ''
            
  }

  copyToClipboard = (e) => {
    var textField = document.createElement('textarea')
    textField.innerText = 'http://localhost:3000/join/'+this.props.match.params.id
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    this.setState({copySuccess:'Copied!'})
  };
  componentDidMount() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`
    };
    // Typical usage (don't forget to compare props):
    const batch = this.props.match.params.id;
    const student = localStorage.getItem("userid");
    const batchid = parseInt(batch);

    const url = "http://localhost:8000/api/batch-students/" + batchid;
    console.log(url);
    let bodyFormData = new FormData();

    bodyFormData.set("batch", batchid);
    bodyFormData.set("student", student);
    axios
      .get(url, { headers })
      .then((result) => {
        console.log(result.data);
        this.setState({ data: result.data })
        console.log(this.state.data[0].student.full_name)

      })
      .catch((error) => {
        console.log(error);

      });

  }

  
  render() {
    //console.log(this.props);
    return (
      <div>
<div>
                   
                   <a type="button" href={this.state.quiz}><button style={{marginRight:'4px'}}  className="btn btn-outline-success ">Quizes</button></a>
                   <a  type="button" href={this.state.attendance}><button style={{marginRight:'4px'}} className="btn btn-outline-success ">Attendance</button></a> 
                   <a  type="button" href={this.state.students}><button style={{marginRight:'4px' , color:'white', backgroundColor:"green"}}  className="btn btn-outline-success ">Students</button> </a>
               </div>
               <br></br>
  
      <div className="container">
        <br></br>
        <h1>Batch {this.props.match.params.id}</h1>
        <br></br>
        
        <h3>Invite Students to the batch </h3>
        <button style={{width:'60%'}} className="btn btn-outline-success" onClick={this.copyToClipboard}><h5>http://localhost:3000/join/{this.props.match.params.id}</h5></button> {this.state.copySuccess}
        {this.state.data.map((val) => {
          return (
            <div >

              <br></br>

              <div className="batch-cardly batches" >

                <h3>Student Name:{val.student.full_name}</h3>
                <h3>Student Email: {val.student.email}</h3>

              </div>
            </div>
          );
        })}

      </div>
      </div>

    );
  }
}

export default Batch;
