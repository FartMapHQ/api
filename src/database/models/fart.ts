import * as mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    description: { type: String, required: true }
  }
);

export type Fart = mongoose.InferSchemaType<typeof schema>;
export const Fart = mongoose.model('Fart', schema);
