import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Login from '.';

describe('<Login />', () => {
    it('should render', () => {
        const wrapper = mount(<Login />);
        expect(wrapper.find('.container')).to.have.lengthOf(1);
    });
});