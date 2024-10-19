/* eslint-disable react/prop-types */
import { faBars, faCalendarCheck, faCalendarMinus, faCubes, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalMain from "./Modals/ModalMain";
import LoginRenderModal from "./Modals/LoginRenderModal";
import { enLang, idLang } from "../utilities/LanguageTextConfig";
import { usePost } from "../hooks/dataHandler";
import AlertMain from "./AlertMain";
import { authAction } from "../stores/authState";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleDrawer, setDialogOpen }) => {

    const [AvataranchorEl, setAvataranchorEl] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const { isEnLang } = useSelector(state => state.languages)
    const language = isEnLang ? enLang : idLang
    const { isAuthenticated, payload } = useSelector(state => state.auths)
    const { data, loading, error, execute } = usePost("login")
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertComponent, setAlertComponent] = useState({
        title: "",
        content: "",
        severity: "warning"
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        "user": '',
        "password": ''

    })

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

    const handleAvatarMenuOpen = (event) => {
        setAvataranchorEl(event.currentTarget)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        execute({ data: loginForm })
    }

    const handleLogout = () => {
        setAvataranchorEl(null)
        setAlertOpen(false)
        setModalOpen(false)
        setDialogOpen(true)
    }

    useEffect(() => {
        if (data) {
            setAlertOpen(true)
            if (data?.error) {
                setAlertComponent({
                    title: 'Error',
                    content: data?.error,
                    severity: 'error'
                })
            } else {
                setAlertComponent({
                    title: language.welcome,
                    content: data?.name,
                    severity: 'success'
                })
                dispatch(authAction.login(data))
                setModalOpen(false)
            }
        }
        if (error) {
            setAlertOpen(true)
            console.log(error);
            setAlertComponent({
                title: 'Error',
                content: language.somethingError,
                severity: 'error'
            })

        }
    }, [data, dispatch, error, language])

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button sx={{ color: 'white', display: 'block' }} onClick={() => toggleDrawer(true)}>
                        <FontAwesomeIcon size="2xl" icon={faBars} />
                    </Button>
                    <Typography variant="h5" sx={{ mx: 1, flexGrow: 1 }}>Presensi</Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((item, index) => (
                            !item.private && (
                                <Button key={index} sx={{ color: 'white', }} onClick={() => navigate(item.link)}>
                                    <FontAwesomeIcon size="2xl" icon={item.icon} />
                                    <Typography sx={{ mx: 1 }} variant="subtitle1">{item.name}</Typography>
                                </Button>
                            )
                        ))}
                    </Box>
                    <Box sx={{ mx: 1 }}>
                        {isAuthenticated ? (
                            <>
                                <IconButton onClick={handleAvatarMenuOpen}>
                                    <Avatar>{payload.name.charAt(0)}</Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={AvataranchorEl}
                                    open={Boolean(AvataranchorEl)}
                                    onClose={() => setAvataranchorEl(null)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                >
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign='center'>Log Out</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button onClick={() => setModalOpen(true)} sx={{ color: 'white', mx: 2 }}>Login</Button>
                        )}
                    </Box>

                </Toolbar>
            </AppBar>
            {!isAuthenticated && (
                <ModalMain
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    modalTitle='Login'
                >
                    <LoginRenderModal
                        buttonLoading={loading}
                        language={language}
                        value={loginForm}
                        setInputValue={setLoginForm}
                        handleLogin={handleLogin}
                    />


                </ModalMain>
            )}
            <AlertMain
                alertLabel={alertComponent.title}
                severity={alertComponent.severity}
                content={alertComponent.content}
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                anchorPosition={{ vertical: 'bottom', horizontal: 'center' }}
            />


        </>
    )
};

export default Header;
