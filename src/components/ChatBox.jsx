import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, ListGroup, Spinner } from "react-bootstrap";
import MockAdapter from "axios-mock-adapter";
import { BsChatDots } from "react-icons/bs";
import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.className && props.className.includes("user")
      ? "flex-end"
      : "flex-start"};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.className && props.className.includes("user")
      ? "#007bff"
      : "#f1f0f0"};
  color: ${(props) =>
    props.className && props.className.includes("user") ? "white" : "black"};
`;

const MessageSender = styled.div`
  font-size: 0.8em;
  margin-bottom: 5px;
  color: #666;
`;

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (showChat) {
      fetchChatHistory();
    }
  }, [showChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatHistory = async () => {
    console.log("fetchChatHistory");
    setIsLoading(true);
    try {
      const user_name = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      console.log("chat token", token);
      console.log("user_name", user_name);
      const response = await axios.get(
        "http://localhost:9090/basic/chat/history",
        {
          params: {
            user_name: user_name,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("chat response", response.data.data);
      const sortedMessages = sortMessagesByTimestamp(response.data.data);
      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const user_name = localStorage.getItem("username");
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      user_name: user_name,
      content: input,
      timestamp: new Date().toISOString(),
      messageType: "user",
      session_id: "current_session",
    };

    setMessages((prevMessages) =>
      sortMessagesByTimestamp([...prevMessages, userMessage])
    );
    setInput("");
    setIsLoading(true);

    try {
      const user_name = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:9090/basic/chat/send",
        {
          user_name: user_name,
          message: input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // use token to authenticate the user
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const sortedMessages = sortMessagesByTimestamp(response.data.data);
      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortMessagesByTimestamp = (msgs) => {
    return msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => setShowChat(true)}
      >
        <BsChatDots size={24} />
      </Button>

      <Modal show={showChat} onHide={() => setShowChat(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chat with AI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup
            className="mb-3"
            style={{ height: "400px", overflowY: "auto" }}
          >
            {messages.map((msg, index) => (
              <MessageContainer key={index} className={msg.messageType || ""}>
                <MessageSender>
                  {msg.messageType === "user" ? "You" : "AI"}
                </MessageSender>
                <MessageBubble className={msg.messageType || ""}>
                  {msg.content}
                </MessageBubble>
              </MessageContainer>
            ))}
            {isLoading && (
              <MessageContainer className="ai">
                <MessageBubble className="ai">
                  <Spinner animation="border" size="sm" /> AI is thinking...
                </MessageBubble>
              </MessageContainer>
            )}
            <div ref={messagesEndRef} />
          </ListGroup>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Send"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChatBot;
