import React, { Component } from "react";
const axios = require("axios");
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let user = {
      user: { username: this.state.username, password: this.state.password }
    };
    let response = await axios.post(
      "http://localhost:3001/api/user/login",
      user
    );
    if (response.status === 202){
      alert("Successfully logged in!")
      this.props.handleClose()
      this.setState({username: "", password: ""})
    }
  }
  render() {
    const toggleModal = this.props.show
      ? "modal-custom display-block"
      : "modal-custom display-none";
    return (
      <div className={toggleModal}>
        <div
          className="modal-main"
          style={{ marginTop: "50px", width: "700px" }}
        >
          <h2 style={{ marginBottom: "40px" }}>Registration</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                name="username"
                onChange={this.handleInput}
                value={this.state.username}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                name="password"
                onChange={this.handleInput}
                value={this.state.password}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
              Login
              </button>
              <button
                className="btn btn-danger"
                onClick={this.props.handleClose}
              >
              Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
