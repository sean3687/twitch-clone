import React, { useState, useEffect } from "react";
import {
  users,
  commands,
  emotes,
  User,
  Command,
  Emote,
  Message,
} from "../mockdata";


interface ChatProps {
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  onSendMessage: (message: Message) => void;
}


export default function Chat({ onInputChange, textareaRef, onSendMessage }: ChatProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<(User | Command | Emote)[]>(
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputValue(value);
    const lastWord = value.split(" ").slice(-1)[0];

    if (lastWord.startsWith("@")) {
      setSuggestions(
        users.filter((user) =>
          user.username.toLowerCase().includes(lastWord.slice(1).toLowerCase())
        )
      );
    } else if (lastWord.startsWith("/")) {
      setSuggestions(
        commands.filter((command) =>
          command.command
            .toLowerCase()
            .includes(lastWord.slice(1).toLowerCase())
        )
      );
    } else if (lastWord.startsWith(":")) {
      setSuggestions(
        emotes.filter((emote) =>
          emote.name.toLowerCase().includes(lastWord.slice(1).toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: User | Command | Emote) => {
    let newText;
    if ("username" in suggestion) {
      newText = inputValue.replace(/@[\w]*$/, `@${suggestion.username} `);
    } else if ("command" in suggestion) {
      newText = inputValue.replace(/\/[\w]*$/, `/${suggestion.command} `);
    } else {
      newText = inputValue.replace(/:[\w]*$/, `:${suggestion.name} `);
    }
    setInputValue(newText);
    setSuggestions([]);
    textareaRef.current?.focus();
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      let newUsername = "You";
      let newMessageContent = inputValue;

      // Check for commands and alter username/message as necessary
      const commandRegex = /\/\w+/;
      if (commandRegex.test(inputValue)) {
        newUsername = "System";
        newMessageContent = `${inputValue}`;
      } else {
        // Convert emote codes to URLs in the message
        const emoteRegex = /:(\w+)/g;
        newMessageContent = inputValue.replace(
          emoteRegex,
          (match, emoteName) => {
            const emote = emotes.find((e) => e.name === emoteName);
            return emote ? `/emotes/${emoteName}.webp` : match; // Use emote URL if available
          }
        );
      }

      const newMessage: Message = {
        color: "text-white", // Default color, you can modify this if needed
        username: newUsername,
        message: newMessageContent,
      };
      onSendMessage(newMessage);
      setInputValue(""); // Clear the input field after sending the message
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline from being added
      handleSendMessage();
    }
  };

  return (
    <div className="w-full relative">
      {suggestions.length > 0 && (
        <div className="absolute bg-gray-800 rounded p-2 w-[95%] bottom-20 my-3 outline outline-1 outline-gray-500">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left rounded p-1 focus:bg-gray-700 hover:bg-gray-700"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {"username" in suggestion
                ? `@${suggestion.username}`
                : "command" in suggestion
                ? `/${suggestion.command}`
                : `:${suggestion.name}`}
            </button>
          ))}
        </div>
      )}
      <textarea
        ref={textareaRef}
        className="w-full p-2 bg-gray-900 text-white border border-gray-500 rounded-md resize-none overflow-hidden focus:outline-none"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
      />
      <div className="w-full flex items-center">
        <div className="mr-auto">
          <div className="py-1 px-2 text-blue-500 rounded-md hover:bg-gray-600 hover:text-gray-200 ">
            $
          </div>
        </div>
        <button
          className="mr-0 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
