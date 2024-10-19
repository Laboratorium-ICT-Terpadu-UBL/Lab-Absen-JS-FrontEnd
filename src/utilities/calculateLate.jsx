const calculateLate = (data = [], hour = 1, minute = 0) => {
    const result = data.map(item => {
        if (item.waktu_datang !== null && item.waktu_datang !== '') {
            const splitStart = item.waktu_datang.split(':');
            const startTime = new Date(0, 0, 0, splitStart[0], splitStart[1], splitStart[2])
            const endTime = new Date(0, 0, 0, hour, minute, 0)
            const diff = endTime.getTime() - startTime.getTime();
            const result = Math.floor(diff / 1000 / 60)
            let terlambat
            if (result >= 0) {
                terlambat = 0
            } else {
                terlambat = Math.abs(result)
            }

            return { ...item, terlambat };
        } else {
            return { ...item, terlambat: null };
        }
    });
    return result;
}

export default calculateLate;