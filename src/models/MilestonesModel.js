import { getDatabase, update, ref, get } from "firebase/database";
import { buddhismMDB, christianityMDB, genMilestoneReligionDB, generalMDB, hinduismMDB, islamMDB, judaismMDB, milestoneReligionDB } from "../Data/MilestonesDB"
import { auth } from "../../firebase";
import { getCategoryByPractice, religionDB } from "../Data/LocalDB";
import { meditationReligionDB } from "../Data/TypeDB";

const getReligionByMilestone = (milestoneTitle) => {
  // console.log('from getReligionByMilestone milestoneTitle:',milestoneTitle)
  try {
    let religion = '';

    if (generalMDB.hasOwnProperty(milestoneTitle)) {
        religion = 'general';
    } else if (christianityMDB.hasOwnProperty(milestoneTitle)) {
      religion = 'christianity';
    } else if (islamMDB.hasOwnProperty(milestoneTitle)) {
        religion = 'islam';
    } else if (hinduismMDB.hasOwnProperty(milestoneTitle)) {
        religion = 'hinduism';
    } else if (buddhismMDB.hasOwnProperty(milestoneTitle)) {
        religion = 'buddhism';
    } else if (judaismMDB.hasOwnProperty(milestoneTitle)) {
        religion = 'judaism';
    } else {
      // console.log(error.stack)
      throw new Error("Invalid Religion for:",milestoneTitle);
    }
    return religion
  } catch (error) {
    console.log(error.stack)
    throw new Error("Invalid Religion for:",milestoneTitle);
  }
  
}

const getMileStoneByPractice = (practiceTitle) => {
  if (milestoneReligionDB.hasOwnProperty(practiceTitle)) {
    return milestoneReligionDB[practiceTitle];    
  } else {
    throw new Error('Invalid Milestone')
  }
}

const getGenMileStoneByReligion = (religion) => {
  if (genMilestoneReligionDB.hasOwnProperty(religion)) {
    return genMilestoneReligionDB[religion];    
  } else {
    throw new Error('Invalid Milestone')
  }
}

const createMileStonesForUser = (uid) => {
    // get database reference
    const realtimeDB = getDatabase()
    const geRef = ref(realtimeDB, 'milestones/' + uid + '/general')
    const chRef = ref(realtimeDB, 'milestones/' + uid + '/christianity')
    const isRef = ref(realtimeDB, 'milestones/' + uid + '/islam')
    const hiRef = ref(realtimeDB, 'milestones/' + uid + '/hinduism')
    const buRef = ref(realtimeDB, 'milestones/' + uid + '/buddhism')
    const juRef = ref(realtimeDB, 'milestones/' + uid + '/judaism')

    // set general database
    const initMilestonesGe = Object.keys(generalMDB).reduce((acc, milestoneName) => {
      acc[milestoneName] = false;
      return acc;
    }, {});

    update(geRef, initMilestonesGe);

    // set christianity database
    const initMilestonesCh = Object.keys(christianityMDB).reduce((acc, milestoneName) => {
        acc[milestoneName] = false;
        return acc;
    }, {});

    update(chRef, initMilestonesCh);

    // set islam database
    const initMilestonesIs = Object.keys(islamMDB).reduce((acc, milestoneName) => {
        acc[milestoneName] = false;
        return acc;
    }, {});

    update(isRef, initMilestonesIs);

    // set hinduism database
    const initMilestonesHi = Object.keys(hinduismMDB).reduce((acc, milestoneName) => {
        acc[milestoneName] = false;
        return acc;
    }, {});

    update(hiRef, initMilestonesHi);

    // set buddhism database
    const initMilestonesBu = Object.keys(buddhismMDB).reduce((acc, milestoneName) => {
        acc[milestoneName] = false;
        return acc;
    }, {});

    update(buRef, initMilestonesBu);

    // set judaism database
    const initMilestonesJu = Object.keys(judaismMDB).reduce((acc, milestoneName) => {
        acc[milestoneName] = false;
        return acc;
    }, {});

    update(juRef, initMilestonesJu);

    // done
    console.log('milestones database: INITIALIZED')
}

const retrieveHistories = async (id) => {
  const historyRef = ref(getDatabase(), 'histories/' + id);
  
  try {
      const snapshot = await get(historyRef);
      
      if (snapshot.exists()) {
          const histories = [];
          const dataFromFirebase = snapshot.val();
          
          for (const historyKey in dataFromFirebase) {
              histories.push(dataFromFirebase[historyKey]);
          }
          
          return histories;
      } else {
          console.log('No histories found for user:', id);
          return [];
      }
  } catch (error) {
      console.log('Error retrieving histories:', error);
      return [];
  }
}



