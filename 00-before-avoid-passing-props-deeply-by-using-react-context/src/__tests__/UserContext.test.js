import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UserProvider, UserConsumer } from "../UserContext";
import { FAKE_USER } from "../api";

test("default value is undefined ", () => {
  let actualValue = "replace me";
  render(<UserConsumer>{value => (actualValue = value)}</UserConsumer>);
  //note we're not wrapping our consumer with a provider so the value we pass and assign to actualvalue
  //should be undefined
  expect(actualValue).toBeUndefined();
});

test("initial user is FAKE_USER", () => {
  const { container } = render(
    <UserProvider>
      <UserConsumer>{({ user }) => <div>{user.username}</div>}</UserConsumer>
    </UserProvider>
  );
  expect(container.textContent).toEqual(FAKE_USER.username);
});

test("onLogin sets the user ", () => {
  const { container } = render(
    <UserProvider>
      <UserConsumer>
        {({ user, onLogin }) => (
          <div>
            {user.username}
            <button onClick={() => onLogin({ username: "erin" })} />
          </div>
        )}
      </UserConsumer>
    </UserProvider>
  );
  fireEvent.click(container.querySelector("button"));
  expect(container.querySelector("div").textContent).toEqual("erin");
});

// when logout fires, the user should be null, so we render the result of that to string
test("onLogout clears the user ", () => {
  const { container } = render(
    <UserProvider>
      <UserConsumer>
        {({ user, onLogout }) => (
          <div>
            {(user === null).toString()}
            <button onClick={() => onLogout()} />
          </div>
        )}
      </UserConsumer>
    </UserProvider>
  );
  fireEvent.click(container.querySelector("button"));
  expect(container.querySelector("div").textContent).toEqual("true");
});
