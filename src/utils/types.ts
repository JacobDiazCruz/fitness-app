export interface Exercise {
  _id?: string;
  userId: string;
  name: string;
  focus: string;
  category: string;
  videoLink?: string;
  instruction: string;
  files: Array<any>;
}