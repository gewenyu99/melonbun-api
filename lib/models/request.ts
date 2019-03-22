import * as mongoose from 'mongoose';
import { STATUSES } from './enums';

const Schema = mongoose.Schema;

export const RequestSchema = new Schema({
	name: { type: String },
	description: { type: String },
	created_at: { type: Date, default: Date.now },
	created_by: { type: String },
	status: { type: String, enum: Object.values(STATUSES) },
	price: { value: Number, currency: String },
	tags: [{ type: String }]
});