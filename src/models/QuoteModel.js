import { get, ref } from 'firebase/database';
import { realtimeDB } from '../../firebase';
import * as Crypto from 'expo-crypto';

const getQuoteID = async () => {
  try {
    // Reference to the "motivation" node in the Realtime Database
    const collectionRef = ref(realtimeDB, 'motivation');

    // Fetch the data snapshot at the specified location
    const snapshot = await get(collectionRef);

    // Extract the data from the snapshot
    const data = snapshot.val();
    const quotes = Object.keys(data);

    // Get a random index
    const index = await getRandomNumberPerDay(quotes.length);
    const docId = quotes[index];

    return docId;
  } catch (error) {
    console.log('Error:', error);
    return Promise.reject(error); // Reject the promise in case of an error
  }
};


const getRandomNumberPerDay = async (max) => {
    // Get the current date
  const currentDate = new Date();

  // Generate a unique seed value based on the current date
  const seed = new Date().toISOString().split('T')[0];

  // Convert the seed value to a hash using a hash function
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    seed
  );

  // Convert the hash to a number
  const randomNumber = parseInt(hash, 16) % max;

  console.log("randomNumber: ",randomNumber)

  //   Return the random number
  return randomNumber;
}

export { getQuoteID, getRandomNumberPerDay }