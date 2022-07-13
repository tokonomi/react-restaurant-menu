import React, { useState } from "react";
import { connect } from "react-redux";

import CreateOrder from "./CreateOrder";
import { updatePostStatus } from "../actions";

const OrderOption = ({orderInfo,  updatePostStatus}) => {


    

    function returnStatus(status){
        if(status && status !== "Hazirlanir"){
            return "Hazirdir"
        }else if(status === "Hazirlanir"){
            return "Hazirlanir"
        }else return "Legv olundu"
    }
    
    function cancelOrder(id){
        updatePostStatus(id, false)
    }

    function finishOrder(id){
        updatePostStatus(id, true)
    }
    function returnBtns(element, status){
        if(status && status !== "Hazirlanir"){
            return ""
        }else if(status === "Hazirlanir"){
            return (
            <div className="order_manage">
                <button onClick={() => {
                cancelOrder(element.id)
                }} className="ui button canc">Legv etmek</button>
                <button onClick={() => {
                    finishOrder(element.id)
                }}  className="ui positive button canc">Hazir</button>
            </div>
            )
        }else{
            return(
                <div className="order_manage">
                    <button disabled className="ui button canc">Legv olunub</button>
                </div>
            )
        }
    }

    function setStyle(status){
        if(status && status !== "Hazirlanir"){
            return {color: 'green'}
        }else if(status === "Hazirlanir"){
            return {color: 'brown'}
        }else return {color: 'red'}
    }

    let commonPrice = 0

    orderInfo.forEach(element => {
        commonPrice += Number(element.commonPrice)
    });



    const renderedContent = () => {
        return orderInfo.map((el, i) => {
            return (

                <li className="order_info" key={i}>
                    <div>{el.tableNum}</div>
                    <div>{el.productName}</div>
                    <div>{el.amount}</div>
                    <div>{el.commonPrice / el.amount}</div>
                    <div>{el.time}</div>
                    <div>{el.endTime} deq</div>
                    <div style={setStyle(el.status)}>{returnStatus(el.status)}</div>
                    {returnBtns(el, el.status)}
                </li>
            )
        })
    }

    const [ createWindow, setOpenCreateWindow ] = useState(false)
    return(
        <div className="order_options_block">
            <div className="options">
                <ul className="info_list">
                    <li className="order_info">
                        <div>Masa</div>
                        <div>Mehsul</div>
                        <div>Miqdar</div>
                        <div>Mebleg</div>
                        <div>Sifaris saati</div>
                        <div>Gozleme</div>
                        <div className="order_status">Status</div>
                        <div>Imtina</div>
                    </li>
                    {renderedContent()}
                </ul>
                <div className="finish_block">
                    <div>
                        <h4>Cemi mebleg</h4>
                        <span>{commonPrice.toFixed(2)}</span>
                    </div>
                    <button className="ui active button" onClick={
                        () => {
                            setOpenCreateWindow(true)
                        }
                    }>Elave et</button>
                </div>
            </div>
            { createWindow && <CreateOrder closeCreateOrder = { setOpenCreateWindow }/> }
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        orderInfo: state.orderInfo
    }
}

export default connect(mapStateToProps, { updatePostStatus})(OrderOption);