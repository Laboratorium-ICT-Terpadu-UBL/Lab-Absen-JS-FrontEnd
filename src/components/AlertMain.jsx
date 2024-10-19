import { Alert, AlertTitle, Snackbar } from "@mui/material"

// eslint-disable-next-line react/prop-types
const AlertMain = ({ alertLabel, content, severity, onClose, open, anchorPosition }) => {

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            anchorOrigin={anchorPosition}
            sx={{minWidth:300}}
        >
            <Alert
                severity={severity}
                onClose={onClose}
                sx={{width:'100%'}}
            >
                <AlertTitle>{alertLabel}</AlertTitle>
                {content}
            </Alert>
        </Snackbar>
    )
}

export default AlertMain