import React from 'react';
import { expect } from 'chai';
'chai';
import { shallow } from 'enzyme';


import Root from '.';

describe('<Root />', () => {
    it('should render', () => {
        const wrapper = shallow(<Root />);
        expect(wrapper.find('.root')).to.have.lengthOf(1);
    })
});