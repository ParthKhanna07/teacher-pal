import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export class AllBatches extends Component {
  state = {
    name: "",
    meet: "",
    created_by: localStorage.getItem("userid"),
    role: localStorage.getItem("role"),
    data: [],
  };
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleMeetChange = (event) => {
    this.setState({ meet: event.target.value });
  };

  batchhandler=(e,id)=>{
    const site="/allthings"
    console.log(site);
    localStorage.setItem("isbatch",id);
    this.props.history.push(site);

  }
  handleGet = (event) => {
    event.preventDefault();
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

  handlePost = (event) => {
    console.log(localStorage.getItem("role"));
    console.log(localStorage.getItem("userid"));
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    };
    // Typical usage (don't forget to compare props):
    //console.log(this.props);

    const url = "http://localhost:8000/api/batch" + this.props.location.search;
    //console.log(url);
    const name = this.state.name;
    const meet = this.state.meet;
    console.log(name, meet);
    //const created_by = this.state.created_by;
    let bodyFormData = new FormData();

    bodyFormData.set("name", name);
    bodyFormData.set("meet_link", meet);
    // const body=JSON.stringify({
    //   name:this.state.name,
    //   meet_link:this.state.meet,
    // })
    //console.log(body);
    //bodyFormData.set("created_by", created_by);
    //console.log("cretaed", created_by);
    //console.log(typeof meet);
    axios
      .post(url, bodyFormData, { headers })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
      window.location.reload();
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        
        <div className="container">
          <div className="card card-login mx-auto mt-5">
            <div className="card-header">Create Batch</div>
            <div className="card-body">
              <form onSubmit={this.handlePost}>
                <div className="form-group">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      onChange={this.handleNameChange}
                      required
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label-group">
                    <input
                      type="url"
                      id="meet"
                      className="form-control"
                      placeholder="Meet Link"
                      name="meet"
                      onChange={this.handleMeetChange}
                      required
                    />
                    <label htmlFor="meet">Meet Link</label>
                  </div>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block" type="submit">
                    Add batch
                  </button>
                </div>
              </form>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                onClick={this.handleGet}
              >
                Show Batches
                
              </button>
              
            </div>
           
          </div>
          {this.state.data.map((val) => {
                  return (
                    <div className=" container cardly">
                       <button onClick={(e) => this.batchhandler(e,val.id)}>Batch Name:{val.name}</button>
                      <h3>Created At: {val.created_at}</h3>
                      <h3>Modified At:{val.modified_at}</h3>
                      <h3>Meet Link: {val.meet_link}</h3>
                    </div>
                  );
                })}
        </div>
      </div>
    );
  }
}

export default AllBatches;
