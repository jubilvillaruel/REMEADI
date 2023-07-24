import { push, set, child, getDatabase, update, ref } from "firebase/database";
import { buddhismMDB, christianityMDB, hinduismMDB, islamMDB, judaismMDB } from "../Data/MilestonesDB"

const createMileStonesForUser = (uid) => {
    // get database reference
    const realtimeDB = getDatabase()
    const chRef = ref(realtimeDB, 'milestones/' + uid + '/christianity')
    const isRef = ref(realtimeDB, 'milestones/' + uid + '/islam')
    const hiRef = ref(realtimeDB, 'milestones/' + uid + '/hinduism')
    const buRef = ref(realtimeDB, 'milestones/' + uid + '/buddhism')
    const juRef = ref(realtimeDB, 'milestones/' + uid + '/judaism')

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

export { createMileStonesForUser }