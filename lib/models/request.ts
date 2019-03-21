import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const STATUSES = Object.freeze({
  PENDING: 'pending',
  FULFULLED: 'fulfilled',
  COMPLETE: 'complete',
  IMCOMPLETE: 'incomplete'
});

export const RequestSchema = new Schema({
	name: { type: String, required: true, index: true },
	description: { type: String },
	created_at: { type: Date, default: Date.now },
	created_by: { type: String },
	status: { type: String, enum: Object.values(STATUSES) },
	price: { value: Number, currency: String },
	tags: [{ type: String }]
});