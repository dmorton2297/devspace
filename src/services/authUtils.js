import firebase from 'firebase';
import 'firebase/auth';

export const checkAuthenticated = async () => {
    const auth = await firebase.auth();
    return !(auth.currentUser === null || auth.currentUser === undefined);
};
