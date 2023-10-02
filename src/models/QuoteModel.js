import { get, ref } from 'firebase/database';
import { auth, realtimeDB } from '../../firebase';
import * as Crypto from 'expo-crypto';

const getQuoteID = async (faithFocusedValue) => {
  try {
    // Reference to the "motivation" node in the Realtime Database
    const collectionRef = ref(realtimeDB, 'motivation');

    // Fetch the data snapshot at the specified location
    const snapshot = await get(collectionRef);

    let data = snapshot.val();

    if (faithFocusedValue) {
      // Fetch the user's religion
      const faithFocusedRef = ref(realtimeDB, 'users/'+auth.currentUser.uid+'/religion');

      const ffSnapshot = await get(faithFocusedRef);
      const religion = ffSnapshot.val()

      const filteredData = {};

      for (const key in data) {
        if (data[key].religion === religion) {
          filteredData[key] = data[key];
        }
      }
      data = filteredData;
    } 
   
    const quotes = Object.keys(data);

    // Get a random index
    const index = await getRandomNumberPerDay(quotes.length);
    const docId = quotes[index];

    return docId;
  } catch (error) {
    console.log('Error:', error);
    console.log('Stack:', error.stack);
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
  console.log("\n===MOTIVATION DETAILS===")
  console.log("random number: \t" + randomNumber)

  //   Return the random number
  return randomNumber;
}

export { getQuoteID, getRandomNumberPerDay }