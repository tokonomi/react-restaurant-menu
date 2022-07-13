export default (times = {}, action) => {
    switch(action.type){
        case "GET_ENDTIME":
            return { ...times, ...action.payload };
        default: return times;
    }
}