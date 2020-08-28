import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true},
  firstName: String,
  lastName: String,
});

export interface User extends mongoose.Document {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
};

UserSchema.plugin(uniqueValidator);