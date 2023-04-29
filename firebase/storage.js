//Cloud Storage for Firebase is built for app developers who need to store and serve user-generated content, such as photos or videos.

import { format } from "date-fns";
import { ref, uploadBytes, getDownloadURL as getStorageDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

//Create a bucket URL to store files(receipt images)
const BUCKET_URL = "gs://expense-trac-60ff5.appspot.com";


export async function uploadImage(image, uid){
    //format date
    const formattedDate = format(new Date(), "yyyy-MM-dd-'T'HH:mm:ss'Z'");
    //the bucket data
    const bucketData = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;

    //Create a storage reference in order to make uploads
    const storageRef = ref(storage, bucketData);
    await uploadBytes(storageRef, image);

    return bucketData;

}


//obtain a download url
export async function getDownloadURL(bucket){
    return await getStorageDownloadURL(ref(storage, bucket));
}


//update an image
export async function replaceImage(image, bucket){
    await uploadBytes(ref(storage, bucket), image);
}

//delete image
export function deleteImage(bucket){
    deleteObject(ref(storage,bucket));
}