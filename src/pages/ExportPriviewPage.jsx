/* eslint-disable react/prop-types */
import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import dateFormater, { shortDateFormater } from "../utilities/dateFormater";
import daysCalculation from "../utilities/daysCalculation";
import TableExportPage from "../components/Tables/TableExportPage";
import pdfExporter from "../utilities/pdfExporter";
import excellExporter from "../utilities/excellExporter";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { enLang, idLang } from "../utilities/languageTextConfig";
import { useGet } from "../hooks/dataHandler";
import exportDataArrange from "../utilities/exportDataArrange";

const RenderView = ({ state, language = {}, isEnLang }) => {
    const { data, error, execute } = useGet("export", true, false)
    const { type, dateRange, radioReport } = state
    const { dateRange1, dateRange2 } = dateRange
    const [mainData, setMainData] = useState([])
    // console.log(dateRange1);


    const handleButonCLick = () => {
        if (type === 'pdf') {
            pdfExporter(exportDataArrange(mainData), {
                dateS: dateFormater(dateRange1),
                dateE: dateFormater(dateRange2)
            }, daysCalculation(dateRange1, dateRange2))
        } else {
            excellExporter(exportDataArrange(mainData), {
                dateS: dateFormater(dateRange1),
                dateE: dateFormater(dateRange2)
            }, daysCalculation(dateRange1, dateRange2))
        }
    }

    useEffect(() => {
        execute({
            params: {
                dateS: shortDateFormater(dateRange1),
                dateE: shortDateFormater(dateRange2),
                position: radioReport
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (data) {
            setMainData(data?.data)
            //handle data
        }
        if (error) {
            //handle error
        }
    }, [data, error])
    return (
        <>
            <Card sx={{ py: 2 }} >
                <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="h4">{language?.previewAtdRerport}</Typography>
                    <Typography variant="h5">{dateFormater(dateRange1, isEnLang ? 'en-EN' : 'id-ID')} {language?.to} {dateFormater(dateRange2, isEnLang ? 'en-EN' : 'id-ID')}</Typography>
                </CardContent>
            </Card>
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleButonCLick} variant="contained">{language?.print} {type.toUpperCase()}</Button>
            </Box>
            <Card sx={{ py: 2 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', my: 1 }}>
                        <Box sx={{ width: '15%' }}>
                            <Typography>Periode</Typography>
                        </Box>
                        <Box sx={{ width: '85%' }}>
                            <Typography>: {dateFormater(dateRange1)} S/d {dateFormater(dateRange2)}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', my: 1 }}>
                        <Box sx={{ width: '15%' }}>
                            <Typography>Jumlah Hari</Typography>
                        </Box>
                        <Box sx={{ width: '85%' }}>
                            <Typography>: {daysCalculation(dateRange1, dateRange2)}</Typography>
                        </Box>
                    </Box>
                    <TableExportPage data={mainData} />
                </CardContent>
            </Card>
        </>
    )
}

const RenderNull = ({ language }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Typography color='text.primary' variant="h1">{language?.noData}</Typography>
        </Box>
    )
}

const ExportPriviewPage = () => {
    const { state = {} } = useLocation()
    const { isEnLang } = useSelector(state => state.languages)
    const language = isEnLang ? enLang : idLang


    useEffect(() => {
        document.title = `Export ${state ? state.type.toUpperCase() : ''} - Lab ICT Presensi`
    }, [state])


    return (
        <Container sx={{ py: 5, minHeight: '91.5vh' }}>
            {state ? <RenderView language={language} state={state} isEnLang={isEnLang} /> : <RenderNull language={language} />}
        </Container>
    )
}
export default ExportPriviewPage;