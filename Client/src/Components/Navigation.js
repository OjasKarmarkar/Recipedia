import React from "react";
import PropTypes from "prop-types";
import { Popover, Button, OverlayTrigger } from "react-bootstrap";


class Navigation extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };

  render() {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{this.props.user.username}</Popover.Title>
        <Popover.Content>
           <li onClick={this._handleLogoutClick}>Logout</li>
        </Popover.Content>
      </Popover>
    );
    const { authenticated } = this.props;
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light navbar-trans"
          style={{
            background: "transparent",
          }}
        >
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
              <div>
                <li>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                  >
                    <img
                      src={this.props.user.profilePic}
                      alt="Avatar"
                      class="md-avatar rounded-circle"
                      height="35px"
                      width="35px"
                    ></img>
                  </OverlayTrigger>
                </li>
               
              </div>
            ) : (
              <li onClick={this._handleSignInClick}>Login</li>
            )}
          </ul>
        </nav>
      </div>
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
