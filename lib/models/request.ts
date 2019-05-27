import * as mongoose from 'mongoose';
import { STATUSES } from './enums';

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  value: {
    type: Number,
    min: 0,
    required: true
  },
  currency: { type: String, required: true }
});

const RequestSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	created_by: { type: String, required: true },
	status: { type: String, enum: Object.values(STATUSES) },
  fav_state: { type: Boolean, required: true },
	price: { type: PriceSchema, required: true },
	tags: [{ type: String }]
});

PriceSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.__v;
  }
});

RequestSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

export { RequestSchema, PriceSchema };