const checkAndUpdateMilestone = async (practiceTitle) => {
  console.log('\n\n\n\n\n\n\n\n\n========================================================================================\nCommencing General Milestone Evaluation')
  const id = auth.currentUser.uid

  // retrieve ALL GENERAL milestones that are NOT ACHIEVED yet then store in genMilestonesToCheck []
  const genMilestonesRef = ref(getDatabase(), 'milestones/'+id+'/general')
  const genSnapshot = await get(genMilestonesRef);
  if (genSnapshot.exists()) {
    // console.log('!!!!genSnapshot!!!!\n'+genSnapshot.val())
    const dataFromGenMilestones = genSnapshot.val()

    let genMilestonesToCheck = []

    for (const key in dataFromGenMilestones) {
      if (dataFromGenMilestones[key] == false) {
        genMilestonesToCheck.push(key)
      }
      // console.log(key, dataFromGenMilestones[key])
    }
    // console.log(genMilestonesToCheck)

    const historiesObj = await retrieveHistories(id)

    // evaluate if milestone is achieved - this is where the magic happens
    genMilestoneChecker(genMilestonesToCheck, historiesObj)

  } else {
    console.log('!!!!NO genSnapshot!!!!\n')
  }


  console.log('\n\n\n\n\n\n\n\n\n========================================================================================\nCommencing Religion-Specific Milestone Evaluation')
  
  // identify religion
  const religion = getCategoryByPractice(practiceTitle)['key']

  // retrieve ALL SPECIFIC milestones that are NOT ACHIEVED yet in THE SAME RELIGION then store in milestonesToCheck []
  const milestonesRef = ref(getDatabase(), 'milestones/'+id+'/'+religion.toLowerCase())
  console.log(milestonesRef)
  const snapshot = await get(milestonesRef);
  if (snapshot.exists()) {
    const dataFromMilestones = snapshot.val()

    let milestonesToCheck = []

    for (const key in dataFromMilestones) {
      if (dataFromMilestones[key] == false) {
        milestonesToCheck.push(key)
      }
      console.log(key, dataFromMilestones[key])
    }

    const historiesObj = await retrieveHistories(id)

    const histories = historiesObj.filter((session)=>session.religion == religion)

    // console.log(histories)

    // evaluate if milestone is achieved - this is where the magic happens
    milestoneChecker(milestonesToCheck, histories, religion)
  } else {
    console.log('!!!!NO genSnapshot!!!!\n')
  }
  
  

  // =========================================================================================

  // console.log('\n\n\n======================\nentered function')
  const uid = auth.currentUser.uid

  
  // console.log('religion from line 139:', religion)

  // const milestonesRef = ref(getDatabase(), 'milestones/'+uid)

  // try {
  //   const historyRef = ref(getDatabase(), 'histories/'+uid);
  //   // const historyRef = ref(getDatabase(), 'histories/'+uid);
  //   const snapshot = await get(historyRef);

  //   if (snapshot.exists()) {
  //     const dataFromFirebase = snapshot.val();
  //     console.log('var dataFromFirebase: '+dataFromFirebase)

  //     // filter the data to get only the relevant sessions based on religion only
  //     const relevantSessionsByReligion = Object.values(dataFromFirebase).filter(
  //       // (session) => session.uid === uid && session.religion === religion 
  //       (session) => session.religion === religion 
  //     );
  //     console.log('var relevantSessionsByReligion: '+relevantSessionsByReligion)

  //     // milestone checker for Finishing ALL Practices of a specific Religion
  //     // const requiredPractices = ['Lectio Divina', 'Christian Meditation', 'Examen', 'Rosary']; // to be changed
  //     const requiredPractices = religionDB[religion]
      
  //     // check if all practices are present in the session history
  //     const allPracticesPresent = requiredPractices.every((practice) =>
  //       relevantSessionsByReligion.some((session) => session.practiceTitle === practice)
  //     );
  //     // console.log('allPracticesPresent',allPracticesPresent)
  //     // console.log('relevantSessionsByReligion',relevantSessionsByReligion)

  //     // get corresponding milestone and update it if achieved
  //     const milestoneTitle = getGenMileStoneByReligion(religion)
  //     // console.log(milestoneTitle)

  //     if (allPracticesPresent) {
  //       updateMilestoneToTrue(milestoneTitle, religion)
  //       console.log(`Congratulations! You have completed ${requiredPractices} as per your
  //       chosen religion: "${religion}".`)
  //     } else {
  //       // throw new Error("Invalid All Practices Present:");
  //       console.log('All Practices are not Present')
  //     }



  //     // Filter the data to get only the relevant sessions based on religion and practice title ex. all lectio divina sessions
  //     const relevantSessions = Object.values(dataFromFirebase).filter(
  //       (session) => session.uid === uid && session.religion === religion && session.practiceTitle == practiceTitle
  //     );

  //     // const potentialMilestone = getMileStoneByPractice(practiceTitle) // not yet used
  //     // console.log('potentialMilestone:',potentialMilestone)

  //     // getMilestoneStatus(milestoneTitle)

  //     // update if achieved

  //     // check specific milestones

  //     // update if achieved
  //   }
  // } catch (error) {
  //   console.log(error.stack)
  // }
}

