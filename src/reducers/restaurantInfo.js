export default (info = {}, action) => {
    switch(action.type){
        case "INFO":
            return { ...info, ...action.payload };
        default: return info
    }
}