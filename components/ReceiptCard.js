import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from "@/styles/receiptCard.module.scss";



//A function to display the receipt together with its information.
export default function ReceiptCard(props){
    const receipt = props.receipt;
    console.log(receipt);

    return(
        <div>
            <Stack direction="row" justifyContent="space-between" sx={{ margin: "1em 0" }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <Avatar alt="receipt image" src={receipt.imageUrl} />
                    <Stack direction="row" className={styles.contentRow}>
                        <Stack direction="column" sx={{ flexGrow: 1 }}>
                            <Typography variant="h3">
                                {format(receipt.date, 'MM/dd/yyyy')}
                            </Typography> 
                            <Typography variant="h4">
                                ₵{receipt.amount}
                            </Typography>
                        </Stack>
                        <Stack direction="column" sx={{ flexGrow: 1 }}>
                            <Typography variant="h5">
                                {receipt.locationName} ({receipt.address})
                            </Typography>
                            <Typography variant="h5">
                                {receipt.items}
                            </Typography>                
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction="row" className={styles.actions}>
                    <IconButton aria-label="edit" color="secondary" onClick={props.onEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={props.onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </div>
    )
}