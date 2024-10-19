/* eslint-disable react/prop-types */
import { Box, Tab, Tabs, Typography } from "@mui/material"
import { BarChart, PieChart } from "@mui/x-charts";
import { useState } from "react";
import RootLoading from "./RootLoading";
import chartFormater from "../utilities/chartFormater";

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const barChartSetting = (lang) => {
    return {
        yAxis: [
            {
                label: lang.assistant,
            },
        ],
        width: 400,
        height: 300,
    }
};
const valueFormatter = (value) => `${value} Asisten`;

const dataKeyFormater = (value) => {
    const formattedKeys = Object.keys(value ||[])
        .filter(key => key !== 'name')
        .map(dataKey => ({
            dataKey,
            label: dataKey.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' \n'),
            valueFormatter
        }));

    return formattedKeys
}


const TabsChartComponent = ({ data, loading, language }) => {

    const formatedData = chartFormater(data || [])

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            {loading ? (<RootLoading />) : (
                <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label={language?.facultDep} {...a11yProps(0)} />
                            <Tab label={language?.gender} {...a11yProps(1)} />
                            <Tab label={language?.entryYear} {...a11yProps(2)} />
                            <Tab label={language?.position} {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {
                                Object.keys(formatedData?.fakultas).map((item, index) => (
                                    <BarChart
                                        key={index}
                                        dataset={formatedData?.fakultas[item].data}
                                        xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                                        series={dataKeyFormater(formatedData?.fakultas[item].data[0])}
                                        slotProps={{
                                            legend: {
                                                direction: 'column',
                                                position: { vertical: 'middle', horizontal: 'right' },
                                            },
                                        }}
                                        margin={{
                                            left: 40,
                                            right: 155,
                                            top: 80,
                                            bottom: 80,
                                        }}
                                        {...barChartSetting(language)}
                                    />
                                ))
                            }
                        </Box>

                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <PieChart
                            series={[{
                                ...formatedData?.jenis_kelamin,
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 2,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 180,
                                cx: 150,
                                cy: 150,

                            }]}
                            width={400}
                            height={300}
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { vertical: 'bottom', horizontal: 'middle' },
                                },
                            }}
                            margin={{
                                left: 50,
                                right: 50,
                                top: 0,
                                bottom: 50,
                            }}
                        />
                        <Typography sx={{ margin: 2 }}>{`Total ${formatedData?.jenis_kelamin.total} ${language?.assistant}`}</Typography>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <PieChart
                            series={[{
                                ...formatedData?.tahun_masuk,
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 2,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 180,
                                cx: 150,
                                cy: 150,

                            }]}
                            width={400}
                            height={300}
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { vertical: 'bottom', horizontal: 'middle' },
                                    padding: 0,
                                },
                            }}
                            margin={{
                                left: 50,
                                right: 50,
                                top: 0,
                                bottom: 50,
                            }}
                        />
                        <Typography sx={{ margin: 2 }}>{`Total ${formatedData?.tahun_masuk.total} ${language?.assistant}`}</Typography>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <PieChart
                            series={[{
                                ...formatedData?.jabatan,
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 2,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 180,
                                cx: 150,
                                cy: 150,

                            }]}
                            width={400}
                            height={300}
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { vertical: 'bottom', horizontal: 'middle' },
                                    padding: 0,
                                },
                            }}
                            margin={{
                                left: 50,
                                right: 50,
                                top: 0,
                                bottom: 50,
                            }}

                        />
                        <Typography sx={{ margin: 2 }}>{`Total ${formatedData?.jabatan.total} ${language?.assistant}`}</Typography>
                    </CustomTabPanel>
                </>
            )}

        </Box>
    );
}

export default TabsChartComponent