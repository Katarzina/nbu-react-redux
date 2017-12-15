export const dateYear = (new Date()).getFullYear().toString()

export const dateMonth = (new Date()).getMonth().toString()

export const dateDay = (new Date()).getDate().toString()

export const years = () => {
    const beginArrayYear = 2012;
    const endArrayYear = parseInt(dateYear, 10);
    let arrayYear = []
    for (let i = beginArrayYear; i <= endArrayYear; i++) {
        arrayYear.push(i.toString())
    }
    return arrayYear;
}

export const days = () => {
    let arrayDays = []
    for (let i = 1; i <= 31; i++) {
        arrayDays.push(i)
    }
    return arrayDays;
}
