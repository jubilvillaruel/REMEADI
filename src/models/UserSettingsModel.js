import { getDatabase, ref, update } from 'firebase/database';
import { auth } from '../../firebase';

const updateFaithFocused = async (faithFocused) => {
    const faithFocusedRef = ref(getDatabase(), 'users/'+auth.currentUser.uid);
    try {
        await update(faithFocusedRef, { ["faithFocused"]: faithFocused });    
    } catch (error) {
        console.log(error.message)
        console.log(error.stack)
    }
};

export default updateFaithFocused;