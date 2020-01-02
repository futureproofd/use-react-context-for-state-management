import React from 'react'
import {FAKE_USER} from './api'
// we store the entire context in a variable and export it below
// so we can consume it on UserMenu wiuthout having to wrap it in a UserConsumer
//we can also take advantage of useContext hook, while exporting the entire context this way
let UserContext
const {Provider, Consumer} = (UserContext = React.createContext())

//we've extracted the provider into its own class
class UserProvider extends React.Component {
  state = {
    currentUser: FAKE_USER,
  }

  handleLogin = user => {
    this.setState({currentUser: user})
  }

  handleLogout = () => {
    this.setState({currentUser: null})
  }

  render() {
    return (
      <Provider
        value={{
          user: this.state.currentUser,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export {UserProvider, Consumer as UserConsumer, UserContext}
