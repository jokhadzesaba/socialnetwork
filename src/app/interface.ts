export interface Topic {
  id: number;
  name: string;
}

export interface TopicWithCount {
  topic: Topic; // Nested topic data
  count: number; // Count of related rooms
}
export interface Topic {
  id: number;
  name: string;
}
export interface User {
  name: string;
  email: string;
  bio: string | null;
  avatar: string;
}

export interface UserData {
  token: string;
  user: User;
}

export interface Message {
  id: number;
  user: User; // Simplified user data
  body: string;
  created: string;
  update: string;
}

export interface Room2 {
  id: number;
  name: string;
}
export interface Activity {
  id: number;
  user: User;
  room: Room2;
  body: string;
  update: string;
  created: string;
}
export interface Room {
  id: number;
  host: User;
  name: string;
  description: string;
  update: string;
  created: string;
  topic: Topic;
  participants: number;
  messages: Message[]; // Add messages to the Room interface
}
