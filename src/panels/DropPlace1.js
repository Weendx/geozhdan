import React, { useState, useRef, useEffect } from "react";
import {Text} from '@vkontakte/vkui';

import "./DropPlaces.css";

import start from "../img/start.png";

export default function DropPlace1() {
    let style = { container: "dropdown", button: "dropdown__button", dropdown: "dropdown__body" };
    const container = useRef();
    const [dropdownState, setDropdownState] = useState({ open: false });
    const handleDropdownClick = () => setDropdownState({ open: !dropdownState.open });
    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropdownState({ open: false });
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className={style.container} ref={container}>
            <button type="button" className={style.button} onClick={handleDropdownClick}><p className="dropdown__battons">Название кокого-то места</p></button>
            {dropdownState.open && (
                <div className={style.dropdown}>
                    <div class="dropdown__item">
                        <img src={start} width='100'></img>
                        <Text>popfhdf</Text>
                    </div>
                </div>
            )}
        </div>
    );
}