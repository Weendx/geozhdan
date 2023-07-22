import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, ModalRoot, ModalCard, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import StartWindow from './panels/StartWindow';
import Home from './panels/Home';
import MapPanel from './panels/MapPanel';
import ListOfPlaces from './panels/ListOfPlaces';
// import QRCodeView from './panels/QRCodeView';
import './App.css';
import Info from './panels/Info';



const App = () => {
	const [activePanel, setActivePanel] = useState('startWindow');
	const [activeModal, setActiveModal] = useState(null);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const [dbData, setDBData] = useState({});
	const [objList, setObjList] = useState([]);
	const [modalQROkObject, setQROkObject] = useState('Геождан');
	const [selectedObject, selectObject] = useState(null);
	const [prevPanelId, setPrevPanelId] = useState(null);
	const [testText, setTestText] = useState('testtext');

	const loadUserData = async (vk_userid) => {
		let queryData = {
			"collection": "main",
			"database": "geozhdan",
			"dataSource": "geozhdan-main-db",
			"filter": {"vk_userid": vk_userid}
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
		if (!('document' in data))
			throw "No data";
		if (data.document) {
			return data.document;
		} else {
			let queryData = {
				"collection": "main",
				"database": "geozhdan",
				"dataSource": "geozhdan-main-db",
				"document": {"vk_userid": vk_userid, "opened_objects": [], "last_opened_object_ts": -1}
			};
			try {
				const response = await fetch('https://randomgod.7m.pl/rerequester.php', {
					method: 'POST',
					headers: {
						"request-url": "https://eu-central-1.aws.data.mongodb-api.com/app/data-tvcew/endpoint/data/v1/action/insertOne",
						'api-key': 'ODO1Pv2mQ0kzyqYmsviHtibJmiovEp9iJ0pKkoAsx32EMT4MCVcyzXvScJ20wITb',
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: "json="+encodeURIComponent(JSON.stringify(queryData))
				});
				const t = await response.text();
				setTestText(t);
				return queryData.document;
			} catch {
				const d = await loadUserData(vk_userid);
				return d;
			}
		}
	}

	const loadObjectList = async () => {
		let queryData = {
			"collection": "objects",
			"database": "geozhdan",
			"dataSource": "geozhdan-main-db",
			"filter": {}
		};
		try {
			const response = await fetch('https://randomgod.7m.pl/rerequester.php', {
				method: 'POST',
				headers: {
					"request-url": "https://eu-central-1.aws.data.mongodb-api.com/app/data-tvcew/endpoint/data/v1/action/find",
					'api-key': 'ODO1Pv2mQ0kzyqYmsviHtibJmiovEp9iJ0pKkoAsx32EMT4MCVcyzXvScJ20wITb',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: "json="+encodeURIComponent(JSON.stringify(queryData))
			});
			const data = await response.json();
			if (!('documents' in data))
				throw "No data";
			
			return data.documents;
		} catch {
			const d = await loadObjectList();
			return d;
		}
	}

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			// const user = {id: 192701245}

			const data = await loadUserData(user.id);
			if (data) {
				const objects = await loadObjectList(data.opened_objects);
				setDBData(data);
				setObjList(objects);
				setPopout(null);
				if ('_id' in data)
					setActivePanel('home');
				else
					setActiveModal('faq');
			}
		}
		fetchData();
					
		// var config = {
		// 	method: 'get',
		// 	// url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-tvcew/endpoint/data/v1/action/findOne',
		// 	url: 'https://randomgod.7m.pl/test.php',
		// 	headers: {
		// 	'Content-Type': 'application/json',
		// 	'api-key': 'ODO1Pv2mQ0kzyqYmsviHtibJmiovEp9iJ0pKkoAsx32EMT4MCVcyzXvScJ20wITb',
		// 	},
		// 	data: data,
		// };
		
					
		// axios(config)
		// 	.then(function (response) {
		// 		console.log(response.data);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});

		

	}, []);

	const go = e => {
		console.log(e.currentTarget.dataset);
		setPrevPanelId(null);
		if (['info', 'map'].indexOf(e.currentTarget.dataset.to) == -1) {
			selectObject(null);
		}
		if (e.currentTarget.dataset.hasOwnProperty('selected_object_id')) {
			const id = e.currentTarget.dataset.selected_object_id;
			selectObject(Number(id));
		}
		if (e.currentTarget.dataset.hasOwnProperty('prev_panel_id')) {
			setPrevPanelId(e.currentTarget.dataset.prev_panel_id);
		}
		setActivePanel(e.currentTarget.dataset.to);
	};


	const modal = (
		<ModalRoot activeModal={activeModal}>
		    <ModalCard 
				id="faq" 
				onClose={() => {setActiveModal(null); setActivePanel('home'); }}
				header="Добро пожаловать в «Геождан»!"
				subheader="Теперь у вас есть карманная карта, а ещё справочник по ждановским объектам. Находите и сканируйте QR-коды, размещенные на объектах лагеря. Это позволит легче находить лагерные места и информацию о них в будущем. Приятного пользования!"
				actions={
					<Button className="modal__button_primary" size="l" mode="primary" stretched onClick={() => {setActiveModal(null); setActivePanel('home'); }}>Поехали</Button>
				}
			/>
			<ModalCard
				id="qr-ok"
				onClose={() => setActiveModal(null)}
				header="Объект добавлен"
				subheader={"Открыт новый объект «" + modalQROkObject + "»"}
				actions={
					<Button className="modal__button_primary" size="l" mode="primary" stretched onClick={() => setActiveModal(null)}>Ок</Button>
				}
			/>
			<ModalCard
				id="qr-exists"
				onClose={() => setActiveModal(null)}
				header="Данный объект уже известен"
				subheader="Заново его открыть уже не получится :)"
				actions={
					<Button className="modal__button_primary" size="l" mode="primary" stretched onClick={() => setActiveModal(null)}>Ок</Button>
				}
			/>
			<ModalCard
				id="qr-error"
				onClose={() => setActiveModal(null)}
				header="Неверный код"
				subheader="Неужели кто-то пытается сломать систему..?"
				actions={
					<Button className="modal__button_primary" size="l" mode="primary" stretched onClick={() => setActiveModal(null)}>Продолжить</Button>
				}
			/>
		</ModalRoot>
	);

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout} modal={modal}>
						<SplitCol>
							{/* <p>{testText}</p> */}
							<View activePanel={activePanel}>
								<StartWindow id='startWindow' go={go} />
								<Home id='home' go={go} dbData={dbData} activateModal={setActiveModal} qr_ok_setobject={setQROkObject} objects={objList} setPopout={setPopout} />
								<ListOfPlaces id='listOfPlaces' go={go} dbData={dbData} objects={objList} />
								<MapPanel id='map' go={go} objects={objList} targetObjectId={selectedObject} prevPanelId={prevPanelId} />
								<Info id='info' go={go} objects={objList} targetObjectId={selectedObject} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