const genMilestoneChecker = (milestones, historiesObject) => {
  console.log('\n\n\n===========================\nMilestone Evaluation begins\n===========================\n')
  console.log('Milestones to check:')
  milestones.forEach(milestone => {
    console.log('-'+milestone)
  })

  milestones.forEach(milestone => {
    switch (milestone) {
      case Object.keys(generalMDB)[0]: // The Meditator
        console.log('\nattempting to achieve THE MEDITATOR')
        updateMilestoneToTrue(Object.keys(generalMDB)[0], 'general') // meditate for the first time. set to True
        break;
  
      case Object.keys(generalMDB)[1]: // Spiritual Meditation Expert

        // retrieve all practices in an array for checking
        const allPractices = Object.keys(meditationReligionDB)
        // console.log('var allPractices: '+allPractices)

        // prepare histories of the user
        // console.log('var historiesObject: '+historiesObject)

        historiesObject.forEach(item => {
          console.log(item.practiceTitle)
        });

        // check if all practices are present in the session history
        const allPracticesPresent = allPractices.every((practice) =>
          historiesObject.some((session) => session.practiceTitle === practice)
        );

        // console.log('var allPracticesPresent: '+allPracticesPresent)

        if (allPracticesPresent == true) {
          updateMilestoneToTrue(Object.keys(generalMDB)[1], 'general')
        } else {
          console.log('!!',Object.keys(generalMDB)[1],'all practices are not present')
        }
        break;
  
      case Object.keys(generalMDB)[2]: // Spiritual Commitment
        let consecutiveDays = 1; // Start with 1 to count the first day of meditation
        let prevDate = null; // To keep track of the previous date
        let achieved = false; // Flag to indicate if milestone is achieved
        let maxCount = consecutiveDays
        
        for (let i = 0; i < historiesObject.length; i++) {
          // console.log('!)@*&#)%*@#$)!@*#&')
          const currentDate = new Date(historiesObject[i].currentDate).getTime();
          console.log(historiesObject[i].currentDate)

          if (prevDate === null) {
            prevDate = currentDate;
            continue; // Skip the first iteration
          } else {
            // console.log(('currentDate:',currentDate,'vs prevDate:',prevDate)
            const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
            const differenceInDays = (currentDate - prevDate) / oneDay;
            console.log('prev date:',datetime.datetime.utcfromtimestamp(prevDate),'| current date:',datetime.datetime.utcfromtimestamp(currentDate) )
            console.log('difference In Days:',differenceInDays)

            if (differenceInDays >= 1 && differenceInDays < 2) {
              consecutiveDays++;
              if (maxCount < consecutiveDays) {
                maxCount = consecutiveDays
              }
              if (consecutiveDays >= 50) {
                  achieved = true;
                  console.log('===Spiritual Commitment Qualified!===')
                  break;
              }
            } else if (differenceInDays == 0) {
                consecutiveDays = 1; // Reset count if not consecutive
            } 
            console.log('consecutive days meditated count:',consecutiveDays)
            console.log()
            prevDate = currentDate;
          }
        };

        if (achieved) {
          updateMilestoneToTrue(Object.keys(generalMDB)[2], 'general')
        } else {
          console.log('!!',Object.keys(generalMDB)[2],'not yet achieved, you only meditated for', maxCount, 'day/s only')
        }
        break;
  
      default:
        console.log('no general milestones')
        break;
    }
  });
}

const milestoneChecker = (milestones, historiesObject, religion) => {
  console.log('\n\n\n===========================\nMilestone Evaluation begins\n===========================\n')
  switch (religion) {
    case 'Christianity':
      christianityMilestoneChecker(milestones, historiesObject)
      break;

    case 'Islam':
      islamMilestoneChecker(milestones, historiesObject)
      break;

    case 'Hindusim':
      hindusimMilestoneChecker(milestones, historiesObject)
      break;

    case 'Buddhism':
      buddhismMilestoneChecker(milestones, historiesObject)
      break;

    case 'Judaism':
      judaismMilestoneChecker(milestones, historiesObject)
      break;

    default:
      alert('Religion Error: No religion found')
      break;
  }
}

