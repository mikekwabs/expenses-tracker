import { addDoc, collection, query,where, orderBy, onSnapshot,setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import {getDownloadURL } from "./storage";


const RECEIPT_COLLECTION = "receipts";

//A function to add receipt
export function addReceipt(uid,date,locationName,address,items,amount,imageBucket){
    addDoc(collection(db, RECEIPT_COLLECTION), {
        uid,date,locationName,address,items,amount,imageBucket
    });
}

//A function to query the most recent receipts
export async function getReceipts(uid, setReceipts, setIsLoadingReceipts) {
    const receiptsQuery = query(collection(db, RECEIPT_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));
      
    const unsubscribe = onSnapshot(receiptsQuery, async (snapshot) => {
      let allReceipts = [];
      for (const documentSnapshot of snapshot.docs) {
        const receipt = documentSnapshot.data();
        allReceipts.push({
          ...receipt, 
          date: receipt['date'].toDate(), 
          id: documentSnapshot.id,
          imageUrl: await getDownloadURL(receipt['imageBucket']),
        });
      }
      setReceipts(allReceipts);
      setIsLoadingReceipts(false);
    })
    return unsubscribe;
  }


  //update receipt information
export function updateReceipt(docId,uid,date,locationName,address,items,amount,imageBucket){
    setDoc(doc(db, RECEIPT_COLLECTION, docId), {
        uid,date,locationName,address,items,amount,imageBucket})
}

//delete the receipt information from cloud storage
export function deleteReceipt(id){
    deleteDoc(doc(db,RECEIPT_COLLECTION, id))
}