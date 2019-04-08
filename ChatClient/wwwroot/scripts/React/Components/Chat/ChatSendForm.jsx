import React, { Component } from "react";

export default class ChatSendForm extends Component {
  state = { newMessage: "" };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      newMessage: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.newMessage !== "") {
      this.props.chatConnection.invoke("sendmessage", this.state.newMessage).catch(err => console.error(err.toString()));
    }

    this.setState({
      newMessage: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" onChange={this.handleChange} value={this.state.newMessage} placeholder="Say something..." />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>
              Submit!
            </button>
          </div>
        </div>
      </form>
    );
  }
}
