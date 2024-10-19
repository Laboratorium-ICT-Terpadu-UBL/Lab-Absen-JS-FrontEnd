import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, Card, CardContent, Container, Skeleton, Typography } from "@mui/material"
import RootLoading from "../components/RootLoading"
import CurrentDateCard from "../components/Cards/CurrentDateCard"
import AttendanceChangeDateCard from "../components/Cards/AttendanceChangeDateCard"
import AlertMain from "../components/AlertMain"
import ModalMain from "../components/Modals/ModalMain"
import DialogAlertMain from "../components/DialogAlertMain"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import moment from "moment"
import AbsentRecapCard from "../components/Cards/AbsentRecapCard"
import AbsentRenderModal from "../components/Modals/AbsentRenderModal"
import { enLang, idLang } from "../utilities/LanguageTextConfig"
import TableAbsentComponent from "../components/Tables/TableAbsentComponent"
import { useDelete, useGet, usePost, usePut } from "../hooks/dataHandler"
import { formatLocalDateISO, shortDateFormater } from "../utilities/dateFormater"

const AbsentPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState('')

    const [serverTime, setServerTime] = useState(new Date(Date.now()))
    const [currentTime, setCurrentTime] = useState(moment(serverTime))
    const { timeStamp } = useSelector(state => state.cTimeStamp)
    const [dateValue, setDateValue] = useState(moment(serverTime));

    const [dialogData, setDialogData] = useState([])
    const [dialogContent, setDialogContent] = useState('')
    const [tableData, setTableData] = useState([])
    const [modalData, setModalData] = useState([])
    const [personName, setPersonName] = useState([]);
    const [leaveInfo, setLeaveInfo] = useState('')
    const [editMode, setEditMode] = useState(false)

    const [dateRangeVal, setDateRangeVal] = useState({
        dateRange1: moment(serverTime),
        dateRange2: moment(serverTime)
    })

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertContent, setAlertContent] = useState({
        title: '',
        severity: 'warning',
        content: ''
    })
    const { isAuthenticated } = useSelector(state => state.auths)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('')
    const { isEnLang } = useSelector(state => state.languages)
    const language = isEnLang ? enLang : idLang
    const [recapData, setRecapData] = useState({
        assistant: 0,
        calas: 0
    })

    const { data: data1, loading, error: error1, execute: execute1 } = useGet("leave", true, false)
    const { data: data2, error: error2, execute: execute2 } = usePost("leave")
    const { data: data3, error: error3, execute: execute3 } = useDelete("leave")
    const { data: data4, error: error4, execute: execute4 } = usePut("leave")

    const handleAddAttendance = () => {
        setEditMode(false)
        setDateRangeVal({
            dateRange1: moment(serverTime),
            dateRange2: moment(serverTime)
        })
        setPersonName([])
        setLeaveInfo('')
        setModalOpen(true)
        setModalTitle(language?.addAbsent)
    }

    const handleRowClick = (rowId) => {
        setEditMode(true)
        if (dateValue.isSame(currentTime, 'day')) {
            const clickData = tableData?.find((item) => item.nim === rowId)
            setPersonName([clickData?.nim])
            setLeaveInfo(clickData?.keterangan)
            setDateRangeVal({
                dateRange1: moment(clickData?.tanggal_izin),
                dateRange2: moment(clickData?.tanggal_izin)
            })
            setModalOpen(true)
            setModalTitle(language?.editLeave)
        }
        setModalOpen(true)

    }

    const handleModalSave = (e) => {
        e.preventDefault()
        execute2({
            data: {
                nim: JSON.stringify(personName),
                info: leaveInfo,
                dateS: shortDateFormater(dateRangeVal.dateRange1.toISOString()),
                dateE: shortDateFormater(dateRangeVal.dateRange2.toISOString())
            }
        })
        setModalOpen(false)
        // setAlertOpen(true)

    }

    const handleModalEdit = (e) => {
        e.preventDefault()
        execute4({
            data: {
                nim: personName[0],
                date: shortDateFormater(formatLocalDateISO(dateRangeVal.dateRange1.toISOString())),
                info: leaveInfo
            },
        })
        setModalOpen(false)

    }

    const handleModalCancel = () => {
        setModalOpen(false)
    }

    const handleChangeDate = (value) => {
        setDateValue(value)
        execute1({
            params: {
                date: shortDateFormater(formatLocalDateISO(value.toISOString()))
            }
        })
    }

    const handleDateRangeChange = (value, pickers) => {
        setDateRangeVal(prevState => ({
            ...prevState,
            [pickers]: value
        }))
    }

    const handleDeleteData = (multiData, singleData) => {
        setDialogTitle(language?.delete)
        if (multiData) {
            setDialogData(multiData)
            setDialogContent(`${language?.delete} ${multiData.length} item ?`)
            //handle multiple data
        } else {
            setDialogData([singleData])
            setDialogContent(`${language?.delete} ${singleData} item ?`)
            //handle singgle data
        }
        setDialogOpen(true)
    }


    const handleDialonAcc = () => {
        execute3({
            data: {
                nim: JSON.stringify(dialogData),
                date: shortDateFormater(formatLocalDateISO(dateValue.toISOString()))
            }
        })
        setDialogOpen(false)
    }

    const handleDialogCancle = () => {
        setDialogOpen(false)
    }

    useEffect(() => {
        if (data1) {
            setTableData(data1?.data?.filter(item => item.tanggal_izin !== null))
            setModalData(data1?.data?.filter(item => item.tanggal_izin === null))
            setRecapData({
                assistant: data1?.data?.filter(item => item.tanggal_izin !== null && item.jabatan !== "Calon Asisten").length,
                calas: data1?.data?.filter(item => item.tanggal_izin !== null && item.jabatan === "Calon Asisten").length
            })
        }
    }, [data1])

    useEffect(() => {
        if (data2) {
            //handle post
            execute1()
            setAlertOpen(true)
            setAlertContent({
                title: language?.scssAdd,
                severity: 'success',
                content: ''
            })
        }
        if (data3) {
            //handle delete
            execute1()
            setAlertOpen(true)
            setAlertContent({
                title: language?.scssDelete,
                severity: 'success',
                content: ''
            })
        }
        if (data4) {
            //handle put
            execute1()
            setAlertOpen(true)
            setAlertContent({
                title: language?.scssEdit,
                severity: 'success',
                content: ''
            })
        }
        if (error1) {
            //error get
            console.error(error1);
            setAlertOpen(true)
            setAlertContent({
                title: language?.failGet,
                severity: 'error',
                content: ''
            })
        }
        if (error2) {
            //error post
            console.error(error2);
            setAlertOpen(true)
            setAlertContent({
                title: language?.failAdd,
                severity: 'error',
                content: ''
            })
        }
        if (error3) {
            //error delete
            console.error(error3);
            setAlertOpen(true)
            setAlertContent({
                title: language?.failDelete,
                severity: 'error',
                content: ''
            })
        }
        if (error4) {
            //error put
            console.error(error4);
            setAlertOpen(true)
            setAlertContent({
                title: language?.failEdit,
                severity: 'error',
                content: ''
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data2, data3, data4, error1, error2, error3, error4])

    useEffect(() => {
        if (timeStamp) {
            setServerTime(new Date(timeStamp))
            setCurrentTime(moment(new Date(timeStamp)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeStamp])


    useEffect(() => {
        document.title = `${language?.absent} - Lab ICT Presensi`
        execute1()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])
    return (
        <>
            <Container sx={{ py: 5, minHeight: '91.5vh' }}>
                <Card >
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <Typography variant="h4">{language?.absent}</Typography>
                    </CardContent>
                </Card>
                <Box sx={{ display: 'flex', my: 2, flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: 'space-between' }}>
                    <Card sx={{ mr: { xs: 'auto', md: 2 }, width: { xs: '100%', md: '70%' } }}>
                        <CardContent>
                            <Box sx={{ justifyContent: 'center', display: dateValue.isSame(currentTime, 'day') ? 'flex' : 'none', my: 1, }}>
                                <Button variant="contained" onClick={() => loading === false && handleAddAttendance()}>
                                    {loading ? (<Skeleton sx={{ minWidth: 170 }} />) : (
                                        <>
                                            <Box sx={{ mr: 1 }}>
                                                <FontAwesomeIcon size="lg" icon={faPlus} />
                                            </Box>
                                            {language?.addAbsent}
                                        </>
                                    )}
                                </Button>
                            </Box>
                            {loading ? (<RootLoading />) : (
                                <TableAbsentComponent
                                    data={tableData}
                                    language={language}
                                    handleRowClick={handleRowClick}
                                    handleDeleteData={handleDeleteData}
                                />
                            )}
                        </CardContent>
                    </Card>
                    <Box sx={{ ml: { xs: 'auto', md: 2 }, my: { xs: 2, md: 0 }, width: { xs: '100%', md: '30%' } }}>
                        <AbsentRecapCard data={recapData} language={language} loading={loading} />
                        <CurrentDateCard serverDate={serverTime} language={language} />
                        <AttendanceChangeDateCard title={language?.changeAbsentDate} language={language} readOnly={!isAuthenticated} currDate={{ dateValue }} handleChangeDate={handleChangeDate} disableFuture={false} />
                    </Box>
                </Box>
            </Container>
            <AlertMain
                alertLabel={alertContent.title}
                severity={alertContent.severity}
                content={alertContent.content}
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                anchorPosition={{ vertical: 'bottom', horizontal: 'center' }}
            />
            <ModalMain
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                modalTitle={modalTitle}
            >
                <AbsentRenderModal
                    data={modalData}
                    personName={personName}
                    setPersonName={setPersonName}
                    language={language}
                    handleModalSave={handleModalSave}
                    handleModalEdit={handleModalEdit}
                    handleModalCancel={handleModalCancel}
                    handleDateRange={{ dateRangeVal, handleDateRangeChange }}
                    handleInfo={{ leaveInfo, setLeaveInfo }}
                    editMode={editMode}
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

        </>
    )
}

export default AbsentPage