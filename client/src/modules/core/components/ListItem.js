import React, { Component } from 'react';
import styled from 'styled-components';

class ListItem extends Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }   
}

const StyledListItem = styled(ListItem)`
    background-color: white;
    height: 50px;
    border-top: 0.1px solid #eee;
    border-bottom: 0.1px solid #eee;
`;

export default StyledListItem;
