"use client";
import React, { useState, useRef, useEffect } from "react";
import ChatLog from "./ChatLog";
import Chat from "./Chat";
import { Message, messages } from "../mockdata";

export default function LiveChat() {
  const [chatBoxHeight, setChatBoxHeight] = useState(48);
  const [mockMessages, setMockMessages] = useState<Message[]>(messages);
  const [bottomStatus, setBottomStatus] = useState(true);
  const chatBoxRef = useRef<HTMLTextAreaElement>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);

  // Handle the textarea resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 16; 
    const minHeight = 48; 
    const maxHeight = 96; 

    if (chatBoxRef.current) {
      chatBoxRef.current.style.height = "auto";
      const newHeight = Math.min(
        Math.max(chatBoxRef.current.scrollHeight, minHeight),
        maxHeight
      );
      setChatBoxHeight(newHeight);
      chatBoxRef.current.style.height = `${newHeight}px`;
    }
  };

  const addMessage = (message: Message) => {
    setMockMessages((prev) => [...prev, message]);
    // Automatically scroll to bottom if already at bottom when new message is sent
    if (bottomStatus) {
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTo({
        top: chatLogRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const checkIfAtBottom = () => {
    const isAtBottom = chatLogRef.current
      ? chatLogRef.current.scrollHeight - chatLogRef.current.scrollTop <=
        chatLogRef.current.clientHeight + 1
      : false;
    setBottomStatus(isAtBottom);
  };

  useEffect(() => {
    // Attach an event listener to handle scroll events
    const chatLogCurrent = chatLogRef.current;
    chatLogCurrent?.addEventListener("scroll", checkIfAtBottom);

    // Clean up the event listener when the component unmounts
    return () => chatLogCurrent?.removeEventListener("scroll", checkIfAtBottom);
  }, []);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom on initial render
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-gray-900 max-w-[400px]">
      <div className="flex items-center justify-center font-bold p-2">
        Stream Chat
      </div>

      <div className="flex-grow border-t overflow-y-auto relative">
        <ChatLog messages={mockMessages} ref={chatLogRef} />
        {!bottomStatus && (
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-md bg-gray-800 border-1 bg-opacity-50 text-gray-200 p-1 px-2 text-center cursor-pointer hover:bg-opacity-75"
            onClick={scrollToBottom}
          >
            More messages below...
          </div>
        )}
      </div>
      <div className="flex-shrink-0 p-2">
        <Chat
          onInputChange={handleInputChange}
          textareaRef={chatBoxRef}
          onSendMessage={addMessage}
        />
      </div>
    </div>
  );
}
