import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
// import moment from "moment"

// eslint-disable-next-line react/prop-types
const StaticTPicker = ({ value, onChange, readOnly=false }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
            <StaticTimePicker
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                localeText={{ timePickerToolbarTitle: "" }}
                slotProps={{
                    actionBar: { actions: null },
                    previousIconButton: {
                        sx: { display: 'none' }
                    },
                    nextIconButton: {
                        sx: { display: 'none' }
                    }
                }}
                ampm={false}
                onChange={onChange}
                value={value}
                readOnly={readOnly}
            />
        </LocalizationProvider>
    )
}

export default StaticTPicker