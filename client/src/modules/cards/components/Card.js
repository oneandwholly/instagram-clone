import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likePhoto, unlikePhoto, addComment } from '../actions';
import like_icon from '../../../assets/icons/heart-o.png';
import liked_icon from '../../../assets/icons/liked.png';
import comment_icon from '../../../assets/icons/comment-o.png';
import more_icon from '../../../assets/icons/more.png';

import Caption from './Caption';

import nav from '../../nav'
class Card extends Component {
  constructor(props){
    super(props);
    this.state ={
      display: 'none'
    }
  }
    focusOnNewCommentInput(){
        this.setState({display: 'block'})
        setTimeout(() =>{this.nameInput.focus()}, 0)
    }
    showMore() {
      this.props.showMore(this.props.photo.id, this.props.photo.user.username)
    }
    renderTopBar() {
        if (this.props.photo) {
        return <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}><div style={{display: 'flex', padding: '15px 40px 11px 16px'}}>
           <Link to={`/${this.props.photo.user.username}`}><ProfilePicture src='https://scontent-bom1-1.cdninstagram.com/t51.2885-19/11906329_960233084022564_1448528159_a.jpg'/></Link>
           <div style={{marginTop: '7px'}}><Link style={{textDecoration: 'none',
                fontFamily: 'Roboto',
                fontWeight: 500,
                fontSize: '15px',
                color: 'black'}} to={`/${this.props.photo.user.username}`}>{this.props.photo.user.username}</Link></div>
        </div>
        <img style ={{ height: '15px', paddingRight: '16px'}} alt='' onClick={this.showMore.bind(this)} src={more_icon} />
        </div>
        }
        return <div></div>
    }
    renderPhoto() {
        if (this.props.photo) {
            return <Photo src={this.props.photo.image_url} alt=''/>
        }
        return <div>loading photo...</div>
    }

    renderNumOfLikes() {
        if (this.props.photo) {
            return <div style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: '15px', marginLeft: '2px', marginTop: '4px', marginBottom: '7px' }}>{this.props.photo.likes.count} likes</div>
        }
        return <div></div>
    }

    likePhoto() {
        this.props.likePhoto(this.props.photo.id)
    }

    unlikePhoto() {
        this.props.unlikePhoto(this.props.photo.id)
    }
    addComment(e) {
        if (e.key === 'Enter') {
            this.props.addComment(this.props.photo.id, e.target.value)
            e.target.value = '';
            this.nameInput.blur();
        }
    }
    renderLikeButton() {
        if (this.props.likeStatus) {
            return <img style ={{ height: '26px', color: 'red'}} alt='' onClick={this.unlikePhoto.bind(this)} src={liked_icon} />
        }
        return <img style ={{ height: '26px'}} alt='' onClick={this.likePhoto.bind(this)} src={like_icon} />
    }
    renderDeleteCommentButton(commentUserId) {
        if (this)
        return <button>delete</button>;
    }
    renderComments() {
        if (this.props.comments) {
            return (
                <div>{this.props.comments.map(comment => {
                    return <div style={{ fontFamily: 'Roboto'}} key={comment.id}><Link style={{ textDecoration: 'none', fontWeight: 500, color: 'black', fontSize: '15px'}} to={`/${comment.username}`}>{comment.username}</Link> {comment.text}</div>
                })}</div>
            );
        }
        //{this.renderDeleteCommentButton(comment.user_id)}
        return <div>loading comments...</div>
    }
    render() {
        return (
            <OuterDiv>
            <div>{this.renderTopBar()}</div>
                <div>{this.renderPhoto()}</div>
                <div style={{ padding: '0 16px'}}>
                    <div style={{margin: '8px 0 0 0'}}>{this.renderLikeButton()}<img style={{ marginLeft: '10px', height: '24px'}} onClick={this.focusOnNewCommentInput.bind(this)} alt='' src={comment_icon}/></div>
                    <div>{this.renderNumOfLikes()}</div>
                    <Caption photo={this.props.photo}/>
                    <div>{this.renderComments()}</div>
                    <div>
                        <input
                            style={{width: '100%', border: '0px solid', borderBottom: '1px solid #eee', display: this.state.display}}
                            onKeyPress={this.addComment.bind(this)}
                            ref={(input) => { this.nameInput = input; }}
                        >
                        </input>
                    </div>
                </div>
                <br></br>
            </OuterDiv>
        )
    }
}

const OuterDiv = styled.div`
    max-width: 600px;
    margin: 0px auto;
    @media (min-width: 600px) { 
        margin : 60px auto;
        border: 1px solid #eee;
        border-radius: 3px;
    }
`;

const Photo = styled.img`
    width: 100%;
`;

const ProfilePicture = styled.img`
border: 1px solid;
border-radius: 50%;
border-color: #e7e7e7;
margin-right: 12px;
height: 30px
`;

export default connect((state, ownProps) => {
    let photo = null;
    let comments = null;
    let likeStatus = null;
    if (state.photos.byId[ownProps.photoId]) {
        photo = state.photos.byId[ownProps.photoId]
    }

    if (ownProps.comments) {
        comments = ownProps.comments
    }

    if (ownProps.likeStatus === false || ownProps.likeStatus) {
        likeStatus = ownProps.likeStatus;
    }

    return { photo, comments, likeStatus };
}, { likePhoto, unlikePhoto, addComment, showMore: nav.actions.showMore })(Card);
