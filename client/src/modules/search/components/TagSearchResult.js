import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import nav from '../../nav';
import axios from 'axios';

import Grid from './Grid';
import TagDetail from './TagDetail';

class TagSearchResult extends Component {
    constructor(props) {
        super(props);
        this.state={ photos: [] };
    }
    componentWillMount() {
        this.props.setActive('explore')

        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };

        axios.get(`${window.location.protocol}//${window.location.host}/api/tags/${this.props.match.params.tag_name}`, config)
            .then((res) => {
                this.setState({photos: res.data})
            })
    }
    render() {
        return (
            <div className={this.props.className}>
                <TagDetail></TagDetail>
                <Grid photos={this.state.photos}></Grid>
            </div>
        );
    }
}

const StyledTagSearchResult = styled(TagSearchResult)`
    height: 100%;
`;

export default withRouter(connect(null, {setActive: nav.actions.setActive})(StyledTagSearchResult));