import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import Map from '../components/Map.js'

const markers = [
    {"name": "Marker Central", "posX": 56, "posY": 83, onClick: () => {alert("им. Адясова")}},
	{"name": "Marker Adm", "posX": 55, "posY": 56.5},
    {"name": "Marker Warehouse", "posX": 80, "posY": 54},
    {"name": "Marker ShipCafe", "posX": 10, "posY": 49}
];

const MapPanel = props => {

    const headerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (headerRef.current == null)
            headerRef.current = document.getElementById('mappanel__header');
        if (mapRef.current == null)
            mapRef.current = document.getElementById('mappanel__map');
        if (mapRef.current && headerRef.current) {
            console.log(mapRef, headerRef);
            const width = document.body.offsetWidth;
            const height = document.body.offsetHeight - headerRef.current.offsetHeight;
            mapRef.current.style.width = width - 6 + 'px';
            mapRef.current.style.height = height - 6 + 'px';
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
		<Map id="mappanel__map" markers={'markers' in props ? props.markers : [] }/>
	</Panel>
    );
}

MapPanel.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default MapPanel;
