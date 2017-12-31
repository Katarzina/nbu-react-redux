export const dateYear = (new Date()).getFullYear() 

export const dateMonth = (new Date()).getMonth()

export const dateDay = (new Date()).getDate()

export const years = () => {
    const beginArrayYear = 2012;
    const endArrayYear = +dateYear
    let arrayYear = []
    for (let i = beginArrayYear; i <= endArrayYear; i++) {
        arrayYear.push(i)
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
