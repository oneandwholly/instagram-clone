import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

class Cell extends Component {
    handleCellClick() {
        this.props.history.push(`/p/${this.props.photo.id}`)
    }
    render() {
        return (
            <div onClick={this.handleCellClick.bind(this)} className={this.props.className}>
                <Image src={this.props.photo.image_url} />
            </div>
        );
    }
}


const StyledCell = styled(Cell)`
    width: auto;
    max-width:33.3%;
    margin: 1px
`;

const Image = styled.img`
    width: 100%;
`;

export default withRouter(StyledCell);