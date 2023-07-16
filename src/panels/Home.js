import React, {useEffect, useState} from 'react';
import PropTypes, { object } from 'prop-types';
import bridge from "@vkontakte/vk-bridge";

import "./Home.css"

import { Panel, PanelHeader, Text, Banner, Div, Title } from '@vkontakte/vkui';
import { Icon24Chevron } from '@vkontakte/icons';



const getObjectsString = (count) => {
	if (count == 1)
		return '1 объект';
	else if (count >= 2 && count <= 4)
		return count + ' объекта';
	else
		return count + ' объектов';
}
const formatTime = (timestamp_ms) => {
	if (timestamp_ms == -1)
		return "Открытых объектов ещё нет";
	const dt = new Date(timestamp_ms);
	const months = ['января', "февраля", "марта", "апреля", "мая", 
	"июня", "июля", "сентября", "октября", "ноября", "декабря"];

	const zeroify = (num) => {
		if (num < 10)
			return '0' + num;
		return num;
	}

	const date = `${dt.getDate()} ${months[dt.getMonth() - 1]} ${dt.getFullYear()}`;
	const time = `${zeroify(dt.getHours())}:${zeroify(dt.getMinutes())}`;
	return  `${date} в ${time}`;
}

const openQRCodeScanner = () => { bridge.send("VKWebAppOpenCodeReader"); }

const Home = ({ id, go, dbData, activateModal, qr_ok_setobject }) => {
	const [objs, setObjCount] = useState('1');
	const [qrResult, setQRResult] = useState('<none>');
	const [toUpdate, doUpdate] = useState('');
	
	// --- +++ --- +++ ---
	const findObject = async (object_code) => {
		let queryData = {
			"collection": "objects",
			"database": "geozhdan",
			"dataSource": "geozhdan-main-db",
			"filter": {"code": object_code}
		};
		const response = await fetch('https://randomgod.7m.pl/rerequester.php', {
			method: 'POST',
			headers: {
				"request-url": "https://eu-central-1.aws.data.mongodb-api.com/app/data-tvcew/endpoint/data/v1/action/findOne",
				'api-key': 'ODO1Pv2mQ0kzyqYmsviHtibJmiovEp9iJ0pKkoAsx32EMT4MCVcyzXvScJ20wITb',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: "json="+encodeURIComponent(JSON.stringify(queryData))
		});
		const data = await response.json();
		if (!('document' in data && data.document))
			return {};
		return data.document;
	}
	const addObjectToList = (object_id) => {
		if (dbData.opened_objects.indexOf(object_id) > -1)
			return false;
		dbData.opened_objects.push(object_id);
		dbData.last_opened_object_ts = Date.now();
		let queryData = {
			"collection": "main",
			"database": "geozhdan",
			"dataSource": "geozhdan-main-db",
			"upsert": false,
			"filter": {"vk_userid": dbData.vk_userid},
			"update": dbData
		};
		fetch('https://randomgod.7m.pl/rerequester.php', {
			method: 'POST',
			headers: {
				"request-url": "https://eu-central-1.aws.data.mongodb-api.com/app/data-tvcew/endpoint/data/v1/action/updateOne",
				'api-key': 'ODO1Pv2mQ0kzyqYmsviHtibJmiovEp9iJ0pKkoAsx32EMT4MCVcyzXvScJ20wITb',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: "json="+encodeURIComponent(JSON.stringify(queryData))
		});
		return true;
	}

	// Подписывается на события, отправленные нативным клиентом
	bridge.subscribe(async (event) => {
		if (!event.detail) {
			return;
		}
		switch(event.detail.type) {
			case 'VKWebAppOpenCodeReaderResult':
				// Обработка события в случае успеха
				console.log(event.detail);
				const data = event.detail.data.code_data;
				const obj = await findObject(data);
				setQRResult(obj);
				if (!obj.hasOwnProperty('id')) {
					activateModal('qr-error');
				} else {
					qr_ok_setobject(obj.title);
					const res = addObjectToList(obj.id);
					if (res)
						activateModal('qr-ok');
					else
						activateModal('qr-exists');
				}
				break;
			case 'VKWebAppOpenCodeReaderFailed':
				// Обработка события в случае ошибки
				console.log(event.detail.data.error_type, event.detail.data.error_data); 
				activateModal('qr-error');     
			break;
		}
	});

	

	useEffect(() => {
		const div = document.querySelector('.main-panel');
		div.style.height = document.body.offsetHeight + 'px';
	})

	// -- render section --


	return (
	<Panel id={id}  style={{boxSizing: 'border-box'}}>
		<div className='main-panel'>
			<PanelHeader className='name-menu'>Главная</PanelHeader>
			<Div>
			<div className='info-panel'>
				<Text className='info-name'>Открыто объектов</Text>
				<Text className='info-text'>{getObjectsString(dbData.opened_objects.length)} из {objects.length}{toUpdate}</Text>
				<Text className='info-name'>Дата последнего открытия</Text>
				<Text className='info-text'>{formatTime(dbData.last_opened_object_ts)}{toUpdate}</Text>
			</div>
			<p>dbdata: {JSON.stringify(dbData)}</p>
			<p>fetchobj: {JSON.stringify(qrResult)}</p>
			</Div>
			<div className='main__buttons'>
				<Banner mode="image" asideMode='expand' className='banner' header="Карта лагеря" subheader="Открыть карту лагеря" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='map'></Banner>
				<Banner mode="image" asideMode='expand' className='banner' header="Искать объекты" subheader="Открыть сканер QR-кода" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={openQRCodeScanner}></Banner>
				<Banner mode="image" asideMode='expand' className='banner' header="Ваши открытия" subheader="Показать открытые объекты" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='listOfPlaces'></Banner>
			</div>
		</div>
	</Panel>
);
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	dbData: PropTypes.object.isRequired,
	qr_ok_setobject: PropTypes.func.isRequired,
	objects: PropTypes.object.isRequired
};

export default Home;
