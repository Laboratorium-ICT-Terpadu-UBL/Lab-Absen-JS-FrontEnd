import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


// eslint-disable-next-line react/prop-types
const TableExportPage = ({ data=[] }) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">No</TableCell>
                        <TableCell align="center">NIM</TableCell>
                        <TableCell align="center">Nama</TableCell>
                        <TableCell align="center">Jumlah Hadir</TableCell>
                        <TableCell align="center">Jumlah Lembur</TableCell>
                        <TableCell align="center">Jumlah Izin</TableCell>
                        <TableCell align="center">Jumlah Kedatangan Awal</TableCell>
                        <TableCell align="center">Jumlah Waktu Keterlambatan</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, index) => (
                        <TableRow
                            key={row.nim}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{row.nim}</TableCell>
                            <TableCell align="left">{row.nama}</TableCell>
                            <TableCell align="center">{row.jumlah_hadir}</TableCell>
                            <TableCell align="center">{row.jumlah_presensi_lembur}</TableCell>
                            <TableCell align="center">{row.jumlah_izin}</TableCell>
                            <TableCell align="center">{row.jumlah_kedatangan_awal}</TableCell>
                            <TableCell align="center">{row.jumlah_keterlambatan}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableExportPage