import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likePhoto, unlikePhoto, addComment } from '../actions';

class Card extends Component {
    renderPhoto() {
        if (this.props.photo) {
            return <img src={this.props.photo.image_url} alt=''/>
        }
        return <div>loading photo...</div>
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
        }
    }
    renderLikeButton() {
        if (this.props.likeStatus) {
            return <button onClick={this.unlikePhoto.bind(this)}>liked</button>
        }
        return <button onClick={this.likePhoto.bind(this)}>like</button>
    }
    renderComments() {
        if (this.props.comments) {
            console.log('comments', this.props.comments)
            return (
                <div>{this.props.comments.map(comment => {
                    return <div key={comment.id}><Link to={`/${comment.username}`}>{comment.username}</Link> {comment.text}</div>
                })}</div>
            );
        }
        return <div>loading comments...</div>
    }
    render() {
        return (
            <div>
                <div>{this.renderPhoto()}</div>
                <div>{this.renderLikeButton()}</div>
                <div>{this.renderComments()}</div>
                <div><input onKeyPress={this.addComment.bind(this)}></input></div>
            </div>            
        )
    }
}

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
}, { likePhoto, unlikePhoto, addComment })(Card);