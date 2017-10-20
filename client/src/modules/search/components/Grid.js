import React, { Component } from 'react';
import styled from 'styled-components';

import Cell from './Cell';

class Grid extends Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.photos.map(photo => <Cell key={photo.id} photo={photo}></Cell>)}
            </div>
        );
    }
}

const StyledGrid = styled(Grid)`
    display: flex;
`;

export default StyledGrid;