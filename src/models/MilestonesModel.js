import { getDatabase, update, ref, get } from "firebase/database";
import { buddhismMDB, christianityMDB, genMilestoneReligionDB, generalMDB, hinduismMDB, islamMDB, judaismMDB, milestoneReligionDB } from "../Data/MilestonesDB"
import { auth } from "../../firebase";
import { dayOfWeekMap, getCategoryByPractice, religionDB } from "../Data/LocalDB";
import { meditationReligionDB } from "../Data/TypeDB";
import { ChristianityDB } from "../Data/Practices/ChristianityDB";

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

const getTotalDurationByPractice = (histories) => {
  let totalDuration = 0
  histories.forEach(session => {
    // console.log('duration', session.duration)
    totalDuration += session.duration
  })
  return totalDuration/1000
}

const checkAndUpdateMilestone = async (practiceTitle) => {
  console.log('\n\n\n\n\n\n\n\n\n========================================================================================\nCommencing General Milestone Evaluation')
  const id = auth.currentUser.uid

  // retrieve ALL GENERAL milestones that are NOT ACHIEVED yet then store in genMilestonesToCheck []
  const genMilestonesRef = ref(getDatabase(), 'milestones/'+id+'/general')
  const genSnapshot = await get(genMilestonesRef);
  if (genSnapshot.exists()) {
    const dataFromGenMilestones = genSnapshot.val()

    let genMilestonesToCheck = []

    for (const key in dataFromGenMilestones) {
      if (dataFromGenMilestones[key] == false) {
        genMilestonesToCheck.push(key)
      }
    }
    const historiesObj = await retrieveHistories(id)

    // evaluate if milestone is achieved - this is where the magic happens
    genMilestoneChecker(genMilestonesToCheck, historiesObj)

  } else {
    console.log('!!!!NO genSnapshot!!!!\n')
  }


  console.log('\n\n\n\n\n\n\n\n\n========================================================================================\nCommencing Religion-Specific Milestone Evaluation')
  console.log('\n===========================\nMilestone Evaluation begins\n===========================\n')
  // identify religion
  const religion = getCategoryByPractice(practiceTitle)['key']

  // retrieve ALL SPECIFIC milestones that are NOT ACHIEVED yet in THE SAME RELIGION then store in milestonesToCheck []
  const milestonesRef = ref(getDatabase(), 'milestones/'+id+'/'+religion.toLowerCase())
  const snapshot = await get(milestonesRef);
  if (snapshot.exists()) {
    const dataFromMilestones = snapshot.val()

    let milestonesToCheck = []

    for (const key in dataFromMilestones) {
      if (dataFromMilestones[key] == false) {
        milestonesToCheck.push(key)
      }
    }

    console.log('Milestones to check:')
    milestonesToCheck.forEach((milestone) => {
      console.log('-',milestone)
    })

    const historiesObj = await retrieveHistories(id)

    const histories = historiesObj.filter((session)=>session.religion == religion)

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
  console.log('\n\n')

  milestones.forEach(milestone => {
    switch (milestone) {
      case Object.keys(generalMDB)[0]: // The Meditator
        console.log('\nattempting to achieve THE MEDITATOR')
        updateMilestoneToTrue(Object.keys(generalMDB)[0], 'general') // meditate for the first time. set to True
        break;
  
      case Object.keys(generalMDB)[1]: // Spiritual Meditation Expert

        // retrieve all practices in an array for checking
        const allPractices = Object.keys(meditationReligionDB)

        // prepare histories of the user
        historiesObject.forEach(item => {
          console.log(item.practiceTitle)
        });

        // check if all practices are present in the session history
        const allPracticesPresent = allPractices.every((practice) =>
          historiesObject.some((session) => session.practiceTitle === practice)
        );

        if (allPracticesPresent == true) {
          updateMilestoneToTrue(Object.keys(generalMDB)[1], 'general')
        } else {
          console.log('!!',Object.keys(generalMDB)[1],'all practices are not present')
        }
        break;
  
      case Object.keys(generalMDB)[2]: // Spiritual Commitment
        const threshold = 50
        const streak = streakChecker(historiesObject, threshold)

        if (streak == threshold) {
          console.log('==='+Object.keys(generalMDB)[2]+' Qualified!===')
          updateMilestoneToTrue(Object.keys(generalMDB)[2], 'general')
        } else {
          console.log('!!',Object.keys(generalMDB)[2],'not yet achieved, you only meditated for', streak ,'day/s only')
        }
        break;
  
      default:
        console.log('no general milestones')
        break;
    }
  });
}

const milestoneChecker = (milestones, historiesObject, religion) => {
  switch (religion) {
    case 'Christianity':
      console.log('religion: Christianity')
      christianityMilestoneChecker(milestones, historiesObject)
      break;

    case 'Islam':
      islamMilestoneChecker(milestones, historiesObject)
      break;

    case 'Hinduism':
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
    switch (milestone) {
      case Object.keys(christianityMDB)[0]: // Scripture Master
        console.log(Object.keys(christianityMDB)[0])
        // presentChecker
        presentChecker(Object.keys(christianityMDB)[0],historiesObject)
        break;
  
      case Object.keys(christianityMDB)[1]: // Dual Deliberation
        console.log(Object.keys(christianityMDB)[1])

        const histories2 = historiesObject.filter((session)=>session.practiceTitle == 'Examen')
        // console.log(histories2)
        const threshold = 2
        const streak = streakChecker(histories2, threshold)

        if (streak >= threshold) {
          console.log('==='+Object.keys(christianityMDB)[1]+' Qualified!===')
          updateMilestoneToTrue(Object.keys(christianityMDB)[1], 'Christianity')
        } else {
          console.log('!!',Object.keys(christianityMDB)[1],'not yet achieved, you only meditated for', streak ,'day/s only')
        }
        break;
  
      case Object.keys(christianityMDB)[2]: // Rosary Devotee
        console.log(Object.keys(christianityMDB)[2])
        const histories3 = historiesObject.filter((session)=>session.practiceTitle == 'Rosary')

        histories3.forEach((session)=>{
          console.log(session.subPracticeTitle)
        })
        
        const mysteryTitles = []
        console.log()

        for (let index = 0; index < 7; index++) {
          let mysteryDetails = Object.entries(dayOfWeekMap)[index][1]
          console.log(mysteryDetails)
          let mysteryTitle = mysteryDetails.split(" ").slice(0,2).join(" ")
          console.log(mysteryTitle)
          mysteryTitles.push(mysteryTitle)
        }

        // check if all practices are present in the session history
        const allMysteriesPresent = mysteryTitles.every((mystery) =>
        histories3.some((session) => session.subPracticeTitle === mystery)
        );

        if (allMysteriesPresent == true) {
          updateMilestoneToTrue(Object.keys(christianityMDB)[2], 'Christianity')
        } else {
          console.log('!!',Object.keys(christianityMDB)[2],'not yet achieved, all mysteries are not present')
        }
        break;

      case Object.keys(christianityMDB)[3]: // Man of Scriptures
        console.log(Object.keys(christianityMDB)[3])

        const histories4 = historiesObject.filter((session)=>session.practiceTitle == 'Lectio Divina')
        const threshold4 = 31
        const streak4 = streakChecker(histories4, threshold4)

        if (streak4 >= threshold4) {
          console.log('==='+Object.keys(christianityMDB)[3]+' Qualified!===')
          updateMilestoneToTrue(Object.keys(christianityMDB)[3], 'Christianity')
        } else {
          console.log('!!',Object.keys(christianityMDB)[3],'not yet achieved, you only meditated for', streak4 ,'day/s only')
        }
        break;

      case Object.keys(christianityMDB)[4]: // Bible Meditation Expert
        console.log(Object.keys(christianityMDB)[4])
        const thresholdHours = 0.025
        const histories5 = historiesObject.filter((session)=>session.practiceTitle == 'Christian Meditation')
        const totalDuration = getTotalDurationByPractice(histories5)
        console.log('===totalDuration(seconds)===' + totalDuration)
        let totalDurationInHours = (totalDuration / 60 / 60)
        console.log('===totalDuration(hours)===' + totalDurationInHours)
        if (totalDurationInHours >= thresholdHours ){
          updateMilestoneToTrue(Object.keys(christianityMDB)[4], 'Christianity')
        } else {
          console.log('!!',Object.keys(christianityMDB)[4],'not yet achieved, you only meditated for', totalDurationInHours ,'hour/s only')
        }
        
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
        presentChecker(Object.keys(islamMDB)[0],historiesObject)
        break;
      
      case Object.keys(islamMDB)[1]: // Dhikr Devotee
        console.log(Object.keys(islamMDB)[1])
        break;
  
      case Object.keys(islamMDB)[2]: // Muraqaba Mastery
        console.log(Object.keys(islamMDB)[2])
        break;

      case Object.keys(islamMDB)[3]: // Taffakur Insight
        console.log(Object.keys(islamMDB)[3])
        let histories3 = historiesObject.filter((session)=>session.practiceTitle == 'Taffakur')
        let threshold3 = 5
        let streak3 = streakChecker(histories3, threshold3)

        if (streak3 >= threshold3) {
          console.log('==='+Object.keys(islamMDB)[3]+' Qualified!===')
          updateMilestoneToTrue(Object.keys(islamMDB)[3], 'Islam')
        } else {
          console.log('!!',Object.keys(islamMDB)[3],'not yet achieved, you only meditated for', streak3 ,'day/s only')
        }
        break;

      case Object.keys(islamMDB)[4]: // Sufi Breathing Prowess
        console.log(Object.keys(islamMDB)[4])
        // let histories4 = historiesObject.filter((session)=>session.practiceTitle == 'Taffakur')
        // let threshold4 = 30
        // let streak4 = streakChecker(histories4, threshold4)

        // if (streak4 >= threshold4) {
        //   console.log('==='+Object.keys(islamMDB)[4]+' Qualified!===')
        //   updateMilestoneToTrue(Object.keys(islamMDB)[4], 'Islam')
        // } else {
        //   console.log('!!',Object.keys(islamMDB)[4],'not yet achieved, you only meditated for', streak4 ,'day/s only')
        // }
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
      case Object.keys(hinduismMDB)[0]: // Enlightened Explorer
        console.log(Object.keys(hinduismMDB)[0])
        break;
  
      case Object.keys(hinduismMDB)[1]: // Hindu Hobbyist
        console.log(Object.keys(islamMDB)[1])
        break;
  
      case Object.keys(hinduismMDB)[2]: // Asana Apprentice  
        console.log(Object.keys(hinduismMDB)[2])
        break;

      case Object.keys(hinduismMDB)[3]: // Pose Prodigy 
        console.log(Object.keys(hinduismMDB)[3])
        break;

      case Object.keys(hinduismMDB)[4]: // Supreme Serenity 
        console.log(Object.keys(hinduismMDB)[4])
        break;

      case Object.keys(hinduismMDB)[5]: // Hathathon 
        console.log(Object.keys(hinduismMDB)[5])
        break;

      case Object.keys(hinduismMDB)[6]: // Prana Pinnacle 
        console.log(Object.keys(hinduismMDB)[6])
        break;

      case Object.keys(hinduismMDB)[7]: // Chakra Champion 
        console.log(Object.keys(hinduismMDB)[7])
        break;

      case Object.keys(hinduismMDB)[8]: // Heart Harmony 
        console.log(Object.keys(hinduismMDB)[8])
        break;

      case Object.keys(hinduismMDB)[9]: // Muladhara Marvel 
        console.log(Object.keys(hinduismMDB)[9])
        break;

      case Object.keys(hinduismMDB)[10]: // Transcendental Transcender 
        console.log(Object.keys(hinduismMDB)[10])
        break;

      case Object.keys(hinduismMDB)[11]: // Samadhi Seeker 
        console.log(Object.keys(hinduismMDB)[11])
        break;

      case Object.keys(hinduismMDB)[12]: // Synchronized Serenity 
        console.log(Object.keys(hinduismMDB)[12])
        break;

      default:
        console.log('no hinduism milestones')
        break;
    }
  });
}

