export default (state = [], action) => {
    switch(action.type){
        case "CREATE_ORDER":
            return [ ...state, action.payload ];
        case "UPDATE_STATUS":
            const i = action.id
            return[
                ...state.slice(0, i),
                { ...state[i], status: action.status, commonPrice: action.status ? state[i].commonPrice : 0 },
                ...state.slice(i + 1)
            ]
        default: return state;
    }
}