import moment from "moment";
const daysCalculation = (startIsoString, endIsoString) => {
    const startDate = moment(startIsoString)
    const endDate = moment(endIsoString);

    const daysDifference = endDate.diff(startDate, 'days');

    return daysDifference
}

export default daysCalculation