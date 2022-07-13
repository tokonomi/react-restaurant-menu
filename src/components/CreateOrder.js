import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getPrices, getRestaurantInfo, createOrder, getEndTime } from "../actions"
import renderContent from "../inits/renderContent";

const CreateOrder = ({menu, restaurantInfo, endTime, orderInfo, getPrices, getRestaurantInfo, createOrder, closeCreateOrder, getEndTime}) => {
    
    const [ tableNum, setTableNum] = useState('M1'),
          [ servant, setServant ] = useState('Emin'),
          [ productName, setProductName ] = useState('Sote edilmiş midye'),
          [ amount, setAmount ] = useState(0) // Собираю всю форму 

    const [ commonPrice, setCommonPrice ] = useState(0) // Ипользую Хук для ререндринга компонента
    
    useEffect(() => {
        getEndTime()
        getPrices()
        getRestaurantInfo()
    }, []) // Получаю объекты с данными при загрузки компонента

    const disabledBtn = () => {
        if(commonPrice < 1){
            return 'disabled'
        }else return ''
    } // Использую что бы отключить отправку если указано некорректное к-во меню.

    const menuList = () => {
        let menuArr = []
        for(let value of Object.keys(menu)){
            menuArr.push(value)
        }
        return menuArr;
    } // Превращаю объект ключей в массив

    const addOrder = (event) => {
        event.preventDefault()
        const formData = {
            id: orderInfo.length,
            tableNum,
            servant,
            productName,
            amount,
            commonPrice,
            time: new Date().toLocaleTimeString(),
            endTime: endTime[productName],
            status: "Hazirlanir"
        }
        createOrder(formData)
        closeCreateOrder(false)
    }

    return(
        <div className="create_block">
            <form className="ui form" id="order_infos">
                <div className="fields">
                    <div className="field">
                        <label>Masa</label>
                        <select id="tableNum" name="xidmetci" onChange={(event) => {
                            setTableNum(event.target.value)
                        }}>
                            {renderContent(restaurantInfo.tables)}
                        </select>
                    </div>
                    <div className="field">
                        <label>Xidmetci</label>
                        <select id="servant" name="xidmetci" onChange={(event) => {
                            setServant(event.target.value)
                        }}>
                            {renderContent(restaurantInfo.employees)}
                        </select>
                    </div>
                    <div className="field">
                        <label>Mehsul adi</label>
                        <select
                            id="menu_dropdown"
                            name="mehsul_adi"
                            onChange={(event) => {
                                    let product = document.querySelector('#price').value;
                                    setCommonPrice((product * menu[event.target.value]).toFixed(2))
                                    setProductName(event.target.value)
                                }} className="ui fluid search dropdown">
                                {renderContent(menuList())}
                        </select>
                    </div>
                    <div className="field price_field">
                        <div>
                            <label>Miqdar</label>
                            <input id="price" type="number" max="99" name="miqdar" placeholder="Miqdar" onChange={(event) => {
                                                                                                event.preventDefault()
                                                                                                let product = document.querySelector('#menu_dropdown').value;
                                                                                                if (event.target.value.length < 3) {
                                                                                                    setCommonPrice((event.target.value * menu[product]).toFixed(2))
                                                                                                }else{
                                                                                                    event.target.value = event.target.value.slice(0,2); 
                                                                                                }
                                                                                                setAmount(event.target.value)
                                                                                            }}/>
                        </div>
                        <div className="common_price">
                            <label>Qiymet</label>
                            <p>{commonPrice}</p>
                        </div>
                    </div>
                    <div className="ui buttons confirmation">
                        <button className="ui button" onClick={(e) => {
                            e.preventDefault()
                            closeCreateOrder(false)
                        }}>Legv etmek</button>
                        <div className="or"></div>
                        <button className="ui positive button" disabled={disabledBtn()} onClick={addOrder}>Elave et</button>
                    </div>
                </div>
            </form>
        </div>
    )
}   

const mapStateToProps = (state) => {
    return{
        menu: state.pricesMenu,
        restaurantInfo: state.restaurantInfo,
        orderInfo: state.orderInfo,
        endTime: state.endTime
    }
}

export default connect(mapStateToProps, {
                                        getPrices,
                                        getRestaurantInfo,
                                        createOrder,
                                        getEndTime
                                        })(CreateOrder);