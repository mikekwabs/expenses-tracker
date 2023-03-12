import { addDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";
import { getDownloadURL } from "firebase/storage";


const RECEIPT_COLLECTION = "receipts";

//A function to add receipt
export async function addReceipt(uid,date,locationName,address,items,amount,imageBucket){
    addDoc(collection(db, RECEIPT_COLLECTION), {
        uid,date,locationName,address,items,amount,imageBucket
    });
}

//A function to query the most recent receipts
export async function getReceipts(uid) {
    const receipts = query(collection(db, RECEIPT_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));
    const querySnapshot = await getDocs(receipts);
    
  
    let allReceipts = [];

    for (const documentSnapshot of querySnapshot.docs) {
        const receipt = documentSnapshot.data();
        await allReceipts.push({
          ...receipt, 
          date: receipt['date'].toDate(), 
          id: documentSnapshot.id,
          imageUrl: await getDownloadURL(receipt['imageBucket']),
        });
      
    }

    return allReceipts;

}
    
