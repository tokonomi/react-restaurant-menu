const restaurantData = (data = [], action) => {
    switch(action.type){
        case "RESTAURANT_DATA":
            return [ ...data, ...action.payload ]
        default:
            return data
    }
}

export default restaurantData;