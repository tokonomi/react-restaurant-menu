import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import OrderOption from "./OrderOptions";
import MenuInfo from "./MenuInfo";
import Header from "./Header";

const App = () => {
    return(
        <BrowserRouter>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" exact element={<MenuInfo/>}/>
                    <Route path="/order" exact element={<OrderOption/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;