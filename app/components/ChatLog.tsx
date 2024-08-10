import React, { useState, useEffect, forwardRef } from "react";
import { Message, emotes, Emote, commands, Command } from "../mockdata";

interface ChatLogProps {
  messages: Message[];
}

const ChatLog = forwardRef<HTMLDivElement, ChatLogProps>(({ messages }, ref) => {
  const [isAtBottom, setIsAtBottom] = useState(true);

  const onScroll = () => {
    const current = ref.current;
    if (!current) return;

    const isScrolledToBottom = current.scrollHeight - current.clientHeight <= current.scrollTop + 1;
    setIsAtBottom(isScrolledToBottom);
  };

  useEffect(() => {
    const current = ref.current;
    if (isAtBottom && current) {
      current.scrollTop = current.scrollHeight - current.clientHeight;
    }
  }, [messages]); // Dependency on messages means this effect runs every time the message list updates

  const renderMessage = (message: string, username: string): JSX.Element[] => {
    const parts = message.split(/(\/emotes\/\w+\.webp|\/\w+)/g);

    return parts.map((part, index) => {
      const emote: Emote | undefined = emotes.find((e) => e.url === part);
      if (emote) {
        return <img key={index} src={emote.url} alt={emote.name} className="inline w-6 h-6 mx-1" />;
      }
      const command: Command | undefined = commands.find((c) => `/${c.command}` === part);
      if (command) {
        return <span key={index} className="text-cyan-500">{`${command.command}`}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      ref={ref}
      className="w-full h-full bg-gray-900 overflow-y-auto"
      onScroll={onScroll} // Listen to scroll events
    >
      {messages.map((msg: Message, index: number) => (
        <div key={index} className="flex items-start px-2 py-1 hover:bg-gray-800 hover:rounded-md">
          <span className={`font-bold ${msg.color} mr-2`}>{msg.username}:</span>
          <span className="text-white">{renderMessage(msg.message, msg.username)}</span>
        </div>
      ))}
    </div>
  );
});

export default ChatLog;
