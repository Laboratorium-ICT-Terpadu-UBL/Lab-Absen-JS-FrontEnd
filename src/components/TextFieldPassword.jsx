import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, IconButton, TextField } from "@mui/material"
import { useState } from "react"

// eslint-disable-next-line react/prop-types
const TextFieldPassword = ({ onChange, value, name, readOnly, label, containerSx, variant = 'outlined', disabled = false, required = true }) => {
    const [viewPassword, setViewPassowrd] = useState(false)
    return (
        <Box sx={{ display: 'flex', position: 'relative', ...containerSx }}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <TextField
                    name={name}
                    onChange={onChange}
                    value={value} sx={{ my: 1 }}
                    label={label}
                    variant={variant}
                    required={required}
                    type={viewPassword ? 'text' : 'password'}
                    inputProps={{ readOnly: readOnly, style: { width: '90%' } }}
                    disabled={disabled}
                />
            </Box>
            <IconButton sx={{ position: 'absolute', right: 0, display: 'inline-block', top: '50%', transform: 'translate(0%, -50%)' }} onClick={() => setViewPassowrd(!viewPassword)}>
                {viewPassword ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)}
            </IconButton>
        </Box>
    )
}

export default TextFieldPassword