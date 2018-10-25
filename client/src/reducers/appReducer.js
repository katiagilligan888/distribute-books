

export default (state = {}, action) => {
    switch(action.type){
        case 'DAYS_UNTIL':
            return action.payload;
        default:
            return state; 
    }
}