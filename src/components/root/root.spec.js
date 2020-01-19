import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';


import Root from '.';

describe('<Root />', () => {
    it('should render', () => {
        const wrapper = mount(<Root />);
        expect(wrapper.find('.root')).to.have.lengthOf(1);
    })
});