import React from "react";
import { fetchEmails, fetchLatestEmails } from "./api";
import { withNotifier } from "./NotificationContext";

let EmailContext;
const { Provider, Consumer } = (EmailContext = React.createContext());

class EmailProvider extends React.Component {
  state = {
    emails: [],
    currentEmail: null,
    error: null,
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true, error: null });
    fetchEmails()
      .then(emails => this.setState({ loading: false, emails }))
      .catch(error => this.setState({ loading: false, error }));
    this.refreshInterval = setInterval(this.refresh, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refresh = () => {
    if (!this.state.loading) {
      fetchLatestEmails().then(emails => {
        if (emails.length > 0) {
          this.setState(state => ({
            emails: state.emails.concat(emails)
          }));
          // notify!
          this.props.notify(`${emails.length} more emails arrived`);
        }
      });
    }
  };

  handleSelectEmail = email => {
    this.setState({ currentEmail: email });
  };

  //The way the consumer works, if we use that notifier component inside of our render,
  //we won't have any way of getting the notify function out to where we needed to call it (above in refresh).
  // We'll go back over to NotificationContext.js. We'll make a function called withNotifier.
  render() {
    return (
      <Provider
        value={{
          ...this.state,
          onSelectEmail: this.handleSelectEmail
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

//as mentioned above, we wrap our email provider with our notifier consumer to get the notify function
const Wrapped = withNotifier(EmailProvider);

export { Wrapped as EmailProvider, Consumer as EmailConsumer, EmailContext };
