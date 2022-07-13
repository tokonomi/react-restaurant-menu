import React from "react";
import { connect } from "react-redux";

import '../styles/styles.scss'

const Modal = ({closeModalWindow, menuData, pricesMenu}) => {
    let status = '',
        price = 0

    if(menuData.status){ // Получаю статус
        status = 'Sonlanib'
    }else{
        status = 'Sonlanmayib'
    }
    

    
    const renderedContent = () => {
        return(
            menuData.menu.map(el => {
                price += pricesMenu[el] * menuData.order_amount[el] // Получаю общую цену
                return(
                    <div key={el} className="item list_item">
                        <span className="content">{el}</span>
                        <div className="right floated content">
                            <span>
                                {pricesMenu[el]} x {menuData.order_amount[el]}
                            </span>
                        </div>
                    </div>
                )
            })
        )
    }
    
    return(
        <div className="modal">
            <div className="detailed_block"> 
            <div className="close_btn" onClick={() => closeModalWindow(false)}><i className="close icon"></i></div>
                <div className="table_menu">
                    <div className="ui middle aligned divided list">
                        {renderedContent()}
                    </div>
                    <div className="end_data">
                        <span>Cemi qiymet: {price.toFixed(2)}</span>
                        <span>Xidmetci: {menuData.servant}</span>
                    </div>
                </div>
                <div className="table_status">
                    <span className="status">Status: {status}</span>
                    <span className="end_time">Sonlanma vaxti: <br></br> {menuData.end_date}</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        menuData: state.menuData,
        pricesMenu: state.pricesMenu
    }
}

export default connect(mapStateToProps)(Modal);