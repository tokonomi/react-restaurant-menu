export default (menu = {}, action) => {
    switch(action.type){
        case 'PRICES':
            return { ...menu, ...action.payload };
        default:
            return menu
    }
}