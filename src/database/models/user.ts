import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  createdAt: { type: Date, required: true, default: Date.now },
  username: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: false, default: null },
  farts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fart', default: [] }]
});

export type User = mongoose.InferSchemaType<typeof schema>;
export const User = mongoose.model('User', schema);
