import React, { Component } from 'react';
import nav from '../../nav';
import { connect } from 'react-redux';

class Activity extends Component {
    componentWillMount() {
        this.props.setActive('activity')
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default connect(null, { setActive: nav.actions.setActive })(Activity);