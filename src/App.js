import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Index from "./pages/index";
import "./App.css";

import Register from "./pages/register";
import NotFound from "./pages/notfound";

import Home from "./pages/home";
import Start from "./pages/start";
import Join from "./pages/join";
import Batch from "./pages/batchList";
import AllBatches from './pages/allBatches';
import AttendanceDetail  from './pages/attendanceDetail';
import Quizshow from './pages/quizshow';
import Allthings from './pages/allthings';
import Quizdetail from './pages/quizdetail';
import Navbar from './pages/navbar';
import TeacherHome from './pages/teacherhome';
import  SideNav  from "./pages/sidenav";
class App extends Component {
    
    render() {
        return (
            <div className="App">
                <Router forceRefresh={true}>
                <Navbar ></Navbar>
                    <Switch>
                        <Route exact path="/" component={Start}/>
                        
                        <Route exact path='/login' component={Login} />
                        <Route path="/join/:id" component={Join}/>
                        <Route path="/batch" component={AllBatches}/>
                        <Route path="/batchlist/:id" component={Batch}/>
                        <Route exact path="/home" component={Home}></Route>
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/index' component={Index}/>
                        <Route path='/register' component={Register} />
                        <Route path="/attendancedetail/:id" component={AttendanceDetail} />
                        <Route path="/quizshow/:id" component={Quizshow} />
                        <Route path="/allthings" component={Allthings}/>
                        <Route path="/quizdetail/:quizid" component={Quizdetail} />
                        <Route path="/teacherhome" component={TeacherHome} />
                        <Route path="/sidenav" component={SideNav} />
                        <Route path='*' component={NotFound} />
                        
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
