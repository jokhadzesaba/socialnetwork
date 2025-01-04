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
export interface UserData {
  name: string;
  email: string;
  bio: string | null;
  avatar: string;
}

export interface Room {
  id: number;
  host: UserData;
  name: string;
  description: string;
  update: string;
  created: string;
  topic: Topic;
  participants: number[];
}
