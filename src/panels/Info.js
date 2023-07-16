import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import "./Info.css"

import { Panel, PanelHeader, Text, PanelHeaderBack, Div, Title, Header, Button } from '@vkontakte/vkui';

const Info = ({ id, go}) => {
	useEffect(() => {
		const div = document.querySelector('.main-panel');
		div.style.height = document.body.offsetHeight + 'px';
	})
	return (
	<Panel id={id}  style={{boxSizing: 'border-box'}}>
		<div className='main-panel'>
        <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home" />} className='name-info'> Площади им. Ю.П.Адясова</PanelHeader>
			<Div>
                <div className='info-main'>
                    <Text className='info-main-name'>Примерное расположение</Text>
                    <Text className='info-main-text'>Центр лагеря</Text>
                    <Text className='info-main-name'>Время работы</Text>
                    <Text className='info-main-text'>Ежедневно</Text>
                </div>
                <div className='details'>
                    <Header className='details-name'>Интересные факты</Header>
                    <Text className='details-text-name'>Заголовок</Text>
                    <Text className='details-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </div>
            </Div>
            <Div>
                <button className='map_sqare' onClick={go} data-to="map">Посмотреть на карте</button>
            </Div>
		</div>
	</Panel>
);
}

Info.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Info;