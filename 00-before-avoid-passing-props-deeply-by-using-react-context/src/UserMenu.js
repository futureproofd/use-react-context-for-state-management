import React from "react";
import { UserConsumer, UserContext } from "./UserContext";

class UserMenu extends React.Component {
  //context type is only available on classes
  // we import the entire UserContext and destructure what we need for the consumer below
  static contextType = UserContext;

  state = {
    menuVisible: false
  };

  avatarRef = React.createRef();

  componentDidMount() {
    document.addEventListener("click", this.hideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.hideMenu);
  }

  hideMenu = e => {
    // Ignore clicks on the avatar
    // so that the menu can open
    if (e.target !== this.avatarRef.current) {
      this.setState({ menuVisible: false });
    }
  };

  toggleMenu = () => {
    this.setState(state => ({
      menuVisible: !state.menuVisible
    }));
  };

  // we used contextType to consume the entire Context without having to wrap our render with a Consumer
  render() {
    const { user, onLogout } = this.context;
    return (
      <div className="UserMenu">
        <img
          className="UserAvatar"
          alt="User avatar"
          src={user.avatar}
          onClick={this.toggleMenu}
          ref={this.avatarRef}
        />
        {this.state.menuVisible && (
          <ul>
            <li onClick={onLogout}>Logout</li>
          </ul>
        )}
      </div>
    );
  }
}

export default UserMenu;
