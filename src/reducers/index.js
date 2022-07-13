import { combineReducers } from "redux";

import restaurantData from "./restaurantData";
import pricesMenu from "./pricesMenu";
import menuData from "./menuData";
import restaurantInfo from "./restaurantInfo";
import orderInfo from "./orderInfo";
import endTime from "./endTime";



export default combineReducers({
    restaurantData,
    pricesMenu,
    menuData,
    restaurantInfo,
    orderInfo,
    endTime
})