import React, { FC } from "react";

interface MessageProps {
  text: string;
  time: string;
  images?: string[];
}

const Message: FC<MessageProps> = ({ text, time, images }) => {
  return (
    <div className="flex flex-col ">
      <div className="flex items-center">
        <div className="rounded-full bg-gray-700 w-8 h-8 mr-2"></div>
        <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
          <p>{text}</p>
          {images && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`image-${idx}`}
                  className="rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <span className="text-gray-400 text-xs ml-10">{time}</span>
    </div>
  );
};

export default Message;
