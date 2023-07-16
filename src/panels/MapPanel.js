import React, {useRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import Map from '../components/Map.js'

let markers = [
    {"name": "Marker Central", "posX": 56, "posY": 83, onClick: () => {alert("им. Адясова")}},
	{"name": "Marker Adm", "posX": 55, "posY": 56.5},
    {"name": "Marker Warehouse", "posX": 80, "posY": 54},
    {"name": "Marker ShipCafe", "posX": 10, "posY": 49},
    {"name": "Marker Banya", "posX": 65, "posY": 141},
    {"name": "Marker nast.tennis", "posX": 192, "posY": 115},
    {"name": "zero", "posX": 0, "posY": 0}
];
// {"name": 12, "desc": 12, "info": 12, "id": 1, "dest": "132", "markerPos": {x: 1, y: 2}}

const MapPanel = props => {

    const headerRef = useRef(null);
    const mapRef = useRef(null);
    const [mapShift, setShift] = useState({x: 10, y: 49});

    useEffect(() => {
        if (headerRef.current == null)
            headerRef.current = document.getElementById('mappanel__header');
        if (mapRef.current == null)
            mapRef.current = document.getElementById('mappanel__map');
        if (mapRef.current && headerRef.current) {
            // setShift({x: 0, y: 0})
            console.log(mapRef, headerRef);
            const padding = 6;
            const width = document.body.offsetWidth - padding;
            const height = document.body.offsetHeight - headerRef.current.offsetHeight - padding;
            mapRef.current.style.width = width + 'px';
            mapRef.current.style.height = height + 'px';
            
        }
    }, [headerRef, mapRef]);

    return (
    <Panel id={props.id}>
		<PanelHeader
			before={<PanelHeaderBack onClick={props.go} data-to="home" />}
            id="mappanel__header"
		>
			Карта
		</PanelHeader>
		<Map id="mappanel__map" markers={markers} centerAt={mapShift}/>
	</Panel>
    );
}

MapPanel.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
    mapCenterAt: PropTypes.array // {x: 0, y: 0}
};

export default MapPanel;
