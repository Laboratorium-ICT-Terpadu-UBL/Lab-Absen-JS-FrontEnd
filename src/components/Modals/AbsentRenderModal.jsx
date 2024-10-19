/* eslint-disable react/prop-types */
import { Box, Button, TextField } from "@mui/material"
import SelectCheckMarks from "../SelectCheckMarks"
import DRangePicker from "../DateAndTime/DRangePicker"

const AbsentRenderModal = ({ handleModalSave, handleModalEdit, handleModalCancel, language, data, personName, setPersonName, handleDateRange, handleInfo, editMode=false }) => {
    const { dateRangeVal, handleDateRangeChange } = handleDateRange
    const { leaveInfo, setLeaveInfo } = handleInfo


    return (
        <Box sx={{ minWidth: { xs: 'auto', md: 800 }, m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }} component={'form'} onSubmit={(e)=>editMode? handleModalEdit(e): handleModalSave(e)}>
            <Box sx={{ width: '100%', m: 1 }}>
                <SelectCheckMarks
                    label={language?.chooseAssistant}
                    sx={{ width: '100%', m: 2 }}
                    data={data}
                    dataPathLabel={(data) => data?.nama}
                    dataPathValue={(data) => data?.nim}
                    personName={personName}
                    setPersonName={setPersonName}
                    required={true}
                    readOnly={editMode}
                />
            </Box>
            <DRangePicker
                handleDateChange={handleDateRangeChange}
                label={[language?.startTime, `${language?.endTime} (Optional)`]}
                required1={true}
                dateValue={dateRangeVal}
                readOnly={editMode}
            />
            <Box sx={{ m: 1, width: '100%' }}>
                <TextField
                    value={leaveInfo}
                    onChange={(e)=>setLeaveInfo(e.target.value)}
                    multiline
                    maxRows={3}
                    label={language?.info}
                    sx={{ width: '100%' }}
                    required
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ m: 1 }} onClick={handleModalCancel} variant="contained">{language?.cancel}</Button>
                <Button sx={{ m: 1 }} type="submit" variant="contained">Ok</Button>
            </Box>
        </Box>
    )
}

export default AbsentRenderModal