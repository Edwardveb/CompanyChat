import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { alertActions } from "../_actions/alert.actions.jsx";

export default class ChatBox extends Component {
  _isMounted = false;
  state = { chat: [], isDisconnected: false };

  componentDidMount() {
    const { chatConnection, dispatch } = this.props;
    this._isMounted = true;

    chatConnection.on("BroadChatMessage", message => {
      if (this._isMounted) {
        this.setState(state => {
          message.id = Math.random();
          return {
            chat: state.chat.concat(message)
          };
        });
      }
    });

    chatConnection.on("UserTimeout", message => {
      this.handleChatConnectionMessages(message);
    });

    chatConnection.on("UserConnected", message => {
      this.handleChatConnectionMessages(message);
    });

    chatConnection.on("UserDisconnected", message => {
      this.handleChatConnectionMessages(message);
    });

    chatConnection.on("UserKill", message => {
      this.handleChatConnectionMessages(message);
      chatConnection.stop().catch(err => console.error(err.toString()));
      dispatch(alertActions.timeout(message.message));
      this.setState({
        isDisconnected: true
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChatConnectionMessages = message => {
    if (this._isMounted) {
      this.setState(state => {
        message.id = Math.random();
        return {
          chat: state.chat.concat(message)
        };
      });
    }
  };

  render() {
    const { isDisconnected } = this.state;
    if (isDisconnected) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { timeout: true }
          }}
        />
      );
    }
    return (
      <div className="row height-50">
        <div className="col-12">
          <div className="row">
            {this.state.chat.map(z => {
              return (
                <React.Fragment key={z.id}>
                  <div className={`col-lg-2 ${z.username === "Admin" ? "text-danger" : ""}`}>
                    <strong>{z.username}:</strong>
                  </div>
                  <div className={`col-lg-10 ${z.username === "Admin" ? "text-danger" : ""}`}>{z.message}</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
