import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Root from '.';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';


const store = createStore(rootReducer);

describe('<Root />', () => {
    it('should render', () => {
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={store}>
                    <Root />
                </Provider>
            </BrowserRouter>
        );
        expect(wrapper.find('.root')).to.have.lengthOf(1);
    })
});