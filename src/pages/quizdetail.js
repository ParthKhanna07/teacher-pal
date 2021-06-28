import React, { Component } from 'react'
import axios from "axios";
export class Quizdetail extends Component {
    state = {
        batch: "",
        created_by: localStorage.getItem("userid"),
        data: [],
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
      }
    render() {
        return (
            <div>
                
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
                
        </div>
            </div>
        )
    }
}

export default Quizdetail
