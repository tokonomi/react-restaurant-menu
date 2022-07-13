import menuData from "../data/data.json"

export const getRestaurantData = () => {
    return{
        type: "RESTAURANT_DATA",
        payload: menuData.info
    }
}

export const getPrices = () => {
    return{
        type: "PRICES",
        payload: menuData.menu_prices
    }
}

export const getMenuData = (data) => {
    return{
        type: "GET_MENU",
        payload: data
    }
}

export const getRestaurantInfo = () => {
    return{
        type: "INFO",
        payload: menuData.restaurant
    }
}

export const createOrder = (data, id, status) => {
    return{
        type: "CREATE_ORDER",
        payload: data,
        id,
        status
    }
}

export const getEndTime = () => {
    return{
        type: "GET_ENDTIME",
        payload: menuData.cooking_time
    }
}

export const updatePostStatus = (id, status) => {
    return{
        type: "UPDATE_STATUS",
        id,
        status
    }
}