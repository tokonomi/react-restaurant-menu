import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import { getRestaurantData, getPrices, getMenuData } from "../actions"
import '../styles/styles.scss'

const MenuInfo = (props) => {
        useEffect(() => {
            if(!props.restaurantData.length){
                props.getRestaurantData()
                props.getPrices()
            }
        },[])
    
    let [modalWindow, setModalWindow] = useState(false)
    props.restaurantData.sort((a, b) => {
        if(a.status > b.status) return 1;
        if(a.status < b.status) return -1;
        return 0
    })

    let renderedContent = () => {
            return props.restaurantData.map(el => {
                let status = '',
                    price = 0

                if(el.status){ // Получаю статус
                    status = 'Sonlanib'
                }else{
                    status = 'Sonlanmayib'
                }

                el.menu.map(product => {
                    price += props.pricesMenu[product] * el.order_amount[product]
                }) // Получаю общую цену

                return(
                    <li key={el.serial_number} className = 'restaurant_data'>
                        <div>{el.serial_number}</div>
                        <div>{el.table}</div>
                        <div>{el.servant}</div>
                        <div>{status}</div>
                        <div>{price.toFixed(2)}</div>
                        <div>
                            <button onClick={() => {
                                props.getMenuData(el)
                                setModalWindow(true)
                            }} className="ui primary button">Etrafli</button>
                        </div>
                    </li>
                )
            })
        }
    return(
            <div>
                {modalWindow && <Modal closeModalWindow = { setModalWindow }/>}
                <ul className="data_list">
                    <li className = 'restaurant_data'>
                        <div>Sira sayi</div>
                        <div>Masa</div>
                        <div>Xidmetci</div>
                        <div>Status</div>
                        <div>Qiymet</div>
                    </li>
                    {renderedContent()}
                </ul>
            </div>
        
    )
}

const mapStateToProps = (state) => {
    return{
        restaurantData: state.restaurantData,
        pricesMenu: state.pricesMenu
    }
}

export default connect(mapStateToProps, {getRestaurantData, 
                                         getPrices, 
                                         getMenuData})(MenuInfo);