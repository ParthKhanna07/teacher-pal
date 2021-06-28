import React, { Component } from 'react'

import { Link, Redirect } from "react-router-dom";
export default class Home extends Component {

  

   
    
  
    render() {
        
        return (
            <div>
                <div>
                <h1>Hello {localStorage.getItem('role')}</h1>
                </div>
                
            </div>
        )
    }
}


