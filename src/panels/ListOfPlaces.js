import PropTypes from 'prop-types';
import React, { useState } from "react";

import { Banner, Div, Group, Panel, PanelHeader, PanelHeaderBack, Text } from '@vkontakte/vkui';
import { Icon24Chevron, Icon56InfoOutline } from '@vkontakte/icons';

import './ListOfPlaces.css'

const ListOfPlaces = ({id, go, dbData, objects}) => {
    const [isObjectsExists, setObjectsFlag] = useState(false);
    return (
	<Panel id={id} style={{boxSizing: 'border-box'}}>
        <div className='main-panel'>
            <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home"/>}>Объекты в лагере</PanelHeader>
            <Div>
                {
                    objects.map(el => {
                        if (dbData.opened_objects.indexOf(el.id) > -1) {
                            if (!isObjectsExists)
                                setObjectsFlag(true);
                            return (
                                <Banner key={el.id} mode="image" asideMode='expand' className='ListOfPlaces__banner' header={el.title} subheader={el.subtitle} background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='info' data-selected_object_id={el.id}></Banner>
                            );
                        }
                    })
                }
                {
                    !isObjectsExists && (
                        <Group className="no-objects">
                            <Icon56InfoOutline className="no-objects__icon"/>
                            <Text className="no-objects__text">Открытых объектов ещё нет</Text>
                        </Group>
                    )
                }
                {/* <Banner mode="image" asideMode='expand' className='banner' header="Стуловая" subheader="открыта всегда когда зовут" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='info'></Banner>
                <Banner mode="image" asideMode='expand' className='banner' header="Стуловая" subheader="открыта всегда когда зовут" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='info'></Banner> */}
            </Div>
        </div>
    </Panel>
);
}

ListOfPlaces.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    dbData: PropTypes.object.isRequired,
	objects: PropTypes.array.isRequired
};

export default ListOfPlaces;

