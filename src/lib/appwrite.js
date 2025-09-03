import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')  // Replace with your Appwrite endpoint (or https://cloud.appwrite.io/v1 for cloud)
  .setProject('68b869220037a7a0d0b1');     // Replace with your Appwrite project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const DATABASE_ID = 'transitDB';
export const BUSES_COLLECTION_ID = 'buses';
export { ID, client };  // Export client for subscriptions