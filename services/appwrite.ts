import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = "https://cloud.appwrite.io/v1";

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);


console.log("SW what is datbaseID", DATABASE_ID);
console.log("SW what is collectionID", COLLECTION_ID);
console.log("SW what is projectID", PROJECT_ID);

const database = new Databases(client);

export async function updateSearchCount(query: string, movie: Movie) {
  try {
    console.log("Is update search count called");
    
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (!!result?.documents.length) {
      const existingMovie = result.documents[0];

      console.log("what is existingMovie", existingMovie);

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1
        }
      );
    } else {
      const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          searchTerm: query,
          movieId: movie?.id,
          title: movie?.title,
          count: 1,
          posterUrl: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
        }
      )
      console.log("What is response on movie create", response);
    }

  } catch (err) {
    console.log("Error updating search count", err);
    throw new Error("Failed to update search count");
  }
}

export async function getTrendingMovies(): Promise<TrendingMovie[] | undefined> {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ])

    console.log("SW what is result on trending movies", result);

    return result.documents as unknown as TrendingMovie[];
  } catch (err) {
    console.log("Error fetching trending movies", err);
    return undefined;
  }
}