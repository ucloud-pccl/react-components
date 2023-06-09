import React from 'react';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

import Popover from 'src/components/Popover';

jest.unmock('rc-trigger');
describe('Popover', () => {
    test('popover align', () => {
        let instanceRef = null;
        const wrapper = mount(
            <Popover
                popup={<div>popup</div>}
                ref={_ref => (instanceRef = _ref)}
                forceAlignWhenUpdate
                getPopupContainer={triggerNode => triggerNode}
            >
                <div className="content">content</div>
            </Popover>
        );
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
        wrapper.setProps({
            visible: true
        });
        expect(renderToJson(wrapper.render())).toMatchSnapshot();

        instanceRef.getPopupDomNode();
        instanceRef.forceAlign();
    });

    test('empty', () => {
        const wrapper = mount(
            <Popover>
                <div className="content">content</div>
            </Popover>
        );
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
    });
});
