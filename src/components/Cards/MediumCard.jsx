import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material"

const MediumCard = ({ purpose, title, sub1, sub2, data, path1, path2, loading }) => {
    const renderItem = () => {
        switch (purpose) {
            case 'single':
                return (
                    <Card sx={{ minWidth: 540, width: { xs: '100%', md: 'auto' }, margin: 2 }}>
                        <CardContent>
                            <Typography>
                                {title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', my: 2 }}>
                                <Typography variant="h3">{loading ? (<Skeleton sx={{ minWidth: 50 }} />) : data}</Typography>
                                <Typography variant="h5">{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : sub1}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                )
            case 'double':
                return (
                    <Card sx={{ minWidth: 540, width: { xs: '100%', md: 'auto' }, margin: 2 }}>
                        <CardContent>
                            <Typography>
                                {title}
                            </Typography>
                            <Box sx={{ display: 'flex', my: 2 }}>
                                <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRightStyle: 'solid', borderRightWidth: 'thin' }}>
                                    <Typography variant="h3">{loading ? (<Skeleton sx={{ minWidth: 50 }} />) : path1(data)}</Typography>
                                    <Typography variant="h5">{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : sub1}</Typography>
                                </Box>
                                <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', borderLeftStyle: 'solid', borderLeftWidth: 'thin' }}>
                                    <Typography variant="h3">{loading ? (<Skeleton sx={{ minWidth: 50 }} />) : path2(data)}</Typography>
                                    <Typography variant="h5">{loading ? (<Skeleton sx={{ minWidth: 100 }} />) : sub2}</Typography>
                                </Box>

                            </Box>
                        </CardContent>
                    </Card>
                )
        }
    }

    return renderItem()
}

export default MediumCard