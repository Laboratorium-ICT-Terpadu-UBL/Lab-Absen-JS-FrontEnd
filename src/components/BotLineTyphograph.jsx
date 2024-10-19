import { Box, Typography } from "@mui/material"

// eslint-disable-next-line react/prop-types
const BotLineTyphograph = ({ label, text, variant = 'h6' }) => {
    return (
        <Box sx={{ borderBottom: 'solid', borderBottomWidth: 'thin', borderBottomColor:'text.primary', my: 2, mx: 1 }}>
            <Typography color='text.secondary' variant="subtitle2">{label}</Typography>
            <Typography color='text.primary' variant={variant} sx={{ px: 1 }}>{text}</Typography>
        </Box>
    )
}

export default BotLineTyphograph