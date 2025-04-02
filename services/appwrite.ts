import { Client, Databases } from "react-native-appwrite";


const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = 'https://cloud.appwrite.io/v1';


const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)


const database = new Databases(client);