import { useState, useEffect } from "react";
import styles from "@/styles/expenseDialog.module.scss";
import { Dialog, DialogContent, Typography, Stack, Avatar, Button, TextField, DialogActions } from "@mui/material";
import { DatePicker } from "@mui/lab/DatePicker";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';



const DEFAULT_FILE_NAME = "No file selected";

//basic featured of the dialog  box
const DEFAULT_FORM_STATE = {
    fileName: DEFAULT_FILE_NAME,
    file: null,
    date: null,
    locationName:"",
    address: "",
    items: "",
    amount: "",
}

//A dialog to enter receipt information
//props:
// - edit: the receipt to edit
// - showDialog: boolean for whether to show the dialog
// - onSuccess: notifies on successful operation
// - onError:  notifies on uncompleted operation.
// - onCloseDialog: closes the dialog

export default function ExpenseDialog(props){
    //we store the receipts in our object, hence we check to see if its not empty
    //before retrieving the receipts
    const isEdit = Object.keys(props.edit).length > 0;
    const [formFields, setFormFields] = useState(isEdit ? props.edit : DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //Reset the form fields if receipt dialog closes or whether to close or open dialog state changes
    useEffect( () =>{
        //if the dialog is opened (whether for add or edit), retrieve previous receipt data if any
        
        if (props.showDialog){
            setFormFields(isEdit ? props.edit : DEFAULT_FORM_STATE);
        }
    },[props.edit, props.showDialog])

    //Check whether any of the form fields are unedited
    const isNotEdited = () => formFields.fileName === DEFAULT_FILE_NAME || !formFields.date || formFields.locationName.length === 0 
    || formFields.address.length === 0 || formFields.items.length === 0 || formFields.amount.length === 0;

   // Update given field in the form
   const updateFormField = (event, field) => {
    setFormFields(prevState => ({...prevState, [field]: event.target.value}))
  }

    //Set the relevant fields for receipt image
    const setFileData = (target) => {
        const file = target.files[0];
        setFormFields(prevState => ({...prevState, fileName: file.name}));
        setFormFields(prevState => ({...prevState, file}));
    }
    

    //close dialog
    function closeDialog(){
        setIsSubmitting(false);
        props.onCloseDialog(); 
    }





    return(
        <Dialog classes={{paper: styles.dialog}} onClose={() => closeDialog()} open={props.showDialog} component="form">
            <Typography variant="h4" className={styles.title}> {isEdit ? "EDIT" : "ADD"}</Typography>

            {/* Content of the dialog */}
            <DialogContent className={styles.fields}>
                <Stack direction="row" spacing={2} className={styles.receiptImage}>
            {(isEdit && !formFields.fileName) && <Avatar alt="receipt image" src={formFields.imageUrl} sx={{ marginRight: '1em' }}/> }

            {/* Upload a receipt */}
            <Button variant="outlined" component="label" color="secondary">
                Upload Receipt
                <input type="file" hidden onInput={(event) => {setFileData(event.target)}} />
            </Button>
                <Typography>{formFields.fileName}</Typography>
            </Stack>

            <Stack>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker  label="Date" value={formFields.date} onChange={ (newDate) => {
                        setFormFields(prevState => ({...prevState, date: newDate}))
                    }}
                    maxDate={new Date()}
                    renderInput={(params) => <TextField color="tertiary" {...params}/>}/>
                </LocalizationProvider>
            </Stack>

            <TextField color="tertiary" label="Location name" variant="standard" value={formFields.locationName} onChange={(event) => updateFormField(event, 'locationName')}/>
            <TextField color="tertiary" label="Location address" variant="standard" value={formFields.address} onChange={(event) => updateFormField(event, "address")} />
            <TextField color="tertiary" label="Items" variant="standard" value={formFields.items} onChange={(event) => updateFormField(event, 'items')} />
            <TextField color="tertiary" label="Amount" variant="standard" value={formFields.amount} onChange={(event) => updateFormField(event, 'amount')}  />
            </DialogContent>

            <DialogActions>
                {isSubmitting ? <Button color="secondary" variant="contained" disabled={true}> Submitting...</Button> : <Button color="secondary" variant="contained" disabled={isDisabled}>Submit</Button>}
            </DialogActions>

        </Dialog>
    )
}