/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, TextField } from "@mui/material"
import TextFieldPassword from "../TextFieldPassword"

const LoginRenderModal = ({ value, setInputValue, handleLogin, language, buttonLoading=false }) => {
    const handleInputChange = (event) => {
        setInputValue(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleInputNumber = (event) => {
        const cleanedValue = event.target.value.replace(/[^0-9.]/, '');
        handleInputChange({ target: { name: event.target.name, value: cleanedValue } })
    }
    return (
        <Box sx={{ minWidth: 400, display: 'flex', flexDirection: 'column', my: 2 }} component={'form'} onSubmit={handleLogin}>
            <TextField
                sx={{ m: 1 }}
                label='NIM'
                name="user"
                value={value.user}
                onChange={handleInputNumber}
                required
            />
            <TextFieldPassword
                label={language?.password}
                name='password'
                containerSx={{ m: 1 }}
                value={value.password}
                onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
                <Button type="submit" sx={{ p: 1 }} disabled={buttonLoading} variant="contained">
                    {buttonLoading ? (
                        <CircularProgress color="inherit" size={30} />
                    ) : (
                       "Login"
                    )}

                </Button>
            </Box>
        </Box>
    )
}

export default LoginRenderModal