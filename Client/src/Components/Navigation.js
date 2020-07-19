import React from "react";
import PropTypes from "prop-types";

class Navigation extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };
 
  render() {
    const { authenticated } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <a className="navbar-brand font-weight-bold" href="/">
          <h4>Recipedia.</h4>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav ml-auto">
          {authenticated ? (
            
            <li onClick={this._handleLogoutClick}>Logout</li>
          ) : (
            <li onClick={this._handleSignInClick}>Login</li>
          )}
        </ul>
      </nav>
    );
  }
  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open("http://localhost:3000/auth/google", "_self");
  };
  
  _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage component
    window.open("http://localhost:3000/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };
}


export default Navigation;
