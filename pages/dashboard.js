import Navbar from "@/components/Navbar";
import {useEffect, useState} from"react";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Head from "next/head";
import { Container, Snackbar, Alert, Typography,Stack, IconButton, Dialog, DialogContent, DialogActions, Button, snackbarClasses } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExpenseDialog from "@/components/ExpenseDialog";
import styles from "@/styles/dashboard.module.scss"

//define message information onEvents
const ADD_SUCCESS = "Receipt was successfully added!";
const ADD_ERROR = "Receipt was not successfully added!";
const EDIT_SUCCESS = "Receipt was successfully updated!";
const EDIT_ERROR = "Receipt was not successfully updated!"
const DELETE_SUCCESS = "Receipt has been deleted successfully";
const DELETE_ERROR = "Receipt could not be deleted!";

//Create a constant enum for different states of receipts
export const RECEIPT_ENUM = Object.freeze({
    none:0,
    add: 1,
    edit: 2,
    delete: 3,
})

//mapping receipt object to both success and error states.
const SUCCESS_MAP = {
    [RECEIPT_ENUM.add]: ADD_SUCCESS,
    [RECEIPT_ENUM.edit]: EDIT_SUCCESS,
    [RECEIPT_ENUM.delete]: DELETE_SUCCESS
}

const ERROR_MAP = {
    [RECEIPT_ENUM.add]: ADD_ERROR,
    [RECEIPT_ENUM.edit]: EDIT_ERROR,
    [RECEIPT_ENUM.delete]: DELETE_ERROR
}


export default function Dashboard(){

    const {authUser, isLoading} = useAuth();
    const router = useRouter();
    const [action, setAction] = useState();


    //Different states for loading, setting,deleting and updating receipts
    const [isLoadingReceipts, setIsLoadingReceipts] = useState(true);
    const [deleteReceiptId, setDeleteReceiptId] = useState("");
    const [deleteReceiptImageBucket, setDeleteReceiptImageBucket] = useState("");
    const [updateReceipt, setUpdateReceipt] = useState({});

    //snackbar states
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false)

    

    //All onClick events: set the specific action and receipt event
    //on clicking to add expense
    function onClickAdd(){
        setAction(RECEIPT_ENUM.add);
        setUpdateReceipt({})

    }

    function onUpdate(receipt){
        setAction(RECEIPT_ENUM.edit);
        setUpdateReceipt(receipt)

    }

    function onClickDelete(){

    }
    
    //When user aborts the operation to delete a receipt
    function resetDelete(){
        setAction(RECEIPT_ENUM.none),
        setDeleteReceiptId("");
        
    }



    return(

        <div>
            <Head>
                <title>Expense Tracker</title>
            </Head>
            {/* render navbar component */}
            <Navbar/>

            <Container>
                {/* onSuccess toast */}
                <Snackbar open={showSuccessSnackbar} autoHideDuration={2000} onClose={() => setShowSuccessSnackbar(false)} anchorOrigin={{horizontal: "center", vertical:"top"}}>
                    <Alert onClose={() => {setShowSuccessSnackbar(false)}} severity="success">{snackbarMessage}</Alert>
                </Snackbar>
                
                {/* onError toast */}
                <Snackbar open={setShowErrorSnackbar} autoHideDuration={2000} onClose={ () => setShowSuccessSnackbar(false)} anchorOrigin={{horizontal: "center", vertical:"top"}}>
                    <Alert onClose={() => setShowErrorSnackbar(false)} severity="error"> {snackbarMessage}</Alert>
                </Snackbar>
                
                {/* Simple stack after navbar */}
                <Stack direction="row" sx={{paddingTop: "1.5em"}}>
                    <Typography variant="h4" sx={{lineHeight: 2, paddingRight: "0.5em"}}> EXPENSES</Typography>
                    <IconButton aria-label="edit" color="secondary" onClick={onClickAdd} className={styles.addButton}> <AddIcon/> </IconButton>
                </Stack>
            </Container>

            
            <ExpenseDialog 
            
            edit={updateReceipt} 
            showDialog={action == RECEIPT_ENUM.add || action == RECEIPT_ENUM.edit}
            onError={(receiptEnum) => onResult(receiptEnum, false)}
            onSuccess={(receiptEnum) => onResult(receiptEnum,true)}
            onCloseDialog={() => setAction(RECEIPT_ENUM.none)}>

            </ExpenseDialog>

            <Dialog open={action === RECEIPT_ENUM.delete} onClose={resetDelete}>
                    <Typography variant="h4" className={styles.title}> DELETE EXPENSE</Typography>
                    <DialogContent>
                        <Alert>This will permanently delete your receipt!</Alert>
                    </DialogContent>
                    <DialogActions sx={{padding:"0 24px 24px"}}>
                        <Button color="secondary" variant="outlined" onClick={resetDelete}> Cancel</Button>
                        <Button color="secondary" variant="contained" autofocus>  Delete</Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}