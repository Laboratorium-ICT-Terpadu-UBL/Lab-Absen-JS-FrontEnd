/* eslint-disable react/prop-types */
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Card, CardContent, IconButton, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import BotLineTyphograph from "../BotLineTyphograph"
import { useState } from "react"

const RFIDCard = ({ uid = '', dateRegis = '', deName = '', handleEdit, handleDelete, modeVal, handleModeChange, isDark, language }) => {
    const [mode, setMode] = useState(modeVal)

    const handleModeValChange = (event, value) => {
        handleModeChange(value, uid)
        setMode(value)
    }

    const darkmodeSet = isDark && {
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid'
    }
    return (
        <Card sx={{ m: 2, minWidth: 300, ...darkmodeSet }}>
            <CardContent sx={{ position: 'relative' }}>
                <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <IconButton onClick={() => handleEdit(uid)}>
                        <FontAwesomeIcon size="xs" icon={faPenToSquare} color="yellow" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(uid)}>
                        <FontAwesomeIcon size="xs" icon={faTrash} color="red" />
                    </IconButton>
                </Box>
                <Typography>{deName}</Typography>
                <Box>
                    <BotLineTyphograph
                        label='UID'
                        text={uid}
                        variant="subtitle1"
                    />
                    <BotLineTyphograph
                        label={language?.regisDate}
                        text={dateRegis}
                        variant="subtitle1"
                    />
                    <ToggleButtonGroup sx={{ display: 'flex', justifyContent: 'center' }}
                        value={mode}
                        onChange={handleModeValChange}
                        exclusive
                    >
                        <ToggleButton value='1'>
                            <Typography>
                                Enroll
                            </Typography>
                        </ToggleButton>
                        <ToggleButton value='0'>
                            <Typography>
                                Attend
                            </Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </CardContent>
        </Card>
    )
}

export default RFIDCard