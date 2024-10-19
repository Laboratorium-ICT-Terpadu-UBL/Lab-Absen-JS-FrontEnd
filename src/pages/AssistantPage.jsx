import { Box, Button, Card, CardContent, Container, Skeleton, Typography, } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ModalMain from "../components/Modals/ModalMain";
import AsistenCalasRenderModal from "../components/Modals/AsistenCalasRenderModal";
import TableMainComponent from "../components/Tables/TableMainComponent";
import DialogAlertMain from "../components/DialogAlertMain";
import RootLoading from "../components/RootLoading";
import { useSelector } from "react-redux";
import { enLang, idLang } from "../utilities/languageTextConfig";
import { useDelete, useGet, usePost, usePut } from "../hooks/dataHandler";
import AlertMain from "../components/AlertMain";
import { useOutletContext } from "react-router-dom";

//add fetch url ws
// add alert fail or success

const AssistantPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [renderModalPurpose, setRenderModalPurpose] = useState('view')
    const [modalTitle, setModalTitle] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('')
    const [dialogContent, setDialogContent] = useState('')
    const [dialogPurpose, setDialogPurpose] = useState('')
    const [dialogData, setDialogData] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertComponent, setAlertComponent] = useState({
        title: "",
        content: "",
        severity: "warning"
    })
    const { isEnLang } = useSelector(state => state.languages)
    const language = isEnLang ? enLang : idLang
    const { lastMessage } = useOutletContext()
    const { data: data1, error: error1, loading: loading1, execute: execute1 } = useGet("assistant", true, false)
    const { data: data2, error: error2, execute: execute2 } = usePut("assistant/disableEnable")
    const { data: data3, error: error3, execute: execute3 } = useDelete("assistant")
    const { data: data4, error: error4, execute: execute4 } = usePost("assistant")
    const { data: data5, error: error5, execute: execute5 } = usePut("assistant")


    const [inputForm, setInputForm] = useState({
        nim: '',
        phone: '',
        name: '',
        gender: '',
        position: '',
        card_no: '',
        password: '',
        status: ''
    })

    const handleRowClick = (rowId) => {
        setModalTitle(language?.dataAsistant)
        setRenderModalPurpose('view')
        const findedData = data1?.data.find((item) => item.nim === rowId)
        setInputForm({
            nim: findedData?.nim,
            phone: findedData?.no_telp,
            name: findedData?.nama,
            gender: findedData?.jenis_kelamin,
            position: findedData?.jabatan,
            card_no: findedData?.serial_kartu,
            password: "",
            status: findedData?.status
        })
        setModalOpen(true)
    }

    const handleAddModalOpen = () => {
        setModalTitle(language?.addMoreAssistant)
        setRenderModalPurpose('add')
        setModalOpen(true)
    }

    const handleSaveData = (event) => {
        event.preventDefault()
        execute4({
            data: inputForm
        })
        setModalOpen(false)
        console.log(inputForm);
    }

    const handleEditData = (event) => {
        event.preventDefault()
        execute5({
            data: inputForm
        })
        setModalOpen(false)
    }

    const handleEditOpenModal = (rowId) => {
        setModalTitle(language?.changeAssistantData)
        setRenderModalPurpose('edit')
        const findedData = data1?.data.find((item) => item.nim === rowId)
        setInputForm({
            nim: findedData?.nim,
            phone: findedData?.no_telp,
            name: findedData?.nama,
            gender: findedData?.jenis_kelamin,
            position: findedData?.jabatan,
            card_no: findedData?.serial_kartu,
            password: "",
            status: findedData?.status
        })
        setModalOpen(true)
    }

    const handleDisableData = (multiData, singleData) => {
        setDialogPurpose("disable");
        setDialogTitle(language?.disableIt)
        if (multiData) {
            setDialogContent(`${language?.disableIt} ${multiData.length} item?`)
            setDialogData(multiData)
            console.log(multiData);
            //handle multiple data
        } else {
            setDialogContent(`${language?.disableIt} ${singleData} ?`)
            setDialogData([singleData])
            console.log([singleData]);
            //handle singgle data
        }
        setDialogOpen(true)

    }
    const handleEnableData = (multiData, singleData) => {
        setDialogPurpose("enable")
        setDialogTitle(language?.enableit)
        if (multiData) {
            setDialogContent(`${language?.enableit} ${multiData.length} item?`)
            setDialogData(multiData)
            console.log(multiData);
            //handle multiple data
        } else {
            console.log(singleData);
            setDialogContent(`${language?.enableit} ${singleData} ?`)
            setDialogData([singleData])
            //handle singgle data
        }
        setDialogOpen(true)

    }

    const handleDeleteData = (multiData, singleData) => {
        setDialogPurpose("delete")
        setDialogTitle(language?.delete)
        if (multiData) {
            setDialogContent(`${language?.delete} ${multiData.length} item?`)
            setDialogData(multiData)
            console.log(multiData);
            //handle multiple data
        } else {
            setDialogContent(`${language?.delete} ${singleData} ?`)
            setDialogData([singleData])
            console.log(singleData);
            //handle singgle data
        }
        setDialogOpen(true)
    }

    const handleDialonAcc = () => {
        setDialogOpen(false)
        switch (dialogPurpose) {
            case "enable":
                execute2({
                    data: {
                        nim: JSON.stringify(dialogData),
                        status: "Aktif"
                    }
                })
                break
            case "disable":
                execute2({
                    data: {
                        nim: JSON.stringify(dialogData),
                        status: "Tidak aktif"
                    }
                })
                break
            case "delete":
                execute3({
                    data: {
                        nim: JSON.stringify(dialogData)
                    }
                })
                break

        }

    }

    const handleDialogCancle = () => {
        setDialogOpen(false)
    }

    useEffect(() => {
        if (data2) {
            execute1()
            setAlertOpen(true)
            setAlertComponent({
                severity: 'success',
                title: language?.scssEnableDisable
            })

        }
        if (data3) {
            execute1()
            setAlertOpen(true)
            setAlertComponent({
                severity: 'success',
                title: language?.scssDelete
            })
        }
        if (data4) {
            execute1()
            setAlertOpen(true)
            setAlertComponent({
                severity: 'success',
                title: language?.scssAdd
            })

        }
        if (data5) {
            execute1()
            setAlertOpen(true)
            setAlertComponent({
                severity: 'success',
                title: language?.scssEdit
            })

        }
        if (error1) {
            console.error(error1);
            setAlertOpen(true)
            setAlertComponent({
                severity: 'error',
                title: language?.failGet
            })
        }
        if (error2) {
            console.error(error2);
            setAlertOpen(true)
            setAlertComponent({
                severity: 'error',
                title: language?.failEnableDisable
            })
        }
        if (error3) {
            console.error(error3);
            setAlertOpen(true)
            setAlertComponent({
                severity: 'error',
                title: language?.failDelete
            })
        }
        if (error4) {
            console.error(error4);
            setAlertOpen(true)
            setAlertComponent({
                severity: 'error',
                title: language?.failEdit
            })
        }
        if (error5) {
            console.error(error5);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data2, data3, data4, data5, error1, error2, error3, error4, error5, language])
    useEffect(() => {
        if (lastMessage !== null) {
            const message = JSON.parse(lastMessage?.data)
            const { data: wsData } = message
            if (wsData) {
                setInputForm(prevState => ({
                    ...prevState,
                    card_no: wsData.card_no
                }))
            }
        }
    }, [lastMessage])

    useEffect(() => {
        document.title = `${language?.assistant} - Lab ICT Presensi`
        execute1()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language?.assistant])

    return (
        <>
            <Container sx={{ py: 5, minHeight: '91.5vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <Button sx={{ mx: 1, }} variant="contained" onClick={() => loading1 == false && handleAddModalOpen()}>
                        {loading1 ? (<Skeleton sx={{ minWidth: 200 }} />) : (
                            <>
                                <FontAwesomeIcon size="lg" icon={faPlus} />
                                <Typography sx={{ mx: 1 }}>{language?.addMoreAssistant}</Typography>
                            </>
                        )}
                    </Button>
                </Box>
                <Card>
                    <CardContent>
                        {loading1 ? (<RootLoading />) : (
                            <TableMainComponent language={language} handler={{ handleRowClick, handleDeleteData, handleEnableData, handleDisableData, handleEditOpenModal, handleSaveData }} data={data1?.data} />
                        )}
                    </CardContent>
                </Card>
            </Container>
            <ModalMain
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                modalTitle={modalTitle}
            >
                <AsistenCalasRenderModal
                    language={language}
                    purposer={renderModalPurpose}
                    modalSeter={setModalOpen}
                    inputForm={inputForm}
                    modalTitler={{ setModalTitle, modalTitle }}
                    setInputForm={setInputForm}
                    lastMessage={lastMessage}
                    handler={{ handleDeleteData, handleDisableData, handleEditData, handleSaveData, handleEnableData }}
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

export default AssistantPage