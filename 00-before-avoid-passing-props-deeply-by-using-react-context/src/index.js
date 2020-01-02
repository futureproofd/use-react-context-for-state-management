import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import { UserProvider, UserConsumer } from "./UserContext";
import { EmailProvider } from "./EmailContext";
import { NotificationProvider } from "./NotificationContext";
import "./index.css";

//we also move over all the class methods to handle state / login to the provider class

//we move the provider value into its own content provider
// and destructure user for the consumer to use
function Root() {
  return (
    <UserConsumer>
      {({ user }) => (user ? <MainPage /> : <LoginPage />)}
    </UserConsumer>
  );
}

ReactDOM.render(
  <NotificationProvider>
    <UserProvider>
      <EmailProvider>
        <Root />
      </EmailProvider>
    </UserProvider>
  </NotificationProvider>,
  document.querySelector("#root")
);
