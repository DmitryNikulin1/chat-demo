import React, { useState, useEffect, FC } from "react";
import Message from "./message";

const initialMessages = [
  {
    text: "Who was that photographer you shared with me recently?",
    time: "3:00 PM",
  },
  { text: "Slim Aarons", time: "3:01 PM" },
  { text: "That's him!", time: "3:02 PM" },
  { text: "What was his vision statement?", time: "3:03 PM" },
  {
    text: '"Attractive people doing attractive things in attractive places"',
    time: "3:04 PM",
  },
];

const Chat: FC = () => {
  const [messages, setMessages] =
    useState<{ text: string; time: string; images?: string[] }[]>(
      initialMessages
    );
  const [inputValue, setInputValue] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      text: inputValue,
      time: currentTime,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="h-screen max-w-[600px] bg-gray-900 text-white flex flex-col">
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center">
          <img src="/icons/back.svg" alt="back" />
        </div>
        <div>
          <h2>Sandra Dorsett</h2>
          <div className="text-xs text-center">Seen 1 hour ago</div>
        </div>
        <div className="rounded-full bg-gray-700 w-10 h-10 mr-2"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} time={message.time} />
        ))}
      </div>

      <footer className="p-4 bg-gray-800 flex items-center">
        <input
          className="flex-1 bg-gray-700 text-white p-2 rounded-l-lg"
          placeholder="Send a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-blue-500 p-2 rounded-r-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chat;
