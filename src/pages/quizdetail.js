import React, { Component } from 'react'
import axios from "axios";
import  SideNav  from "./sidenav";
export class Quizdetail extends Component {
    state = {
        batch: "",
        created_by: localStorage.getItem("userid"),
        data: [],
        student_response:[],
        nostudentdata:true
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
          "http://localhost:8000/api/quiz?created_by=" + this.state.created_by+"&batch="+localStorage.getItem('isbatch');
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
         
          const url2="http://localhost:8000/api/quiz-detail/"+localStorage.getItem('quizid');
          axios
          .get(url2, { headers })
          .then((result) => {
            console.log(result.data);
            this.setState({ student_response: result.data });
            console.log(this.state.student_response["student1@gmail.com"].is_correct)
            this.setState({nostudentdata:false});
            
          })
          .catch((error) => {
            console.log(error);
          });
      }
    render() {
        return (
            <div>
                <SideNav></SideNav>
        <div className="container">
          
          
          <div>{this.state.data.map((val) => {
                  return (
                      <div className=" container quizlistcardly">
                      <h3>Question: {val.question}</h3>
                      <h3>Options: 
                          <ul>
                              <li>Option a:- {val.option_a}</li>
                              <li>Option b:- {val.option_b}</li>
                              <li>Option c:- {val.option_c}</li>
                              <li>Option d:- {val.option_d}</li>
                          </ul>
                      </h3>
                      <h3>Correct Answer: {val.answer}</h3>
                      
                    </div>
                    
                  );
                })}
                </div>

                {this.state.nodata?<div>No student took the quiz</div>:<div>
                    {Object.keys(this.state.student_response).map((val,i,arr) => {
                      var ans="Wrong";
                        if(this.state.student_response[val].is_correct){
                          ans="Right";
                        }
                        else if(this.state.student_response[val].is_correct==null) ans="Not Answered"
                            return (
                            
                            <div className=" container attendancecardly">
                                <h3>{val}: {ans} </h3>

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
