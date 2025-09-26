import { Schema, model, Document } from 'mongoose';

// Interface
export interface IUserStatusesModel {
  _id: string;
  name: string;
  code: string;
}

export interface IUserStatusesDocument extends Omit<IUserStatusesModel, "_id">, Document {}

// Model
export const getUserStatusesSchema = (type: 'subdocument' | 'document' = 'document') =>
    new Schema<IUserStatusesDocument>(
        {
            name: { type: String, required: true },
            code: { type: String, required: true },
        },
        {
            timestamps: type === 'document',
            versionKey: false,
        }
    );

const userStatusesModels = model<IUserStatusesDocument>('UserStatuses', getUserStatusesSchema());
export default userStatusesModels;