const buddhismMilestoneChecker = (milestones, historiesObject) => {
  milestones.forEach(milestone => {
    console.log('var milestone: '+milestone)

    switch (milestone) {
      case Object.keys(buddhismMDB)[0]: // Way of the Buddha  
        console.log(Object.keys(buddhismMDB)[0])
        presentChecker(Object.keys(buddhismMDB)[0],historiesObject)
        break;
      
      case Object.keys(buddhismMDB)[1]: // 30 Minutes of Stillness  
        console.log(Object.keys(buddhismMDB)[1])
        let histories1 = historiesObject.filter((session)=>session.practiceTitle == 'Breath')
        let isAchieved1 = false
        histories1.forEach(session=>{session.duration >= 1800000 ? isAchieved1 = true : isAchieved1 = false})

        // get maximum duration of a breath meditation
        let maxDuration = 0
        histories1.forEach(session=>{session.duration >= maxDuration ? maxDuration = session.duration : maxDuration = maxDuration})
        maxDuration = (maxDuration / 1000)
        
        if (isAchieved1) {
          updateMilestoneToTrue(Object.keys(buddhismMDB)[1], 'Buddhism')
        } else {
          console.log('!!',Object.keys(buddhismMDB)[1],'not yet achieved, you only meditated for', maxDuration ,'second/s only')
        }
        break;

      case Object.keys(buddhismMDB)[2]: // Mindful Steps  
        console.log(Object.keys(buddhismMDB)[2])
        let histories2 = historiesObject.filter((session)=>session.practiceTitle == 'Walk')
        let isAchieved2 = false
        histories2.forEach(session=>{session.duration >= 1800000 ? isAchieved2 = true : isAchieved2 = false})

        // get maximum duration of a breath meditation
        let maxDuration2 = 0
        histories2.forEach(session=>{session.duration >= maxDuration2 ? maxDuration2 = session.duration : maxDuration2 = maxDuration2})
        maxDuration2 = (maxDuration2 / 1000)
        
        if (isAchieved2) {
          updateMilestoneToTrue(Object.keys(buddhismMDB)[2], 'Buddhism')
        } else {
          console.log('!!',Object.keys(buddhismMDB)[2],'not yet achieved, you only meditated for', maxDuration2 ,'second/s only')
        }
        break;

      case Object.keys(buddhismMDB)[3]: // Hundred Acts of Compassion  
        console.log(Object.keys(buddhismMDB)[3])
        let histories3 = historiesObject.filter((session)=>session.practiceTitle == 'Breath')
        let isAchieved3 = false
        histories3.forEach(session=>{session.duration >= 6000000 ? isAchieved3 = true : isAchieved3 = false})

        // get maximum duration of a breath meditation
        let maxDuration3 = 0
        histories3.forEach(session=>{session.duration >= maxDuration3 ? maxDuration3 = session.duration : maxDuration3 = maxDuration3})
        maxDuration3 = (maxDuration3 / 1000)
        
        if (isAchieved3) {
          updateMilestoneToTrue(Object.keys(buddhismMDB)[3], 'Buddhism')
        } else {
          console.log('!!',Object.keys(buddhismMDB)[3],'not yet achieved, you only meditated for', maxDuration3 ,'second/s only')
        }
        break;

      case Object.keys(buddhismMDB)[4]: // Month-long Body Scan Mastery  
        console.log(Object.keys(buddhismMDB)[4])
        let histories4 = historiesObject.filter((session)=>session.practiceTitle == 'Body Scan')
        let threshold4 = 30
        let streak4 = streakChecker(histories4, threshold4)

        if (streak4 >= threshold4) {
          console.log('==='+Object.keys(buddhismMDB)[4]+' Qualified!===')
          updateMilestoneToTrue(Object.keys(buddhismMDB)[4], 'Buddhism')
        } else {
          console.log('!!',Object.keys(buddhismMDB)[4],'not yet achieved, you only meditated for', streak4 ,'day/s only')
        }
        break;

      case Object.keys(buddhismMDB)[5]: // Boundless Heart  
        console.log(Object.keys(buddhismMDB)[5])
        let histories5 = historiesObject.filter((session)=>session.practiceTitle == 'Metta')
        let isAchieved5 = false
        histories5.forEach(session=>{session.duration >= 30000000 ? isAchieved5 = true : isAchieved5 = false})

        // get maximum duration of a breath meditation
        let maxDuration5 = 0
        histories5.forEach(session=>{session.duration >= maxDuration5 ? maxDuration5 = session.duration : maxDuration5 = maxDuration5})
        maxDuration5 = (maxDuration5 / 1000)
        
        if (isAchieved5) {
          updateMilestoneToTrue(Object.keys(buddhismMDB)[5], 'Buddhism')
        } else {
          console.log('!!',Object.keys(buddhismMDB)[5],'not yet achieved, you only meditated for', maxDuration5 ,'second/s only')
        }
        break;

      default:
        break;
    }
  })
}

