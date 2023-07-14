import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'


import map from '../img/map.svg'
import './Map.css'

import Marker from './Marker.js'

const scale = 8;
// const mapSizing = {x: }

const Map = ( props ) => {
    console.log(props.markers)
    const objectRef = useRef(null);
    const controlRef = useRef(null);
    const wrapperRef = useRef(null);
    const [isDragging, setDragging] = useState(false);
    const [transform, setTransform] = useState('');
    const [shiftX, setShiftX] = useState(0);
    const [shiftY, setShiftY] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    useEffect(() => {
        const control = controlRef.current;
        const object = objectRef.current;
        const sensitivity = 0.7;

        // Центрирование карты
        object.style.transform = `translate(${shiftX}px, ${shiftY}px)`;

        control.onmousedown = (e) => {
            setDragging(true);
            setStartX(e.clientX);
            setStartY(e.clientY);
        };
        control.onmouseup = () => { setDragging(false); };
        control.onmousemove = (e) => {
            if (!isDragging) return;
            const tmpShiftX = shiftX + (e.clientX - startX) * sensitivity;
            const tmpShiftY = shiftY + (e.clientY - startY) * sensitivity;
            if (Math.abs(tmpShiftX) <= 200*scale)
                setShiftX(tmpShiftX);
            if (Math.abs(tmpShiftY) <= 142*scale)
                setShiftY(tmpShiftY);
    
            setStartX(e.clientX);
            setStartY(e.clientY);
            
            let tr = `translate(${shiftX}px, ${shiftY}px)`;
            object.style.transform = tr;
            // console.log('drag', e.movementX, e.movementY, tr, object.style.transform, e.clientX - startX, e.clientY - startY);
        }
        control.ondragstart = (e) => {
            e.preventDefault();
        }

        control.ontouchstart = (e) => {
            setDragging(true);
            setStartX(e.touches[0].clientX);
            setStartY(e.touches[0].clientY);
        }
        control.ontouchend = (e) => {
            setDragging(false);
        }
        control.ontouchmove = (e) => {
            console.log('dg', e);
            if (!isDragging) return;
            
            const tmpShiftX = shiftX + (e.touches[0].clientX - startX) * sensitivity;
            const tmpShiftY = shiftY + (e.touches[0].clientY - startY) * sensitivity;
            if (Math.abs(tmpShiftX) <= 200*scale)
                setShiftX(tmpShiftX);
            if (Math.abs(tmpShiftY) <= 142*scale)
                setShiftY(tmpShiftY);

            setStartX(e.touches[0].clientX);
            setStartY(e.touches[0].clientY);
            let tr = `translate(${shiftX}px, ${shiftY}px)`;
            object.style.transform = tr;
            console.log('drag', e.movementX, e.movementY, tr, object.style.transform, e.touches[0].clientX - startX, e.touches[0].clientY - startY);
        }

    }, [isDragging, startX, startY]);

    useEffect(() => {
        const canvas = objectRef.current;
        const wrapper = wrapperRef.current;

        const padding = 6; // potential bug  
        let posX = wrapper.offsetWidth - padding;
        let posY = wrapper.offsetHeight / 2 - padding;
        if ('centerAt' in props) {
            posX += props.centerAt?.x * scale * -1 - canvas.offsetWidth + document.body.offsetWidth / 2;
            posY += props.centerAt?.y * scale * -1;
        }
        setShiftX(posX);
        setShiftY(posY);
        setTransform(`translate(${posX}px, ${posY}px)`);
        console.log("Center map:", transform);
    }, [props.centerAt]);

    return (
        <div ref={wrapperRef} className={'zhdanMap' + (props.className ? ' ' + props.className : '')} id={props.id}>

            <div ref={objectRef} className='zhdanMap__canvas' style={{ transform: transform }}>
                <object className="zhdanMap__map" data={map}></object>
                {
                    props.markers.map(el => <Marker key={el.name} style={{ transform: `translate(${el.posX * scale}px, ${el.posY * scale}px)` }} onClick={el.onClick} />)
                }
            </div>
            <div ref={controlRef} className='zhdanMap__control'></div>

        </div>
    );
}

Map.proptypes = {
    id: PropTypes.integer,
    className: PropTypes.string,
    markers: PropTypes.array,
    centerAt: PropTypes.array, // {x: 1, y: 9}
}

export default Map;

