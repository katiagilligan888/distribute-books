import moment from 'moment'; 

export const setDaysUntil = () => {
    const todaysDate = moment()
    const eventDate = moment("2019-01-01")
    const daysUntil = eventDate.diff(todaysDate, 'days')
    return {
        type: 'DAYS_UNTIL', 
        payload: daysUntil
    }
}