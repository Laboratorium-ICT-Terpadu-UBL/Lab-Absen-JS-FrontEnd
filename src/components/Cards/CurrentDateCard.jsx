/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material"
import { useEffect, useState } from "react"

const CurrentDateCard = ({ serverDate, language }) => {


    const [formatedTime, setFormatedTime] = useState({
        secondsFormated: serverDate.getSeconds() < 10 ? `0${serverDate.getSeconds()}` : serverDate.getSeconds(),
        minutesFormated: serverDate.getMinutes() < 10 ? `0${serverDate.getMinutes()}` : serverDate.getMinutes(),
        hoursFormated: serverDate.getHours() < 10 ? `0${serverDate.getHours()}` : serverDate.getHours(),
        daysFormated: serverDate.getDate() < 10 ? `0${serverDate.getDate()}` : serverDate.getDate(),
        monthsFormated: serverDate.getMonth() + 1 < 10 ? `0${serverDate.getMonth()}` : serverDate.getMonth(),
        yearsFormated: serverDate.getFullYear()
    })

    useEffect(() => {
        setFormatedTime({
            secondsFormated: serverDate.getSeconds() < 10 ? `0${serverDate.getSeconds()}` : serverDate.getSeconds(),
            minutesFormated: serverDate.getMinutes() < 10 ? `0${serverDate.getMinutes()}` : serverDate.getMinutes(),
            hoursFormated: serverDate.getHours() < 10 ? `0${serverDate.getHours()}` : serverDate.getHours(),
            daysFormated: serverDate.getDate() < 10 ? `0${serverDate.getDate()}` : serverDate.getDate(),
            monthsFormated: serverDate.getMonth() + 1 < 10 ? `0${serverDate.getMonth()}` : serverDate.getMonth(),
            yearsFormated: serverDate.getFullYear()
        })
    }, [serverDate])

    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Typography>{language?.dateNow}</Typography>
                <Box sx={{ my: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="h4">
                        {serverDate ? `${formatedTime.hoursFormated}:${formatedTime.minutesFormated}:${formatedTime.secondsFormated}` : <Skeleton sx={{ minWidth: 200 }} />}
                    </Typography>
                    <Typography>
                        {serverDate ? `${formatedTime.daysFormated}/${formatedTime.monthsFormated}/${formatedTime.yearsFormated}` : <Skeleton sx={{ minWidth: 100 }} />}
                    </Typography>
                </Box>

            </CardContent>
        </Card>
    )
}

export default CurrentDateCard