import { Box, Button, Card, CardContent, Container, Skeleton, Typography } from "@mui/material"
import TableAttendanceComponent from "../components/Tables/TableAttendanceComponent"
import AttendanceRecapCard from "../components/Cards/AttendanceRecapCard"
import AttendanceChangeDateCard from "../components/Cards/AttendanceChangeDateCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import ModalMain from "../components/Modals/ModalMain"
import moment from "moment"
import AttendanceRenderModal from "../components/Modals/AttendanceRenderModal"
import AlertMain from "../components/AlertMain"
import RootLoading from "../components/RootLoading"
import { useSelector } from "react-redux"
import DialogAlertMain from "../components/DialogAlertMain"
import CurrentDateCard from "../components/Cards/CurrentDateCard"
import { enLang, idLang } from "../utilities/languageTextConfig"
import { useDelete, useGet, usePost, usePut } from "../hooks/dataHandler"
import calculateLate from "../utilities/calculateLate"
import dateFormater, { formatLocalDateISO, shortDateFormater } from "../utilities/dateFormater"

const AssistantAttendancePage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState('')

    const [homeward, setHomeward] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertContent, setAlertContent] = useState({
        title: '',
        severity: 'warning',
        content: ''
    })

    const { timeStamp } = useSelector(state => state.cTimeStamp)
    const { isAuthenticated } = useSelector(state => state.auths)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('')
    const [dialogContent, setDialogContent] = useState('')
    const [dialogData, setDialogData] = useState([])
    const { isEnLang } = useSelector(state => state.languages)
    const language = isEnLang ? enLang : idLang

    const { data: data1, loading, error: error1, execute: execute1 } = useGet("attendance", true, false)
    const { data: data3, execute: execute3, error: error3 } = usePost("attendance")
    const { data: data4, execute: execute4, error: error4 } = usePut("attendance")
    const { data: data5, execute: execute5, error: error5 } = useDelete("attendance")

    const [serverTime, setServerTime] = useState(new Date(Date.now()))

    const convertedServerDate = moment(serverTime)
    const [currentTime, setCurrentTime] = useState(convertedServerDate)
    const [attendanceTime, setAttendanceTime] = useState(currentTime)
    const [outTime, setOutTime] = useState(currentTime)
    const [dateValue, setDateValue] = useState(moment(serverTime));

    const [tableData, setTableData] = useState([])
    const [modalData, setModalData] = useState([])
    const [homewardData, setHomewardData] = useState({})
    const [personName, setPersonName] = useState([]);
    const [recapData, setRecapData] = useState({
        present: 0,
        notpresent: 0,
        onTime: 0,
        late: 0
    })

    const handleAddAttendance = () => {
        setAttendanceTime(currentTime)
        setModalOpen(true)
        setHomeward(false)
        setModalTitle(language?.comeAtd)
    }

    const handleRowClick = (rowId) => {
        if (dateValue.isSame(currentTime, 'day')) {
            setHomewardData(tableData?.find((item) => item.nim === rowId))
            setHomeward(true)
            setOutTime(currentTime)
            setAttendanceTime(currentTime)
            setModalOpen(true)
            setModalTitle(language?.homewardAtd)
            console.log(rowId);
        }
    }

    const handleHomewardData = (multiData, e, multi) => {
        if (e) {
            e.preventDefault()
        }
        execute4({
            data: {
                nim: JSON.stringify(multiData),
                time: multi ? formatLocalDateISO(currentTime.toISOString()) : formatLocalDateISO(outTime.toISOString())
            }
        })
        setModalOpen(false)
    }

    const handleModalAcc = (e) => {
        e.preventDefault()
        execute3({
            data: {
                nim: JSON.stringify(personName)
            }
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

    const handleDeleteData = (multiData, singleData) => {
        setDialogTitle(language?.delete)
        if (multiData) {
            setDialogContent(`${language?.delete} ${multiData.length} item ${language?.on} ${dateFormater(dateValue.toISOString(), language?.timeRegion)}?`)
            setDialogData(multiData)
            //handle multiple data
        } else {
            setDialogContent(`${language?.delete} ${singleData} ${language?.on} ${dateFormater(dateValue.toISOString(), language?.timeRegion)}?`)
            setDialogData([singleData])
            //handle singgle data
        }
        setDialogOpen(true)
    }


    const handleDialonAcc = () => {
        execute5({
            data: {
                nim: JSON.stringify(dialogData),
                date: shortDateFormater(formatLocalDateISO(dateValue.toISOString()))
            },
        })
        setDialogOpen(false)
    }

    const handleDialogCancle = () => {
        setDialogOpen(false)

    }

    useEffect(() => {
        if (timeStamp) {
            setServerTime(new Date(timeStamp))
            setCurrentTime(moment(new Date(timeStamp)))
            setAttendanceTime(moment(new Date(timeStamp)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeStamp])

    useEffect(() => {
        if (data3) {
            execute1()
            setAlertOpen(true)
            setAlertContent({
                title: language?.scssAdd,
                severity: 'success',
                content: ''
            })
            setPersonName([])
            // setAlertOpen(true)
            //handle scss post
        }
        if (data4) {
            execute1()
            setAlertOpen(true)
            setAlertContent({
                title: language?.scssEdit,
                severity: 'success',
                content: ''
            })
            //handle scss put
        }
        if (data5) {
            execute1()
            setAlertOpen(true)
            setAlertContent({
                title: language?.scssDelete,
                severity: 'success',
                content: ''
            })
            //handle scss delete
        }
        if (error1) {
            console.error(error1)
            setAlertOpen(true)
            setAlertContent({
                title: language?.failGet,
                severity: 'error',
                content: ''
            })
            //handle error get
        }
        if (error3) {
            //handle error post
            console.error(error3);
            setAlertOpen(true)
            setAlertContent({
                title: language?.failGet,
                severity: 'error',
                content: language?.failAttd
            })
        }
        if (error4) {
            //handle error put
            console.error(error3);
            setAlertOpen(true)
            setAlertContent({
                title: language?.failGet,
                severity: 'error',
                content: language?.failOut
            })
        }
        if (error5) {
            //handle error delete
            console.error(error5);
            setAlertOpen(true)
            setAlertContent({
                title: language?.failGet,
                severity: 'error',
                content: ''
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data3, data4, data5, error1, error3, error4, error5])

    useEffect(() => {
        if (data1) {
            const mainData = calculateLate(data1?.data?.filter(item => item.jabatan === "Calon Asisten"), 7, 30)
            setTableData(mainData?.filter(item => item.waktu_datang !== null))
            setModalData(mainData?.filter(item => item.waktu_datang === null))
            setRecapData({
                present: mainData?.filter(item => item.waktu_datang !== null).length,
                notpresent: mainData?.filter(item => item.waktu_datang === null).length,
                late: mainData.filter(item => item.terlambat !== 0 && item.waktu_datang !== null).length,
                onTime: mainData.filter(item => item.terlambat === 0 && item.waktu_datang !== null).length
            })
        }
    }, [data1])


    useEffect(() => {
        document.title = `${language?.assistantAtd} - Lab ICT Presensi`
        execute1()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language?.assistantAtd])

    return (
        <>
            <Container sx={{ py: 5, minHeight: '91.5vh' }}>
                <Card >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', py: 2 }}>
                        <Typography variant="h4">{language?.calasAtd_l}</Typography>
                        <Typography variant="h5">{dateFormater(dateValue.toISOString(), language?.timeRegion)}</Typography>

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
                                            {language?.addAtd}
                                        </>
                                    )}
                                </Button>
                            </Box>
                            {loading ? (<RootLoading />) : (
                                <TableAttendanceComponent
                                    isDateSame={dateValue.isSame(convertedServerDate, 'day')}
                                    language={language}
                                    handleRowClick={handleRowClick}
                                    handleHomewardData={handleHomewardData}
                                    handleDeleteData={handleDeleteData}
                                    data={tableData}
                                />
                            )}
                        </CardContent>
                    </Card>
                    <Box sx={{ ml: { xs: 'auto', md: 2 }, my: { xs: 2, md: 0 }, width: { xs: '100%', md: '30%' } }}>
                        <AttendanceRecapCard loading={loading} label={language?.calas_s} language={language} data={recapData} />
                        <CurrentDateCard serverDate={serverTime} language={language} />
                        <AttendanceChangeDateCard title={language?.changeDateAtd} readOnly={!isAuthenticated} language={language} currDate={{ dateValue }} handleChangeDate={handleChangeDate} />
                    </Box>
                </Box>
            </Container>
            <AlertMain
                alertLabel={alertContent.title}
                severity={alertContent.severity}
                open={alertOpen}
                content={alertContent.content}
                onClose={() => setAlertOpen(false)}
                anchorPosition={{ vertical: 'bottom', horizontal: 'center' }}
            />
            <ModalMain
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                modalTitle={modalTitle}
            >
                <AttendanceRenderModal
                    language={language}
                    onAccept={handleModalAcc}
                    onCancle={handleModalCancel}
                    onTimeChange={(timeChange) => homeward ? setOutTime(timeChange) : setAttendanceTime(timeChange)}
                    timeValue={homeward ? outTime : attendanceTime}
                    homeward={homeward}
                    data={homeward ? homewardData : modalData}
                    personName={personName}
                    handlePut={handleHomewardData}
                    setPersonName={setPersonName}
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

export default AssistantAttendancePage