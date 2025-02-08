// src/components/__tests__/Chatbot.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chatbot from '../Chatbot';

describe('Chatbot Component', () => {
  it('renders the chatbot component', () => {
    render(<Chatbot />);
    expect(screen.getByText('Chatbot')).toBeInTheDocument();
  });

  it('displays the initial message', () => {
    render(<Chatbot />);
    expect(screen.getByText('Welcome to the Chatbot!')).toBeInTheDocument();
  });

  it('allows the user to type a message and submit it', () => {
    render(<Chatbot />);
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');

    // Simulate user typing a message
    fireEvent.change(input, { target: { value: 'Hello, Chatbot!' } });
    expect(input).toHaveValue('Hello, Chatbot!');

    // Simulate user clicking the send button
    fireEvent.click(sendButton);

    // Check if the message is displayed in the chat
    expect(screen.getByText('Hello, Chatbot!')).toBeInTheDocument();
  });
});
