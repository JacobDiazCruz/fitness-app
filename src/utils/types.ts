export interface Exercise {
  _id?: string;
  userId: string;
  secondaryId?: string;
  name: string;
  focus: string;
  category: string;
  videoLink?: string;
  instruction: string;
  files: Array<any>;
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