const judaismMilestoneChecker = (milestones, historiesObject) => {
  milestones.forEach(milestone => {
    console.log('var milestone: '+milestone)

    switch (milestone) {
      case Object.keys(judaismMDB)[0]: // Ethical Living  
        console.log(Object.keys(judaismMDB)[0])
        presentChecker(Object.keys(judaismMDB)[0],historiesObject)
        break;

      case Object.keys(judaismMDB)[1]: // Mystical Reflector
        console.log(Object.keys(judaismMDB)[1])
        let histories1 = historiesObject.filter((session)=>session.practiceTitle == 'Kabbalistic/Chassidic')
        let threshold1 = 14
        let streak1 = streakChecker(histories1, threshold1)

        if (streak1 >= threshold1) {
          console.log('==='+Object.keys(judaismMDB)[1]+' Qualified!===')
          updateMilestoneToTrue(Object.keys(judaismMDB)[1], 'Buddhism')
        } else {
          console.log('!!',Object.keys(judaismMDB)[1],'not yet achieved, you only meditated for', streak1 ,'day/s only')
        }
        break;

      case Object.keys(judaismMDB)[2]: // Shema Contemplator
        console.log(Object.keys(judaismMDB)[2])
        let histories2 = historiesObject.filter((session)=>session.practiceTitle == 'Shema')
        let threshold2 = 14
        let streak2 = streakChecker(histories2, threshold2)

        if (streak2 >= threshold2) {
          console.log('==='+Object.keys(judaismMDB)[2]+' Qualified!===')
          updateMilestoneToTrue(Object.keys(judaismMDB)[2], 'Buddhism')
        } else {
          console.log('!!',Object.keys(judaismMDB)[2],'not yet achieved, you only meditated for', streak2 ,'day/s only')
        }
        break;

      case Object.keys(judaismMDB)[3]: // Hitbodedut Dedication
        console.log(Object.keys(judaismMDB)[3])
        let histories3 = historiesObject.filter((session)=>session.practiceTitle == 'Hitbodedut')
        let isAchieved3 = false
        histories3.forEach(session=>{session.duration >= 6000000 ? isAchieved3 = true : isAchieved3 = false})

        // get maximum duration of a breath meditation
        let maxDuration3 = 0
        histories3.forEach(session=>{session.duration >= maxDuration3 ? maxDuration3 = session.duration : maxDuration3 = maxDuration3})
        maxDuration3 = (maxDuration3 / 1000)
        
        if (isAchieved3) {
          updateMilestoneToTrue(Object.keys(judaismMDB)[3], 'Juddaism')
        } else {
          console.log('!!',Object.keys(judaismMDB)[3],'not yet achieved, you only meditated for', maxDuration3 ,'second/s only')
        }
        break;

      default:
        break;
    }
  })
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
    console.log(error);
    return false;
  }
}

