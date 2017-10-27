import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class PhotoGrid extends Component {
    render() {
        return (
            <div className={this.props.className}>{this.props.photos.map((photo, index) => {
                return <StyledLink key={photo.id} to={`/p/${photo.id}`}><Cell style={{'backgroundImage': `url('${photo.image_url}')`}}/></StyledLink>
            })}</div>
        );
    }
}

const Cell = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
`;

const StyledLink = styled(Link)`
    width: 33%;
    max-width: 290px;
    height: 33vw;
    max-height: 290px;
    margin: .1vw;
    @media (min-width: 900px) { 
        margin : 4px;
        border: 1px solid #eee;
        border-radius: 3px;
    }
`;

const StyledPhotoGrid = styled(PhotoGrid)`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
`;

export default StyledPhotoGrid;