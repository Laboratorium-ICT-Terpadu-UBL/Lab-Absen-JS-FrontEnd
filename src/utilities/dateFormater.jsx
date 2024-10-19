const dateFormater = (isoTimeString, region = "id-ID") => {
    const dateObject = new Date(isoTimeString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat(region, options).format(dateObject);
    return formattedDate
}

export const formatLocalDateISO = (isoTimeString, UTC = 0) => {
    const date = new Date(isoTimeString)
    date.setUTCHours(date.getUTCHours() + UTC);
    const localDate = date.toISOString();
    return localDate
}

export const shortDateFormater = (isoDateString, UTC = 0) => {
    const currentDate = new Date(isoDateString);
    currentDate.setUTCHours(currentDate.getUTCHours() + UTC)
    const formattedDate = currentDate.toISOString().slice(0, 10);

    return formattedDate
}

export default dateFormater