import * as mongoose from 'mongoose';

class DatabaseConnector {
  private isConnected = false;
  
  /**
   * Connects to database if not already done.
   */
  public async ensureConnection(): Promise<void> {
    if (this.isConnected) return;

    await mongoose.connect(process.env.MONGODB_URI!);
    this.isConnected = true;
  }
}

const connector = new DatabaseConnector();
export default connector;
