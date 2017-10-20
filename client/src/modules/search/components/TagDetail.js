import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import TagName from './TagName';

class TagDetail extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <TagName name={this.props.match.params.tag_name} />
            </div>
        );
    }
}

const StyledTagDetail = styled(TagDetail)`
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default withRouter(StyledTagDetail);