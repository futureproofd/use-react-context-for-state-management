import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { EmailContext } from "./EmailContext";

// see notes for useContext
// essentially we're using a full export of the User/Email contexts
// and referencing them below
const MessageList = () => {
  const { user } = useContext(UserContext);
  const { loading, emails, onSelectEmail } = useContext(EmailContext);

  //we no longer need to wrap our return with consumers and render props when
  // using useContext hooks
  return (
    <div className="MessageList">
      {loading ? (
        <div className="no-messages">Loading...</div>
      ) : emails.length === 0 ? (
        <div className="no-messages">
          Your mailbox is empty, {user.firstName}! 🎉
        </div>
      ) : (
        <ul>
          {emails.map(email => (
            <Email
              key={email.id}
              email={email}
              onClick={() => onSelectEmail(email)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const Email = ({ email, onClick }) => (
  <li onClick={onClick}>
    <div className="subject">{email.subject}</div>
    <div classname="preview">{email.preview}</div>
  </li>
);

export default MessageList;
