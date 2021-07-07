import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';

export class TeacherHome extends Component {
  state = {
    
    created_by: localStorage.getItem("userid"),
    role: localStorage.getItem("role"),
    data: [],
  };
  
  batchhandler=(e,id,name)=>{
    
    localStorage.setItem("isbatch",id);
    localStorage.setItem("batchName",name);
    
    const url="/batchlist/"+localStorage.getItem('isbatch');
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
      "http://localhost:8000/api/batch?created_by=" + this.state.created_by;
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
          <div className="card card-login mx-auto mt-5" style={{width:'250px'}}>
            
           

                <a href="/batch">
                  <button  className="btn btn-primary btn-block " style={{height:'100%', width:'100%'}}   >
                    Create New Batch
                  </button>
                </a>
             
          
          </div>
          {this.state.data.map((val) => {
                  return (
                    
                    <div className=" container ">
                      <div className="batches">
                      <button className="btn btn-outline-success btn-block" onClick={(e) => this.batchhandler(e,val.id,val.name)}>
                       <h3>Batch Name:{val.name}</h3>
                      <h3>Created At: {moment(val.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h3>
                      <h3>Modified At:{moment(val.modified_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h3>
                      </button>
                      <a target="_blank" href={val.meet_link}><button className="btn btn-outline-primary btn-block"><h3>Meet Link: {val.meet_link}</h3></button></a>
                    </div>
                    <br></br>
                    </div>
                    
                  );
                })}
        </div>
      </div>
    );
  }
}

export default TeacherHome;
