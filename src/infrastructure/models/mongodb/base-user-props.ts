import { ObjectId } from "mongodb";

export interface BaseUserModel {
  _id: ObjectId;
  username: string;
  email: string;
  authentication: {
    passwordHash: string;
    sessionToken?: string;
  };
  createdAt: Date;
}
