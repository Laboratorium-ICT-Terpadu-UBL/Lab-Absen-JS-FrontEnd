/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Divider, Skeleton, Typography } from "@mui/material"

// eslint-disable-next-line react/prop-types
const AttendanceRecapCard = ({ loading = false, label, language, data }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography>{language?.dlyAtdRecap}</Typography>
                <Box sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', bgcolor: 'divider', my: 1, py: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography>{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : `${data?.present} ${label}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography >{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : language?.present}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', bgcolor: 'divider', my: 1, py: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography>{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : `${data?.notpresent} ${label}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography >{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : language?.notpresent}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', bgcolor: 'divider', my: 1, py: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography>{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : `${data?.onTime} ${label}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography>{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : language?.onTime}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', bgcolor: 'divider', my: 1, py: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography>{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : `${data?.late} ${label}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography>{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : language?.late}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default AttendanceRecapCard