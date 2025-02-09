import React from "react";
import {Message} from "./Message"

export const MessageList = ({ messages }) => {

  return (
    <ul className="space-y-12 grid grid-cols-1">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </ul>
  );
};