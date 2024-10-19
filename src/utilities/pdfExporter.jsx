import jsPDF from "jspdf"
import autoTable from "jspdf-autotable";
import arrayConverter from "./arrayConverter";

const doc = new jsPDF({
    format: 'A4',
    orientation: 'portrait'
})

// const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
const startY = 20
let currentY = startY


const createHeader = () => {

    doc.setFont('times', 'bold')
    doc.setFontSize(18);
    doc.text("Laporan Kehadiran Asisten", pageWidth / 2, currentY, { align: "center" });

    doc.setFont('times', 'normal')
    doc.setFontSize(14);

    currentY += 8 //18
    doc.text("Lab ICT Terpadu Universitas Budi Luhur", pageWidth / 2, currentY, {
        align: "center"
    });

    currentY += 7 //25
    doc.setLineWidth(0.5);
    doc.line(10, currentY, pageWidth - 10, currentY);
};

const createBodyText = (periode, totalDays = 0) => {
    doc.setFontSize(12);
    const firstTextX = 15
    const secondTextX = 45
    currentY += 10 //35
    doc.setFont('times', 'bold')
    doc.text('Periode', firstTextX, currentY)
    doc.setFont('times', 'normal')
    doc.text(`: ${periode?.dateS} s/d ${periode.dateE}`, secondTextX, currentY)

    currentY += 8 //43
    doc.setFont('times', 'bold')
    doc.text('Jumlah Hari', firstTextX, currentY)
    doc.setFont('times', 'normal')
    doc.text(`: ${totalDays}`, secondTextX, currentY)
}

const createBodyTable = (data = []) => {
    currentY += 10//53
    autoTable(doc, {
        head: [['No', 'NIM', 'Nama Asisten', 'Jumlah Hadir', 'Jumlah Lembur', 'Jumlah Izin','Jumlah Kedatangan Awal', 'Jumlah Waktu Keterlambatan']],
        body: arrayConverter(data),
        startY: currentY,
        styles: {
            font: 'times',
            lineWidth: 0.3,
            lineColor: 'black',
            textColor: 'black',
            fontSize: 12,
            halign: 'center',
            valign: 'middle'
        },
        theme: 'grid',
        headStyles: {
            fillColor: '#FFFFFF',
            textColor: 'black',
            lineWidth: 0.3,
            lineColor: 'black',
            halign: 'center'

        }
    })
}

const pdfExporter = (mainData = [], periode={}, totalDays = 0) => {
    currentY = startY
    const fileName = `Rekap absen ${periode?.dateS} s/d ${periode?.dateE}`
    createHeader()
    createBodyText(periode, totalDays)
    createBodyTable(mainData)
    doc.save(`${fileName}.pdf`);
}

export default pdfExporter