export default (data = {}, action) => {
    switch(action.type){
        case('GET_MENU'):
            return { ...data, ...action.payload };
        default: return data;
    }
}