import { Button, Card, CardContent, Container, Skeleton, Typography } from "@mui/material"
import RFIDCard from "../components/Cards/RFIDCard"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { enLang, idLang } from "../utilities/LanguageTextConfig";
import { useDelete, useGet, usePost, usePut } from "../hooks/dataHandler";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalMain from "../components/Modals/ModalMain";
import RFIDRenderModal from "../components/Modals/RFIDRenderModal";
import DialogAlertMain from "../components/DialogAlertMain";
import AlertMain from "../components/AlertMain";
import dateFormater from "../utilities/dateFormater";

const RFIDDevicesPage = () => {
    const { isDarkMode } = useSelector(state => state.themes)
    const { isEnLang } = useSelector(state => state.languages)
    const language = isEnLang ? enLang : idLang
    const [modalOpen, setModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [purposes, setPurposes] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('')
    const [dialogContent, setDialogContent] = useState('')
    const [dialogData, setDialogData] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertComponent, setAlertComponent] = useState({
        title: '',
        severity: 'warning',
        content: ''
    })
    const [inputForm, setInputForm] = useState({
        name: '',
        no_serial: ''
    })
    const { data: data1, error: error1, execute: execute1 } = usePost("rfid")
    const { data: data2, error: error2, execute: execute2 } = usePut("rfid")
    const { data: data3, error: error3, execute: execute3, loading } = useGet("rfid")
    const { data: data4, error: error4, execute: execute4 } = usePut("rfid/enroll")
    const { data: data5, error: error5, execute: execute5 } = useDelete("rfid")


    const handleModeCHange = (mode, uid) => {
        execute4({
            data: {
                enroll: mode,
                no_serial: uid
            }
        })
    }

    const handleDeleteDialogOpen = (uid) => {
        setDialogOpen(true)
        setDialogData(uid)
        setDialogTitle(language.delete)
        setDialogContent(`${language.delete} ${uid} ?`)
    }

    const handleEditModalOpen = (uid) => {
        const findedData = data3?.data?.find(item => item.no_serial === uid)
        setInputForm({
            name: findedData?.nama_perangkat,
            no_serial: findedData?.no_serial
        })
        setPurposes("edit")
        setModalTitle(language?.editDevice)
        setModalOpen(true)
        console.log(uid);
    }

    const handleAddModalOpen = () => {
        setPurposes("add")
        setModalTitle(language?.addNewDevice)
        setModalOpen(true)
    }

    const handleDialonAcc = () => {
        execute5({
            data: {
                no_serial: dialogData
            }
        })
        setDialogOpen(false)
    }

    const handleDialogCancle = () => {
        setDialogOpen(false)
    }

    const handleSave = (event) => {
        event.preventDefault()
        execute1({
            data: inputForm
        })
        setModalOpen(false)
    }

    const handleEdit = (event) => {
        event.preventDefault()
        execute2({
            data: inputForm
        })
        setModalOpen(false)

    }

    const connectUSBDevice = async () => {
        const usbDev = await navigator.usb.requestDevice({ filters: [{ vendorId: 1133, productId: 50495 }] })
        console.log(usbDev);

        await usbDev.open()

        if (usbDev.configuration === null) {
            await usbDev.selectConfiguration(1);
        }
        console.log(usbDev);
        await usbDev.claimInterface(0);
        console.log('Perangkat terhubung!');
    };

    useEffect(() => {
        if (error1) {
            console.error(error1);
            setAlertOpen(true)
            setAlertComponent({
                severity: 'error',
                title: language?.failAdd
            })
        }
        if (error2) {
            console.error(error2);
            setAlertOpen(true)
            setAlertComponent({
                severity: 'error',
                title: language?.failEdit
            })
        }
        if (error3) {
            console.error(error3);
            setAlertOpen(true)
            setAlertComponent({
                severity: 'error',
                title: language?.failGet
            })
        }
        if (error4) {
            console.error(error4);
            setAlertOpen(true)
            setAlertComponent({
                severity: 'error',
                title: language?.failUpdate
            })
        }
        if (error5) {
            console.error(error5);
            setAlertOpen(true)
            setAlertComponent({
                severity: 'error',
                title: language?.failDelete
            })
        }
        if (data1) {
            execute3()
            setAlertOpen(true)
            setAlertComponent({
                severity: 'success',
                title: language?.scssAdd
            })

        }
        if (data2) {
            execute3()
            setAlertOpen(true)
            setAlertComponent({
                severity: 'success',
                title: language?.scssEdit
            })

        }
        if (data4) {
            execute3()
            setAlertOpen(true)
            setAlertComponent({
                severity: 'success',
                title: language?.scssUpdate
            })

        }
        if (data5) {
            execute3()
            setAlertOpen(true)
            setAlertComponent({
                severity: 'success',
                title: language?.scssDelete
            })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data1, data2, data4, data5, error1, error2, error3, error4, error5, language])

    useEffect(() => {
        document.title = 'RFID - Lab ICT Presensi'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Container sx={{ py: 5, minHeight: '91.5vh' }}>
                <Card sx={{ py: 2 }} >
                    <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h4">{language?.rfid}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ my: 2, py: 2, minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button onClick={connectUSBDevice}>Test</Button>
                    <Button sx={{ mx: 1, }} variant="contained" onClick={() => loading == false && handleAddModalOpen()}>
                        {loading ? (<Skeleton sx={{ minWidth: 200 }} />) : (
                            <>
                                <FontAwesomeIcon size="lg" icon={faPlus} />
                                <Typography sx={{ mx: 1 }}>{language?.addNewDevice}</Typography>
                            </>
                        )}
                    </Button>
                    <CardContent sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        {data3?.data?.length > 0 ? data3 && data3?.data?.map((item, index) => (
                            <RFIDCard
                                key={index}
                                uid={item.no_serial}
                                modeVal={item.enroll.toString()}
                                dateRegis={dateFormater(item.tanggal_tambah)}
                                deName={item.nama_perangkat}
                                handleModeChange={handleModeCHange}
                                handleDelete={handleDeleteDialogOpen}
                                handleEdit={handleEditModalOpen}
                                isDark={isDarkMode}
                                language={language}
                            />
                        )) : (
                            <Typography fontSize={20}>{language.noData}</Typography>
                        )}

                    </CardContent>
                </Card>

            </Container>
            <ModalMain
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                modalTitle={modalTitle}
            >
                <RFIDRenderModal
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    inputForm={inputForm}
                    setInputForm={setInputForm}
                    purpose={purposes}
                    language={language}
                />
            </ModalMain>
            <DialogAlertMain
                dialogLabel={dialogTitle}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                handleAccept={handleDialonAcc}
                handleCancle={handleDialogCancle}

            >
                {dialogContent}

            </DialogAlertMain>
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
}

export default RFIDDevicesPage