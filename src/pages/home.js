import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Hello {localStorage.getItem('role')}</h1>
            </div>
        )
    }
}


