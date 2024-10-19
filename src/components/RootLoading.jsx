import { Box, CircularProgress } from "@mui/material"

// eslint-disable-next-line react/prop-types
const RootLoading = ({ minHeight = 300, size = 80 }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: minHeight }}>
            <CircularProgress size={size} />
        </Box>
    )
}

export default RootLoading