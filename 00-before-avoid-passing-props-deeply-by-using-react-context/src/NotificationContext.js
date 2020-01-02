import React from 'react'

const {Provider, Consumer} = React.createContext()

class NotificationProvider extends React.Component {
  state = {
    messages: [],
  }

  addMessage = text => {
    this.setState(state => ({
      messages: [
        ...state.messages,
        {
          id: Math.random(),
          text,
          addedAt: new Date().getTime(),
        },
      ],
    }))
  }

  removeMessage = message => {
    this.setState(state => ({
      messages: state.messages.filter(m => m.id !== message.id),
    }))
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          notify: this.addMessage,
        }}
      >
        <div classname="notification-wrapper">
          <ul>
            {this.state.messages.map(message => (
              <Notification
                key={message.id}
                message={message}
                onClose={() => this.removeMessage(message)}
              />
            ))}
          </ul>
          {this.props.children}
        </div>
      </Provider>
    )
  }
}

const Notification = ({message, onClose}) => (
  <li>
    {message.text}
    <button classname="close" onClick={onClose}>
      &times;
    </button>
  </li>
)

// our HOC which returns a new component (Consumer) and the render props pattern
// to pull out the notify function and render out the component
function withNotifier(Component) {
  return function Notified(props) {
    return (
      <Consumer>
        {({notify}) => <Component {...props} notify={notify} />}
      </Consumer>
    )
  }
}

export {NotificationProvider, Consumer as Notifier, withNotifier}
