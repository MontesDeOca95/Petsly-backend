import { Schema, model, Document } from 'mongoose';

// Interface
export interface IUserTypesModel {
  _id: string;
  name: string;
  code: string;
}

export interface IUserTypesDocument extends Omit<IUserTypesModel, "_id">, Document {}

// Model
export const getUserTypesSchema = (type: 'subdocument' | 'document' = 'document') =>
	new Schema<IUserTypesDocument>(
		{
			name: { type: String, required: true },
			code: { type: String, required: true },
		},
		{
			timestamps: type === 'document',
			versionKey: false,
		}
	);

const userTypesModels = model<IUserTypesDocument>('UserType', getUserTypesSchema());
export default userTypesModels;