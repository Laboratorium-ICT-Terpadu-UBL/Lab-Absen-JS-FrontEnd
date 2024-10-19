import { faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Card, CardContent, Container, Typography } from "@mui/material"
import MediumCard from "../components/Cards/MediumCard"
import ExportCard from "../components/Cards/ExportCard"
import TabsChartComponent from "../components/TabsChartComponent"
import { useEffect, useState } from "react"
import ModalMain from "../components/Modals/ModalMain"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import ExportRenderModal from "../components/Modals/ExportRenderModal"
import { useSelector } from "react-redux"
import { enLang, idLang } from "../utilities/languageTextConfig"
import { useGet } from "../hooks/dataHandler"
import AlertMain from "../components/AlertMain"

const HomePage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const { isEnLang } = useSelector(state => state.languages)
    const language = isEnLang ? enLang : idLang
    const { timeStamp } = useSelector(state => state.cTimeStamp)
    const [serverTime, setServerTime] = useState(Date.now())

    const { data: data1, loading: loading1 = true, error: error1 } = useGet("assistant")
    const { data: data2, loading: loading2, error: error2 } = useGet("attendance")
    const { data: data3, loading: loading3, error: error3 } = useGet("leave")

    const [assistantData, setAssistantData] = useState({
        assistant: "0",
        calas: "0",
    })
    const [attendanceData, setAttendanceData] = useState({
        assistant: "0",
        calas: "0",
    })
    const [leaveData, setLeaveData] = useState({
        assistant: "0",
        calas: "0",
    })

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertContent, setAlertContent] = useState({
        title: '',
        severity: 'warning',
        content: ''
    })

    const navigate = useNavigate()
    const [dateRangeVal, setDateRangeVal] = useState({
        dateRange1: moment(serverTime),
        dateRange2: moment(serverTime)
    })
    const [radioReportVal, setRadioReportVal] = useState('')


    const handleExportPDF = () => {
        setModalTitle('PDF')
        setModalOpen(true)
    }

    const handleExportExcel = () => {
        setModalTitle('Excel')
        setModalOpen(true)
    }

    const handleDateRangeChange = (value, pickers) => {
        setDateRangeVal(prevState => ({
            ...prevState,
            [pickers]: value
        }))
    }

    const handleExportModalAcc = (e) => {
        e.preventDefault()
        setModalOpen(false)
        navigate('/export', {
            state: {
                type: modalTitle.toLowerCase(),
                dateRange: {
                    dateRange1: dateRangeVal.dateRange1.toISOString(),
                    dateRange2: dateRangeVal.dateRange2.toISOString()
                },
                radioReport: radioReportVal
            }
        })
    }

    useEffect(() => {
        if (timeStamp) {
            setServerTime(new Date(timeStamp))
        }
    }, [timeStamp])

    useEffect(() => {
        if (data1) {
            setAssistantData({
                assistant: data1?.data?.filter(item => item.jabatan !== "Calon Asisten" && item.status === "Aktif").length,
                calas: data1?.data?.filter(item => item.jabatan === "Calon Asisten" && item.status === "Aktif").length,
            })
        }
        if (error1) {
            setAlertOpen(true)
            setAlertContent({
                title: language?.failGet,
                severity: 'error',
                content: ''
            })
            // console.log(error1);
            return
        }

        if (data2) {
            setAttendanceData({
                assistant: data2?.data?.filter(item => item.jabatan !== "Calon Asisten" && item.waktu_datang !== null).length,
                calas: data2?.data?.filter(item => item.jabatan === "Calon Asisten" && item.waktu_datang !== null).length
            })
        }
        if (error2) {
            // console.log(error2);
            setAlertOpen(true)
            setAlertContent({
                title: language?.failGet,
                severity: 'error',
                content: ''
            })
            return
        }

        if (data3) {
            setLeaveData({
                assistant: data3?.data?.filter(item => item.jabatan !== "Calon Asisten" && item.tanggal_izin !== null).length,
                calas: data3?.data?.filter(item => item.jabatan === "Calon Asisten" && item.tanggal_izin !== null).length
            })
        }
        if (error3) {
            // console.log(error3);
            setAlertOpen(true)
            setAlertContent({
                title: language?.failGet,
                severity: 'error',
                content: ''
            })
            return
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data1, data2, data3, error1, error2, error3])

    useEffect(() => {
        document.title = `${language?.home} - Lab ICT Presensi`
    }, [language?.home])

    return (
        <>
            <Container sx={{ py: 5, minHeight: '91.5vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                    <MediumCard
                        purpose='single'
                        data={assistantData.assistant}
                        title={language?.totalActiveassistant}
                        sub1={language?.assistant}
                        loading={loading1}
                    />
                    <MediumCard
                        purpose='single'
                        data={assistantData.calas}
                        title={language?.totalActiveCalas}
                        sub1={language?.calas_l}
                        loading={loading1}
                    />
                    <MediumCard
                        purpose='double'
                        data={attendanceData}
                        title={language?.totalAtdnow}
                        sub1={language?.assistant}
                        sub2={language?.calas_l}
                        path1={(data) => data?.assistant}
                        path2={(data) => data?.calas}
                        loading={loading2}
                    />
                    <MediumCard
                        purpose='double'
                        data={leaveData}
                        title={language?.totalAbsentNow}
                        sub1={language?.assistant}
                        sub2={language?.calas_l}
                        path1={(data) => data.assistant}
                        path2={(data) => data.calas}
                        loading={loading3}
                    />

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <ExportCard exportFunc={handleExportPDF}>
                            <FontAwesomeIcon color="#1976D2" size="5x" icon={faFilePdf} />
                            <Typography variant="h5" sx={{ mt: 2 }}>{language?.exportcard}</Typography>
                            <Typography variant="h5">PDF</Typography>
                        </ExportCard>
                        <ExportCard exportFunc={handleExportExcel}>
                            <FontAwesomeIcon color="#1976D2" size="5x" icon={faFileExcel} />
                            <Typography variant="h5" sx={{ mt: 2 }}>{language?.exportcard}</Typography>
                            <Typography variant="h5">Excel</Typography>
                        </ExportCard>
                    </Box>
                    <Card sx={{ width: '100%', margin: 2 }}>
                        <CardContent>
                            <TabsChartComponent language={language} loading={loading1} data={data1?.data} />
                        </CardContent>
                    </Card>


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
                onClose={() => setModalOpen(false)}
                open={modalOpen}
                modalTitle={`Export ${modalTitle}`}
            >
                <Box sx={{ m: 2 }} component='form' onSubmit={(event) => handleExportModalAcc(event)}>
                    <ExportRenderModal
                        language={language}
                        modalSeter={setModalOpen}
                        handleDateRange={{ dateRangeVal, handleDateRangeChange }}
                        handleRadio={{ radioReportVal, setRadioReportVal }}
                    />
                </Box>

            </ModalMain>
        </>
    )
}

export default HomePage