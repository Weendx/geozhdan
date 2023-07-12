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
const CustomPopout = ({ onClose }) => {
    const { sizeX } = useAdaptivityConditionalRender();
    return (
      <PopoutWrapper onClick={onClose}>
        <div
          style={{
            backgroundColor: 'var(--vkui--color_background_content)',
            borderRadius: 8,
            position: 'relative',
            padding: '12px',
          }}
        >
          <h4>Кастомное модальное окно</h4>
  
          {sizeX.regular && (
            <ModalDismissButton className={sizeX.regular.className} onClick={onClose} />
          )}
        </div>
      </PopoutWrapper>
    );
  };
  
  const Example = () => {
    const [popout, setPopout] = React.useState(null);
  
    const onClick = () => setPopout(<CustomPopout onClose={() => setPopout(null)} />);
  
    return (
      <SplitLayout popout={popout}>
        <SplitCol>
          <View activePanel="popout">
            <Panel id="popout">
              <PanelHeader>ModalDismissButton</PanelHeader>
              <Group>
                <CellButton onClick={onClick}>Открыть модальное окно</CellButton>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    );
};
  

ListOfPlaces.prototype = {
    id: PropTypes.string.isRequired,
    go:PropTypes.func.isRequired,
};

export default ListOfPlaces;

