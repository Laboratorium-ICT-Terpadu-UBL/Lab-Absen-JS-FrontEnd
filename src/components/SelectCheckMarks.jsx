import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

// eslint-disable-next-line react/prop-types
const SelectCheckMarks = ({ label, sx, data = [], dataPathValue, dataPathLabel, personName = [], setPersonName, required = false, readOnly = false }) => {

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={sx}>
                <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    required={required}
                    readOnly={readOnly}
                >
                    {data.map((name, index) => (
                        <MenuItem key={index} value={dataPathValue(name)}>
                            <Checkbox checked={personName?.indexOf(dataPathValue(name)) > -1} />
                            <ListItemText primary={dataPathLabel(name)} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectCheckMarks