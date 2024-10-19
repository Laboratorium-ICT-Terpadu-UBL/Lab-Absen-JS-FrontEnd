/* eslint-disable react/prop-types */
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import DRangePicker from "../DateAndTime/DRangePicker"


const ExportRenderModal = ({ handleDateRange, handleRadio, modalSeter, language }) => {
    const { dateRangeVal, handleDateRangeChange } = handleDateRange
    const { radioReportVal, setRadioReportVal } = handleRadio
    return (
        <>
            <Box sx={{ my: 2 }}>
                <DRangePicker
                    label={[language?.startTime, language?.endTime]}
                    dateValue={dateRangeVal}
                    handleDateChange={handleDateRangeChange}
                    midDivider={<Typography color='text.primary'>{language?.to}</Typography>}
                    disableFuture={true}
                    required={true}
                />
            </Box>
            <FormControl sx={{ my: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FormLabel id='radio-buttons-group-label'>{language?.selReport }</FormLabel>
                <RadioGroup
                    row
                    name="gender"
                    aria-labelledby="radio-buttons-group-label"
                    value={radioReportVal}
                    onChange={(event) => setRadioReportVal(event.target.value)}
                    defaultValue='semua'>
                    <FormControlLabel componentsProps={{ typography: { color: 'text.secondary' } }} value="all" control={<Radio />} label={language?.all} required />
                    <FormControlLabel componentsProps={{ typography: { color: 'text.secondary' } }} value="Asisten" control={<Radio />} label={language?.assistant} required />
                    <FormControlLabel componentsProps={{ typography: { color: 'text.secondary' } }} value="Calon Asisten" control={<Radio />} label={language?.calas_l} required />
                </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <Button variant="contained" sx={{ m: 1 }} onClick={() => modalSeter(false)}>{ language?.cancel}</Button>
                <Button variant="contained" sx={{ m: 1 }} type="submit">{language?.print}</Button>
            </Box>
        </>
    )
}

export default ExportRenderModal