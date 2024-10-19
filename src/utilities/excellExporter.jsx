import { Workbook } from 'exceljs'
import arrayConverter from './arrayConverter';


const excellExporter = (mainDatas = [], periode = {}, totalDays = 0) => {
    const mainData = arrayConverter(mainDatas)
    const fileName = `Rekap absen ${periode?.dateS} s/d ${periode?.dateE}`
    const _workBook = new Workbook()
    const sheet = _workBook.addWorksheet('sheet 1')

    sheet.getCell('A1').value = 'Laporan Kehadiran Asisten';
    sheet.mergeCells('A1:H1')
    sheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell('A1').font = { size: 18, name: 'times', bold: true }

    sheet.getCell('A2').value = 'Lab ICT Terpadu Universitas Budi Luhur';
    sheet.mergeCells('A2:H2')
    sheet.getCell('A2').alignment = { horizontal: 'center', vertical: 'middle' }
    sheet.getCell('A2').font = { size: 14, name: 'times', bold: true }

    sheet.getCell('A3').value = 'Periode';
    sheet.mergeCells('A3:B3')
    sheet.getCell('A3').alignment = { horizontal: 'left', vertical: 'middle' }
    sheet.getCell('A3').font = { size: 12, name: 'times', bold: true }

    sheet.getCell('C3').value = `: ${periode?.dateS} s/d ${periode.dateE}`;
    sheet.mergeCells('C3:H3')
    sheet.getCell('C3').alignment = { horizontal: 'left', vertical: 'middle' }
    sheet.getCell('C3').font = { size: 12, name: 'times' }

    sheet.getCell('A4').value = 'Jumlah Hari';
    sheet.mergeCells('A4:B4')
    sheet.getCell('A4').alignment = { horizontal: 'left', vertical: 'middle' }
    sheet.getCell('A4').font = { size: 12, name: 'times', bold: true }

    sheet.getCell('C4').value = `: ${totalDays}`;
    sheet.mergeCells('C4:H4')
    sheet.getCell('C4').alignment = { horizontal: 'left', vertical: 'middle' }
    sheet.getCell('C4').font = { size: 12, name: 'times' }

    sheet.getColumn(1).width = 5
    sheet.getColumn(2).width = 15
    sheet.getColumn(3).width = 20
    sheet.getColumn(4).width = 10
    sheet.getColumn(5).width = 10
    sheet.getColumn(6).width = 10
    sheet.getColumn(7).width = 20
    sheet.getColumn(8).width = 20

    const headers = ['No', 'NIM', 'Nama Asisten', 'Jumlah Hadir', 'Jumlah Lembur', 'Jumlah Izin', 'Jumlah Kedatangan Awal', 'Jumlah Waktu Keterlambatan'];
    headers.forEach((header, index) => {
        const cell = sheet.getCell(6, index + 1);
        cell.value = header;
        cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' }
        cell.font = { bold: true, size: 12, name: 'times' };

        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    });

    mainData.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {
            const cell = sheet.getCell(rowIndex + 7, columnIndex + 1);
            sheet.getRow(rowIndex + 7).height = 40
            cell.font = { bold: false, size: 12, name: 'times' };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }

            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };

            cell.value = value;
        });
    });

    _workBook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], {
            type: "application/vnd.opexmlformats-officedocument.spreadsheet.sheet"
        })
        const url = window.URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = `${fileName}.xlsx`
        anchor.click()
        window.URL.revokeObjectURL(url);
    })

}

export default excellExporter