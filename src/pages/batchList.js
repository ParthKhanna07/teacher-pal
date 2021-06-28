import React, { Component } from "react";
import axios from "axios";

export class Batch extends Component {
  state ={
    data:[]
  }
  componentDidMount() {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`
    };
    // Typical usage (don't forget to compare props):
    const batch = this.props.match.params.id;
    const student = localStorage.getItem("userid");
    const batchid=parseInt(batch);
  
    const url="http://localhost:8000/api/batch-students/"+batchid;
    console.log(url);
    let bodyFormData = new FormData();
    
    bodyFormData.set("batch", batchid);
    bodyFormData.set("student", student);
    axios
      .get(url,{ headers})
      .then((result) => {
        console.log(result.data);
        this.setState({data:result.data})
        console.log(this.state.data[0].student.full_name)
        
      })
      .catch((error) => {
        console.log(error);
        
      });
    
  }
  
  render() {
    //console.log(this.props);
    return (
      <div className="container">
        <br></br>
        <h1>Batch {this.props.match.params.id}</h1>
        <br></br>
        <h3>Invite Students to the batch "http://localhost:3000/join/{this.props.match.params.id}"</h3>
        {this.state.data.map((val) => {
          return (
            <div>
              
              <br></br>

            <div className="batch-cardly" >
              
              <h3>Student Name:{val.student.full_name}</h3>
              <h3>Student Email: {val.student.email}</h3>
              
            </div>
            </div>
          );
        })}
        
      </div>
      
    );
  }
}

export default Batch;
