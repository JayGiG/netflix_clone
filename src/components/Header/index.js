import React from 'react';
import './style.css';


export default( {black} ) => {
    return (
        <header className={black ? "black" : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=21" />
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src="https://i.pinimg.com/564x/cb/13/06/cb1306491f682c84af42d597c1132f2d.jpg" />
                </a>
            </div>
        </header>
    );
}