const streakChecker = (historiesObject, threshold) => {
  let consecutiveDays = 1; // Start with 0 to count the first day of meditation
  let prevDate = null; // To keep track of the previous date
  let achieved = false; // Flag to indicate if milestone is achieved
  let maxCount = consecutiveDays

  for (let i = 0; i < historiesObject.length; i++) {
    // console.log('!)@*&#)%*@#$)!@*#&')
    const currentDate = new Date(historiesObject[i].currentDate);
    // console.log(historiesObject[i].currentDate)

    if (prevDate === null) {
      prevDate = currentDate;
      continue; // Skip the first iteration
    } else {
      // console.log(('currentDate:',currentDate,'vs prevDate:',prevDate)
      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const differenceInDays = Math.round((currentDate - prevDate) / oneDay);
      // console.log('prev date:',datetime.datetime.utcfromtimestamp(prevDate),'| current date:',datetime.datetime.utcfromtimestamp(currentDate) )
      // console.log('difference In Days:',differenceInDays)
      // console.log('difference In Days(round):', Math.round(differenceInDays))

      if (differenceInDays == 1) { // 1: increment
        consecutiveDays++;
        if (maxCount < consecutiveDays) {
          maxCount = consecutiveDays
        }
        if (consecutiveDays >= threshold) {
            achieved = true;
            return consecutiveDays
            // break;
        }
      } else if (differenceInDays >= 2) { // 2 to infinity: reset
          consecutiveDays = 1; // Reset count if difference in Days is more than or equal to 2
      } // 0: retain

      // console.log('consecutive days meditated count:',consecutiveDays)
      // console.log()
      prevDate = currentDate;
    }
  };
  
  return consecutiveDays
}

