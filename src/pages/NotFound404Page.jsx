import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { enLang, idLang } from "../utilities/LanguageTextConfig"

const NotFound404Page = () => {
    const { isEnLang } = useSelector(state => state.languages)
    const language = isEnLang ? enLang : idLang

    const splitWords = language?.pageNotFound.split(" ")

    return (
        <Box sx={{ minHeight: { xs: '95vh', md: '91.5vh' }, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ m: 2, display: 'flex', width: '100%', height: '100%', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Typography variant="h1" color='text.primary'>404</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, width: '100%', height: '100%', alignItems: { xs: 'center', md: 'flex-start' } }}>
                {splitWords.map((item, index) => (
                    <Typography variant="h2" key={index} color='text.primary'>{item}</Typography>
                ))}
            </Box>
        </Box>
    )
}

export default NotFound404Page