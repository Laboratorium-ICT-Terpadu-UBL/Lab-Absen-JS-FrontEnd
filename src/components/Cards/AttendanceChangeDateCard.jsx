/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Typography } from "@mui/material"
import MobileDPicker from "../DateAndTime/MobileDPicker"

const AttendanceChangeDateCard = ({ currDate, handleChangeDate, readOnly, language, title, disableFuture=true }) => {
    const { dateValue } = currDate
    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Typography>{title}</Typography>
                <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                    <MobileDPicker
                        dateValue={dateValue}
                        handleChangeDate={handleChangeDate}
                        disableFuture={disableFuture}
                        label={language?.changeDate}
                        readOnly={readOnly}
                    />
                </Box>

            </CardContent>
        </Card>
    )
}

export default AttendanceChangeDateCard