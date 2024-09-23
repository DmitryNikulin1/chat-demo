import { useState, useEffect, useRef, FC } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");

      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12;

      const formattedTime = `${hours}:${minutes} ${ampm}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      text: inputValue,
      time: currentTime,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileMessage = {
        text: `File attached: ${files[0].name}`,
        time: currentTime,
        images: [URL.createObjectURL(files[0])],
      };

      setMessages((prevMessages) => [...prevMessages, fileMessage]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-700">
      <div className="h-screen w-full max-w-full lg:max-w-[600px] bg-gray-900 text-white flex flex-col">
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

          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 bg-gray-800 flex items-center gap-4 justify-between sticky bottom-0">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-7 h-7">
            <button onClick={() => fileInputRef.current?.click()}>
              <img
                src="/icons/paperclip.svg"
                alt="Attach"
                className="w-full h-full"
              />
            </button>
          </div>
          <div className="w-7 h-7">
            <img
              src="/icons/lightning.svg"
              alt="Lightning"
              className="w-full h-full"
            />
          </div>
          <div className="flex-1">
            <input
              className="w-full bg-gray-700 text-white p-2 rounded-3xl"
              placeholder="Send a message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <button
              className="flex items-center justify-center"
              onClick={handleSendMessage}
            >
              <img
                className="w-10 h-10 fill-gray-500"
                src="/icons/round.svg"
                alt="round"
              />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
