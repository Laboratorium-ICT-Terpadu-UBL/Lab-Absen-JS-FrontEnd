import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"

// eslint-disable-next-line react/prop-types
const DesktopDPicker = ({ label, disableFuture = false, handleChangeDate, dateValue, maxDate, required = false, readOnly = false }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                label={label}
                format="DD/MM/YYYY"
                disableFuture={disableFuture}
                onChange={handleChangeDate}
                value={dateValue}
                maxDate={maxDate}
                slotProps={{
                    textField: {
                        required: required
                    }
                }}
                readOnly={readOnly}
            />
        </LocalizationProvider>
    )
}
export default DesktopDPicker