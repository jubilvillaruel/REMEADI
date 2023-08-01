import { getDatabase, update, ref, get } from "firebase/database";
import { buddhismMDB, christianityMDB, genMilestoneReligionDB, generalMDB, hinduismMDB, islamMDB, judaismMDB, milestoneReligionDB } from "../Data/MilestonesDB"
import { auth } from "../../firebase";
import { getCategoryByPractice, religionDB } from "../Data/LocalDB";

const getReligionByMilestone = (milestoneTitle) => {
  console.log('from getReligionByMilestone milestoneTitle:',milestoneTitle)
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

const checkAndUpdateMilestone = async (practiceTitle) => {
  // milestone: meditate for the first time
  updateMilestoneToTrue('The Meditator', 'general')

  console.log('\n\n\n======================\nentered function')
  const uid = auth.currentUser.uid

  const religion = getCategoryByPractice(practiceTitle)['key']
  console.log('religion from line 139:', religion)

  const milestonesRef = ref(getDatabase(), 'milestones/'+uid)

  try {
    const historyRef = ref(getDatabase(), 'histories');
    // const historyRef = ref(getDatabase(), 'histories/'+uid);
    const snapshot = await get(historyRef);

    if (snapshot.exists()) {
      const dataFromFirebase = snapshot.val();

      // filter the data to get only the relevant sessions based on religion only
      const relevantSessionsByReligion = Object.values(dataFromFirebase).filter(
        (session) => session.uid === uid && session.religion === religion 
      );

      // milestone checker for Finishing ALL Practices of a specific Religion
      // const requiredPractices = ['Lectio Divina', 'Christian Meditation', 'Examen', 'Rosary']; // to be changed
      const requiredPractices = religionDB[religion]
      
      // check if all practices are present in the session history
      const allPracticesPresent = requiredPractices.every((practice) =>
        relevantSessionsByReligion.some((session) => session.practiceTitle === practice)
      );
      console.log('allPracticesPresent',allPracticesPresent)
      console.log('relevantSessionsByReligion',relevantSessionsByReligion)

      // get corresponding milestone and update it if achieved
      const milestoneTitle = getGenMileStoneByReligion(religion)
      console.log(milestoneTitle)

      if (allPracticesPresent) {
        updateMilestoneToTrue(milestoneTitle, religion)
        console.log(`Congratulations! You have completed ${requiredPractices} as per your
        chosen religion: "${religion}".`)
      } else {
        // throw new Error("Invalid All Practices Present:");
        console.log('All Practices are not Present')
      }



      // Filter the data to get only the relevant sessions based on religion and practice title ex. all lectio divina sessions
      const relevantSessions = Object.values(dataFromFirebase).filter(
        (session) => session.uid === uid && session.religion === religion && session.practiceTitle == practiceTitle
      );

      // const potentialMilestone = getMileStoneByPractice(practiceTitle) // not yet used
      // console.log('potentialMilestone:',potentialMilestone)

      // getMilestoneStatus(milestoneTitle)

      // update if achieved

      // check specific milestones

      // update if achieved
    }
  } catch (error) {
    console.log(error.stack)
  }
}

const getMilestoneStatus = async (milestoneTitle) => {
  const religion = getReligionByMilestone(milestoneTitle)

  const uid = auth.currentUser.uid;
  
  const milestoneRef = ref(getDatabase(), 'milestones/' + uid + '/' + religion);

  try {
    const snapshot = await get(milestoneRef);
    if (snapshot.exists()) {
      const milestoneData = snapshot.val();
      if (milestoneData.hasOwnProperty(milestoneTitle)) {
        const isAchieved = milestoneData[milestoneTitle];
        // console.log('Milestone Title:', milestoneTitle);
        // console.log('Is Achieved?', isAchieved);
        return isAchieved;
      } else {
        // console.log('Milestone not found');
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