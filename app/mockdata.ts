// mockdata.ts

export interface User {
    username: string;
  }
  
  export interface Command {
    command: string;
    description: string;
  }
  
  export interface Emote {
    name: string;
    url: string;
  }

  export interface Message {
    color: string;
    username: string;
    message: string;
  }
  
  export const users: User[] = [
    { username: "gamer123" },
    { username: "noobMaster" },
    { username: "proPlayer" },
    { username: "streamerX" },
    { username: "chatGuru" },
  ];
  
  export const commands: Command[] = [
    { command: "block", description: "Block a user" },
    { command: "color", description: "Change chat color" },
    { command: "gift", description: "Gift a sub" },
    { command: "vote", description: "Start a vote" },
    { command: "mods", description: "View mods" },
  ];
  
  export const emotes: Emote[] = [
    { name: "catJam", url: "/emotes/catJam.webp" },
    { name: "EZ", url: "/emotes/EZ.webp" },
    { name: "KEKW", url: "/emotes/KEKW.webp" },
    { name: "monkaS", url: "/emotes/monkaS.webp" },
  ];

  export const messages: Message[] = [
    {
      color: "text-red-500",
      username: "gamer123",
      message: "That was an epic play! /emotes/catJam.webp",
    },
    {
      color: "text-blue-500",
      username: "noobMaster",
      message: "/emotes/KEKW.webp How did you do that? Teach me!",
    },
    {
      color: "text-green-500",
      username: "proPlayer",
      message: "GG everyone, well played!",
    },
    {
      color: "text-yellow-500",
      username: "streamerX",
      message: "Thanks for watching the stream! /emotes/EZ.webp",
    },
    {
      color: "text-purple-500",
      username: "chatGuru",
      message: "/emotes/monkaS.webp Remember to like and subscribe!",
    },
  ];
  