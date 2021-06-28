import React, { Component } from "react";
import axios from "axios";
export class Navbar extends Component {
    constructor(props) {
        super(props);

        let menu;
        this.state = {
        };
    }
    
    componentDidMount() {
        //window.location.reload();
        window.scrollTo(0, 0);
    }
    refreshPage(){ 
        window.location.reload(); 
    }

    logout = () => {
        const options = {
            headers: {
                'Content-Type': 'application/json',

            }
        };
        localStorage.removeItem('token');
        axios.post("http://localhost:8000/api/users/logout", this.state)
            .then((res) => {
                //localStorage.setItem('token', res.data.token);


                //console.log(localStorage.getItem('token'))
            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })


    }

    render() {
        if (!localStorage.getItem('token')) {
            this.menu = (
                <div class="container">
                    

                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={ this.refreshPage }
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav me-auto mb-2 mb-md-0"></ul>
                        <form class="d-flex">

                            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/login">
                                        Login
                                    </a>
                                </li>

                                <li class="nav-item">
                                    <a
                                        class="nav-link active"
                                        aria-current="page"
                                        href="/"
                                    >
                                        Register
                                    </a>
                                </li>
                            </ul>
                            
                        </form>
                    </div>
                </div>
            );
        } else {
            this.menu = (
                <div class="container">
                    <a class="navbar-brand" href="/home">
                        Home
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={ this.refreshPage }
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarCollapse">

                        <ul class="navbar-nav me-auto mb-2 mb-md-0">
                            <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    aria-current="page"
                                    href="/login"
                                    onClick={this.logout}
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                                <li class="nav-item">
                                    <a
                                        class="nav-link active"
                                        aria-current="page"
                                        href="/Profile"

                                    >
                                        Profile
                                    </a>
                                </li>

                            </ul>
                            
                        </form>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                    {this.menu}
                </nav>
            </div>
        );
    }
}

export default Navbar;