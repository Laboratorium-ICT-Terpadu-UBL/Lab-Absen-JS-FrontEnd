import { Box, Button, Card, CardActions, CardContent } from "@mui/material"

// eslint-disable-next-line react/prop-types
const ExportCard = ({children, exportFunc}) => {
    return (
        <Card sx={{ minWidth: 300, margin: 2 }}>
            <CardContent sx={{ pb: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', my: 2 }}>
                  {children}
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pt: 0, pb: 2 }} >
                <Button variant="contained" onClick={exportFunc}>
                    Export
                </Button>
            </CardActions>
        </Card>
    )
}

export default ExportCard