import Navigation from "../Components/Navigation";
import PropTypes from "prop-types";
import React, { Component } from "react";

const imgMyimageexample = require('../background.jpg');
const divStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: 'cover'
};
export default class Home extends Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  };




  componentDidMount() {
    fetch("http://localhost:3000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
       
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {

        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div style={divStyle}>
        <Navigation
          authenticated={authenticated}
          user = {this.state.user}
          handleNotAuthenticated={this._handleNotAuthenticated}
        />
        <img sc = './background.jpg'></img>
        
        <div  className='mt-5'>
          {!authenticated ? (
            <div className='mt-5 ml-3'>
            <h3>Browse Exclusive Recipes  </h3>
            </div>
          
          ) : (
            <div >
              <h1>You have login succcessfully!</h1>
            </div>
          )}
        </div>
      </div>
    );
  }

  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };
}