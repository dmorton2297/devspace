import firebase from 'firebase/app';
import 'firebase/storage';
import { v4 } from 'uuid';


export const uploadImage = async (file, userId) => {
    const id = v4();
    const storageRef = firebase.storage().ref();
    const imageBucketRef = storageRef.child(`${userId}/${id}.png`);
    await imageBucketRef.put(file);
    const url = await imageBucketRef.getDownloadURL()
    return { url, id };
}

export const removeImage = async (userId, fileId) => {
    const storageRef = firebase.storage().ref();
    const imageBucketRef = storageRef.child(`${userId}/${fileId}.png`);
    const deletedImage = await imageBucketRef.delete();
    return deletedImage;
}