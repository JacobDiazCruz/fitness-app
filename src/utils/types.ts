export interface Exercise {
  _id?: string;
  userId: string;
  secondaryId?: string;
  name: string;
  focus: string;
  category: string;
  videoLink?: string;
  instruction: string;
  sets?: any;
  files: Array<any>;
  checked?: boolean;
  isSelected?: boolean;
  supersetExercises?: Array<any>;
}

export interface Program {
  _id?: string;
  ownerId: string;
  users: Array<any>;
  name: string;
  description: string;
  weeks: number;
  workouts: Array<any>;
  createdAt?: number;
}

export interface Message {
  _id?: string;
  roomId: string;
  message?: string;
  senderId: string;
  files?: Array<string>;
  createdAt?: number;
}

export interface ResponseError {
  data: any;
  message: string;
  statusCode: number;
  success: boolean;
};