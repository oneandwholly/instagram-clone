import React, { Component } from 'react';
import styled from 'styled-components';

class TagName extends Component {
    render() {
        return (
            <div className={this.props.className}>
                #{this.props.name}
            </div>
        );
    }
}

const StyledTagName = styled(TagName)`
font-family: 'Roboto';
font-size: 33px;
text-align: center;
`;

export default StyledTagName;