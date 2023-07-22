import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import "./Info.css"

import { Panel, PanelHeader, Text, PanelHeaderBack, Div, Title, Header, Button } from '@vkontakte/vkui';


const Info = ({ id, go, objects, targetObjectId}) => {
	
    let obj = {};
    JSON.parse(JSON.stringify(objects)).map( current => {
        if (current.id == targetObjectId) {
            obj = current;
            return;
        }
    });
    
	return (
	<Panel id={id} style={{boxSizing: 'border-box'}}>
		<div className='Info__main-panel'>
            <PanelHeader before={<PanelHeaderBack onClick={go} data-to="listOfPlaces" />} className='Info__name-info'>{obj.title}</PanelHeader>
			<Div>
                {obj.info?.data?.length > 0 ? (
                    <div className='Info__info'>
                        {
                            obj.info.data.map( row => (
                                <div key={row.id}>
                                    <Text className='Info__info-name'>{row.title}</Text>
                                    <Text className='Info__info-text'>
                                        {row.text.split("\n").map((txt, id) => {
                                            if (txt == ' ' || txt == '') {
                                                return (
                                                    <br key={id}/>
                                                )
                                            } else {
                                                return (
                                                    <p key={id}>{txt}</p>
                                                )
                                            }
                                        })}    
                                    </Text>        
                                </div>
                            ))
                        }
                    </div>
                    ) : (<></>)
                }
                {obj.info?.facts?.length > 0 ? (
                    <div className='Info__details'>
                        <Header className='Info__details-header'>Интересные факты</Header>
                        {
                            obj.info.facts.map(fact => {console.log('fact>>', fact); return (
                                <div key={fact.id}>
                                    <Text key={fact.id+'_0'} className='Info__details-title'>{fact.title}</Text>
                                    <Text key={fact.id+'_1'} className='Info__details-text'>
                                        {fact.text.split("\n").map((txt, id) => {
                                            if (txt == ' ' || txt == '') {
                                                return (
                                                    <br key={id}/>
                                                )
                                            } else {
                                                return (
                                                    <p key={id}>{txt}</p>
                                                )
                                            }
                                        })}
                                    </Text>
                                </div>
                            )})
                        }

                    </div>
                    ) : (<></>)
                }
            </Div>
            <Div>
                <button 
                    className='Info__btn-map' 
                    onClick={go} 
                    data-to="map" 
                    data-selected_object_id={targetObjectId} 
                    data-prev_panel_id="listOfPlaces"
                >Посмотреть на карте</button>
            </Div>
		</div>
	</Panel>
);
}

Info.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
    objects: PropTypes.array.isRequired,
    targetObjectId: PropTypes.number.isRequired
};

export default Info;