const presentChecker = (milestone, historiesObject) => {
  const religion = getReligionByMilestone(milestone)
  // console.log('\n===historiesObject===\n',historiesObject)
  const histories = historiesObject.filter((session)=>session.religion == religion)
  const allPractices = Object.keys(ChristianityDB)

  // check if all practices are present in the session history
  const allPracticesPresent = allPractices.every((practice) =>
    histories.some((session) => session.practiceTitle === practice)
  );

  if (allPracticesPresent == true) {
    updateMilestoneToTrue(milestone, religion)
  } else {
    console.log('!!',milestone,'not yet achieved. All practices are not present')
  }
}

const updateMilestoneToTrue = async (milestoneTitle, rel) => {
  let religion = rel.toLowerCase()
  const uid = auth.currentUser.uid; // Replace with the user's UID

  try {
    const milestoneRef = ref(getDatabase(), `milestones/${uid}/${religion}`);
    await update(milestoneRef, { [milestoneTitle]: true });
    console.log(`==============================\n${milestoneTitle} has been updated to TRUE.\n==============================`);
    return true; // Return true to indicate successful update
  } catch (error) {
    console.log(`Failed to update ${milestoneTitle}: ${error.message}`);
    return false; // Return false to indicate update failure
  }
};


export { createMileStonesForUser, getMilestoneStatus, updateMilestoneToTrue, checkAndUpdateMilestone, retrieveHistories, streakChecker}