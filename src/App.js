import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import StartWindow from './panels/StartWindow';
import Home from './panels/Home';
import MapPanel from './panels/MapPanel';
import ListOfPlaces from './panels/ListOfPlaces';
// import QRCodeView from './panels/QRCodeView';

const SERVKEY = '8h1-3kh@jns';





const App = () => {
	const [activePanel, setActivePanel] = useState('startWindow');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const [dbData, setDBData] = useState({})
	const [testText, setTestText] = useState('testtext');

	const getUserData = async (vk_userid) => {
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
				"document": {"vk_userid": vk_userid, "opened_objects": [1, 2,3], "last_opened_object_ts": -1}
			};
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
		}
	}

	useEffect(() => {
		async function fetchData() {
			// const user = await bridge.send('VKWebAppGetUserInfo');
			// setUser(user);
			console.log(fetchedUser);
			const data = await getUserData(1987);
			if (data) {
				// setActivePanel('home');
				setDBData(data);
				setPopout(null);
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
		setActivePanel(e.currentTarget.dataset.to);
	};


	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<p>{testText}</p>
							<View activePanel={activePanel}>
								<StartWindow id='startWindow' go={go} />
								<Home id='home' go={go} dbData={dbData} updateDB={setDBData} />
								<ListOfPlaces id='listOfPlaces' go={go} />
								<MapPanel id='map' go={go} />
								{/* <QRCodeView id='qrscanner' go={go} /> */}
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
