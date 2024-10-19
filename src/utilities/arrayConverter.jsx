const arrayConverter = (obj = []) => {
    const converted = obj.map((data) => {
        const toArr = Object.values(data)
        return toArr
    })
    return converted
}

export default arrayConverter