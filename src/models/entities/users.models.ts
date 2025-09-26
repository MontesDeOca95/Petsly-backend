import { Schema, SchemaDefinition, SchemaDefinitionType, Document, model } from 'mongoose';

import { IUserTypesModel, getUserTypesSchema } from '../nomenclators/user-types.models';
import { IUserStatusesModel, getUserStatusesSchema } from '../nomenclators/user-statuses.models';

// Interface
export interface IUserModel {
  _id: string;
  firstName: string;
  lastName: string;
  dni: string;
  username: string;
  password: string;
  email: string;
  userType: IUserTypesModel;
  status: IUserStatusesModel;
}

export interface IUserDocument extends Omit<IUserModel, "_id">, Document { }

// Model
export const getUsersSchema = (type: "subdocument" | "document" = "document") => {
  let schema: SchemaDefinition<SchemaDefinitionType<IUserDocument>, IUserDocument> = {
    firstName: { type: String },
    lastName: { type: String },
    dni: { type: String },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    userType: { type: getUserTypesSchema('subdocument'), required: true },
    status: { type: getUserStatusesSchema('subdocument'), required: true },
  };

  return new Schema<IUserDocument>(schema, {
    timestamps: type === 'document',
    versionKey: false,
  });
};

const usersModels = model<IUserDocument>('User', getUsersSchema());
export default usersModels;