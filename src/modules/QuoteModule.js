import { db } from '../../firebase';
import * as Crypto from 'expo-crypto';

const getQuoteID = async () => {
  try {
    let index = 0
    const quotes = []
    // const quotes = ["Verily, with every difficulty, there is relief",
    //     "The only way to attain true peace is by submitting to the will of Allah",
    //     "Trust in the LORD with all your heart and lean not on your own understanding",
    //     "Cast all your anxiety on him because he cares for you",
    //     "Finally, be strong in the Lord and in his mighty power",]
    // const source = ["Quran 94:5",'Sheikh Yasir Qadhi','Proverbs 3:5','1 Peter 5:7','Ephesians 6:10']

    const collectionRef =  db.collection("motivation");

    await collectionRef.get().then(
      snapshot=>snapshot.docs.forEach(doc=>{
        quotes.push(doc.id)
      })
    )

    // generate random number 
    index = (await getRandomNumberPerDay(quotes.length))

    const docId = quotes[index]

    return docId
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return 'BU0jmXeZH6YKB3nWftRkPa'
  } 
}

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