/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material"

const AbsentRecapCard = ({ loading = false, language, data }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography>{language?.dlyAbsentRecap}</Typography>
                <Box sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', bgcolor: 'divider', my: 1, py: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography>{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : `${data?.assistant} ${language?.assistant}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography >{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : language?.absent}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', bgcolor: 'divider', my: 1, py: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography>{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : `${data?.calas}  ${language?.calas_s}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                            <Typography >{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : language?.absent}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default AbsentRecapCard