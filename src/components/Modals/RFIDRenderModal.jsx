/* eslint-disable react/prop-types */
import { Box, Button, Card, CardContent, TextField } from "@mui/material"
import { useEffect } from "react"

const RFIDRenderModal = ({ language, purpose, handleSave, handleEdit, inputForm, setInputForm }) => {

    const handleInputChange = (event) => {
        setInputForm(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    useEffect(() => {
        if (purpose === "add") {
            setInputForm({
                name: '',
                no_serial: ''
            })
        }
    }, [purpose, setInputForm])
    return (
        <Card sx={{ m: 2, minWidth: 300, }}>
            <CardContent sx={{ flexDirection: 'column', display: 'flex' }} component={'form'} onSubmit={(e) => purpose === "edit" ? handleEdit(e) : handleSave(e)}>
                <TextField sx={{ my: 2 }} value={inputForm?.no_serial} name="no_serial" onChange={(e)=>handleInputChange(e)} label="UID" required inputProps={{ readOnly: purpose === "edit" ? true : false }} />
                <TextField sx={{ my: 2 }} value={inputForm?.name} name="name" onChange={(e)=>handleInputChange(e)} label={language?.name} required />
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <Button type="submit" variant="contained">{purpose === "edit" ? language?.edit : language?.save}</Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default RFIDRenderModal