const christianityMilestoneChecker = (milestones, historiesObject) => {
  milestones.forEach(milestone => {
    console.log('var milestone: '+milestone)

    switch (milestone) {
      case Object.keys(christianityMDB)[0]: // Scripture Master
        console.log(Object.keys(christianityMDB)[0])
        break;
  
      case Object.keys(christianityMDB)[1]: // Dual Deliberation
        console.log(Object.keys(christianityMDB)[1])
        break;
  
      case Object.keys(christianityMDB)[2]: // Rosary Devotee
        console.log(Object.keys(christianityMDB)[2])
        break;

      case Object.keys(christianityMDB)[3]: // Man of Scriptures
        console.log(Object.keys(christianityMDB)[3])
        break;

      case Object.keys(christianityMDB)[4]: // Bible Meditation Expert
        console.log(Object.keys(christianityMDB)[4])
        break;
  
      default:
        console.log('no christian milestones')
        break;
    }
  });
}

const islamMilestoneChecker = (milestones, historiesObject) => {
  milestones.forEach(milestone => {
    console.log('var milestone: '+milestone)

    switch (milestone) {
      case Object.keys(islamMDB)[0]: // Islamic Knowledge
        console.log(Object.keys(islamMDB)[0])
        break;
  
      case Object.keys(islamMDB)[1]: // Dhikr Devotee
        console.log(Object.keys(islamMDB)[1])
        break;
  
      case Object.keys(islamMDB)[2]: // Muraqaba Mastery
        console.log(Object.keys(islamMDB)[2])
        break;

      case Object.keys(islamMDB)[3]: // Taffakur Insight
        console.log(Object.keys(islamMDB)[3])
        break;

      case Object.keys(islamMDB)[4]: // Sufi Breathing Prowess
        console.log(Object.keys(islamMDB)[4])
        break;
  
      default:
        console.log('no islam milestones')
        break;
    }
  });
}

const hindusimMilestoneChecker = (milestones, historiesObject) => {
  milestones.forEach(milestone => {
    console.log('var milestone: '+milestone)

    switch (milestone) {
      case Object.keys(hinduismMDB)[0]: // Islamic Knowledge
        console.log(Object.keys(hinduismMDB)[0])
        break;
  
      case Object.keys(hinduismMDB)[1]: // Dhikr Devotee
        console.log(Object.keys(islamMDB)[1])
        break;
  
      case Object.keys(hinduismMDB)[2]: // Muraqaba  
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[2]: // Muraqaba 
        console.log(Object.keys(hinduismMDB)[2])
        break;

      default:
        console.log('no hinduism milestones')
        break;
    }
  });
}

const buddhismMilestoneChecker = (milestones, historiesObject) => {

}

const judaismMilestoneChecker = (milestones, historiesObject) => {

}


const getMilestoneStatus = async (milestoneTitle) => {
  const religion = getReligionByMilestone(milestoneTitle)

  const uid = auth.currentUser.uid;
  
  const milestoneRef = ref(getDatabase(), 'milestones/' + uid + '/' + religion);

  try {
    const snapshot = await get(milestoneRef);
    if (snapshot.exists()) {
      const milestoneData = snapshot.val();
      // console.log('milestoneData'+milestoneData)
      if (milestoneData.hasOwnProperty(milestoneTitle)) {
        const isAchieved = milestoneData[milestoneTitle];
        // console.log('Milestone Title:', milestoneTitle);
        // console.log('Is Achieved?', isAchieved);
        return isAchieved;
      } else {
        console.log('Milestone not found');
        return false;
      }
    } else {
      console.log("No data available");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

const updateMilestoneToTrue = async (milestoneTitle, rel) => {
  console.log('milestoneTitle',milestoneTitle)
  let religion = rel.toLowerCase()
  console.log('religion',religion)
  const uid = auth.currentUser.uid; // Replace with the user's UID
  // const religion = 'christianity'; // Replace with the user's religion or obtain it from somewhere


  try {
    const milestoneRef = ref(getDatabase(), `milestones/${uid}/${religion}`);
    await update(milestoneRef, { [milestoneTitle]: true });
    console.log(`==============================\n${milestoneTitle} has been updated to TRUE.\n==============================`);
    return true; // Return true to indicate successful update
  } catch (error) {
    console.error(`Failed to update ${milestoneTitle}: ${error.message}`);
    return false; // Return false to indicate update failure
  }
};


export { createMileStonesForUser, getMilestoneStatus, updateMilestoneToTrue, checkAndUpdateMilestone}