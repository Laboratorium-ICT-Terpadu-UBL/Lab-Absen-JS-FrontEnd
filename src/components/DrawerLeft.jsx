/* eslint-disable react/prop-types */
import { faCalendarCheck, faCalendarMinus, faCubes, faLanguage, faMoon, faQrcode, faRightFromBracket, faSun, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Box, Container, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { themeAction } from "../stores/themeState"
import imagePatternB from "../assets/imagePaternB.jpg"
import imagePatternW from "../assets/imagePaternW.png"
import { enLang, idLang } from "../utilities/languageTextConfig"
import { langAction } from "../stores/langState"
import { useNavigate } from "react-router-dom"



const DrawerLeft = ({ drawerStates, setDialogOpen }) => {
    const { drawerState = false, toggleDrawer } = drawerStates
    const dispatch = useDispatch()
    const { isDarkMode } = useSelector(state => state.themes)
    const { isEnLang } = useSelector(state => state.languages)
    const language = isEnLang ? enLang : idLang
    const { isAuthenticated, payload } = useSelector(state => state.auths)
    const navigate = useNavigate()

    const pages = [
        {
            name: language.home,
            icon: faCubes,
            link: '/home',
            private: !isAuthenticated
        },
        {
            name: language.assistant,
            icon: faUsers,
            link: '/asisten',
            private: !isAuthenticated
        },
        {
            name: language.assistantAtd,
            icon: faCalendarCheck,
            link: '/presensi/asisten',
            private: false
        },
        {
            name: language.calasAtd,
            icon: faCalendarCheck,
            link: '/presensi/calas',
            private: false
        },
        {
            name: language.absent,
            icon: faCalendarMinus,
            link: '/absent',
            private: false
        }
    ]

    const handleLogout = () => {
        toggleDrawer(false)
        setDialogOpen(true)
    }

    return (
        <>
            <Drawer
                anchor="left"
                onClose={() => toggleDrawer(false)}
                open={drawerState}
            >
                <Box sx={{ width: 250 }}>
                    {/* container should background image */}
                    <Box sx={{ backgroundImage: `url(${isDarkMode ? imagePatternB : imagePatternW})`, backgroundSize: 'cover', height: 150, }}>
                        <Container sx={{ backdropFilter: 'blur(2px)', height: 150, alignItems: 'flex-end', display: 'flex', }} maxWidth="sm">
                            <List>
                                <ListItem disablePadding>
                                    {isAuthenticated ? (
                                        <>
                                            <ListItemAvatar>
                                                <Avatar>R</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={payload?.name} secondary={payload?.nim} />
                                        </>

                                    ) : (
                                        <ListItemText primary='No User Loged' />
                                    )}


                                </ListItem>
                            </List>
                        </Container>
                    </Box>
                    <List sx={{ display: { xs: 'block', md: 'none' } }}>
                        {pages.map((item, index) => (
                            !item.private && (
                                <ListItem key={index}>
                                    <ListItemButton onClick={()=>navigate(item.link)}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon size="xl" icon={item.icon} />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            )

                        ))}
                    </List>
                    <Divider />
                    <List>
                        {isAuthenticated && (
                            <ListItem>
                                <ListItemButton onClick={()=>navigate("/devices")}>
                                    <ListItemIcon>
                                        <FontAwesomeIcon size="xl" icon={faQrcode} />
                                    </ListItemIcon>
                                    <ListItemText primary={language.rfid} />
                                </ListItemButton>
                            </ListItem>
                        )}
                        <ListItem>
                            <ListItemButton onClick={() => dispatch(langAction.setLangMode(!isEnLang))}>
                                <ListItemIcon>
                                    <FontAwesomeIcon size="xl" icon={faLanguage} />
                                </ListItemIcon>
                                <ListItemText primary={language.lang} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => dispatch(themeAction.setDarkMode(!isDarkMode))}>
                                <ListItemIcon>
                                    <FontAwesomeIcon size="xl" icon={isDarkMode ? faSun : faMoon} />
                                </ListItemIcon>
                                <ListItemText primary={isDarkMode? language.theme.light: language.theme.dark} />
                            </ListItemButton>
                        </ListItem>
                        {isAuthenticated && (
                            <>
                                <Divider />
                                <ListItem>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon size="xl" icon={faRightFromBracket} />
                                        </ListItemIcon>
                                        <ListItemText primary='Log Out' />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}

                    </List>

                </Box>
            </Drawer>

        </>
    )
}

export default DrawerLeft