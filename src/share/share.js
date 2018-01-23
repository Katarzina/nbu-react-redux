export const dateYear = (new Date()).getFullYear()

export const dateMonth = (new Date()).getMonth()

export const dateDay = (new Date()).getDate()
// fill years array from 2012 to present
export const years = () => {
    const beginArrayYear = 2012;
    const endArrayYear = +dateYear
    let arrayYear = []
    for (let i = beginArrayYear; i <= endArrayYear; i++) {
        arrayYear.push(i)
    }
    return arrayYear;
}
//fill days array from 1 to 31
export const days = () => {
    let arrayDays = []
    for (let i = 1; i <= 31; i++) {
        arrayDays.push(i)
    }
    return arrayDays;
}
