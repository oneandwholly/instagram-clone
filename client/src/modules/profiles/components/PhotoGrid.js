import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class PhotoGrid extends Component {
    render() {
        return (
            <div>{this.props.photos.map((photo, index) => {
                return <Link key={photo.id} to={`/p/${photo.id}`}><Cell src={photo.image_url} index={index} alt=''/></Link>
            })}</div>
        );
    }
}

const Cell = styled.img`
    padding: ${props => props.index%3 === 1 ? '.3% 1%' : '0 0 .3% 0'};
    width: 32.6%;
    height: 33%;
    overflow: hidden;
`;

export default PhotoGrid;