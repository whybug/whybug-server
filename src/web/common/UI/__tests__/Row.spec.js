import React from 'react';
import Row from '../Row';
import { shallow } from 'enzyme';

describe('<Row />', () => {

    it('should render have class `.w-row`', () => {
        const wrapper = shallow(<Row />);
        wrapper.find('.w-row').should.have.length(1);
    });

    it('should use props when passed in', () => {
        const wrapper = shallow(<Row test="123"/>);
        wrapper.props().should.contain({test: '123'});
    });

    it('should render children when passed in', () => {
        const wrapper = shallow(
            <Row>
                <div className="unique"></div>
            </Row>
        );
        wrapper.contains(<div className="unique"></div>).should.be.true;
    });
});
