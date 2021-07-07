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
    refreshPage() {
        window.location.reload();
    }

    logout = () => {
        const options = {
            headers: {
                'Content-Type': 'application/json',

            }
        };
        localStorage.removeItem('token');


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
        } else if (localStorage.getItem('role') == "is_teacher") {
            this.menu = (
                <div class="container">
                    <a class="navbar-brand " href="/teacherhome">
                        <h2>Home</h2>
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"

                    >
                        <span class="navbar-toggler-icon"></span>

                    </button>
                    <div class="collapse navbar-collapse " id="navbarCollapse">

                        <ul class="navbar-nav mr-auto mb-2 mb-md-0">
                            <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    aria-current="page"
                                    href="/batch"

                                >
                                    Add Batch
                                </a>
                            </li>
                        </ul>

                        <ul class="navbar-nav  mb-2 mb-md-0 ">
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


                    </div>
                </div>
            );

        } else {
            this.menu = (
                <div class="container">
                    <a class="navbar-brand" href="/studenthome">
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
                                        href="/studentattendance"

                                    >
                                        Attendance
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