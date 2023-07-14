import PropTypes from 'prop-types';
import React from "react";

import { Group, Panel, PanelHeader, PanelHeaderBack, SplitCol, SplitLayout } from '@vkontakte/vkui';

const ListOfPlaces = props => (
	<Panel id={props.id}>
		<PanelHeader before={<PanelHeaderBack onClick={props.go} data-to="home"/>}>Список мест в лагере</PanelHeader>
        <Group>
            
        </Group>
    </Panel>
);

ListOfPlaces.prototype = {
    id: PropTypes.string.isRequired,
    go:PropTypes.func.isRequired,
};

export default ListOfPlaces;

