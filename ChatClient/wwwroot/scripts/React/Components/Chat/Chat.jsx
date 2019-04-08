import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { HubConnectionBuilder } from "@aspnet/signalr";
import config from "config";

import ChatBox from "./ChatBox.jsx";
import ChatSendForm from "./ChatSendForm.jsx";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isConnected: false
    };

    this.chatConnection = new HubConnectionBuilder().withUrl(`${config.apiUrl}/companychathub`, { accessTokenFactory: () => this.props.user.token }).build();
    this.chatConnection
      .start({ withCredentials: false })
      .then(() => {
        this.setState({
          isLoading: false,
          isConnected: true
        });
      })
      .catch(err => {
        debugger;
        switch (err.statusCode) {
          case 401:
            this.setState({
              isLoading: false
            });
            break;
          default:
            console.error(err.toString());
            break;
        }
      });
  }

  componentWillUnmount() {
    this.chatConnection.stop().catch(err => console.error(err.toString()));
  }

  render() {
    const { user, dispatch } = this.props;
    const { isLoading, isConnected } = this.state;
    if (isLoading) {
      return <h1>Loading..</h1>;
    }

    if (!isConnected) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { expiredLogin: true }
          }}
        />
      );
    }

    return (
      <div className="row height-100">
        <div className="col-12 mt-5">
          <div className="row">
            <div className="col">
              <h1>Logged in as {user.username}!</h1>
            </div>
            <div className="col-2 text-right">
              <Link
                to={{
                  pathname: "/login",
                  state: { logout: true }
                }}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12">
          <ChatBox chatConnection={this.chatConnection} dispatch={dispatch} />
        </div>
        <div className="col-lg-6 offset-lg-6 col-md-12">
          <ChatSendForm chatConnection={this.chatConnection} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };
