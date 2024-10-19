/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material"
import SelectCheckMarks from "../SelectCheckMarks"
import StaticTPicker from "../DateAndTime/StaticTPicker"
import BotLineTyphograph from "../BotLineTyphograph"

const AttendanceRenderModal = ({ onCancle, onAccept, onTimeChange, timeValue, homeward = false, language, data, personName, setPersonName, handlePut }) => {
    const renderHomeward = (nim, name) => {
        return (
            <Box sx={{ width: 400 }}>
                <BotLineTyphograph label='NIM' text={nim} />
                <BotLineTyphograph label={language?.name} text={name} />
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: 'center' }} component={'form'} onSubmit={(e) => homeward ? handlePut([data?.nim], e, false) : onAccept(e)}>
            <Box sx={{ m: 2 }}>
                <StaticTPicker
                    onChange={onTimeChange}
                    value={timeValue}
                    readOnly={!homeward}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', m: 2 }}>
                {homeward ? renderHomeward(data?.nim, data.nama) : (
                    <SelectCheckMarks
                        label={language?.chooseAssistant}
                        sx={{ width: 400, m: 2 }}
                        data={data}
                        dataPathLabel={(data) => data?.nama}
                        dataPathValue={(data) => data?.nim}
                        personName={personName}
                        setPersonName={setPersonName}
                        required={true}
                    />)}
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <Button sx={{ mx: 2 }} onClick={onCancle} variant="contained">{language?.cancel}</Button>
                    <Button sx={{ mx: 2 }} type="submit" variant="contained">OK</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AttendanceRenderModal