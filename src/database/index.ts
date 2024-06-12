import * as mongoose from 'mongoose';

import { User } from './models/user';
import { Fart } from './models/fart';

class Database {
  private isConnected = false;
  
  /**
   * Connects to database if not already done.
  */
 public async ensureConnection(): Promise<void> {
    if (this.isConnected) return;
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined !');
    }

    await mongoose.connect(process.env.MONGODB_URI!);
    this.isConnected = true;
  }

  public users = User;
  public farts = Fart;
}

const database = new Database();
export default database;
