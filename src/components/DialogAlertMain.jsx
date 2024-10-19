import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

// eslint-disable-next-line react/prop-types
const DialogAlertMain = ({ open, onClose, handleCancle, handleAccept, dialogLabel, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {dialogLabel}
            </DialogTitle>
            <DialogContent
                sx={{ minWidth: 400 }}
            >
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancle}>Batal</Button>
                <Button onClick={handleAccept} autoFocus>
                   Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAlertMain