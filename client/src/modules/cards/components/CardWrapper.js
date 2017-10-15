import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCard } from '../actions';
import Card from './Card';
import { createSelector } from 'reselect';
import { selectAll as selectAllCards } from '../selectors';

class CardWrapper extends Component {
    componentWillMount() {
        if (!this.props.card) {
            this.props.getCard(this.props.match.params.id);
        }
    }
    render() {
        if (this.props.card) {
            return (
                <div>
                    <Card photoId={this.props.card.photoId} likeStatus={this.props.card.likeStatus} comments={this.props.card.comments}/>
                </div>
            );
        }
        return <div>loading card...</div>
    }
}

export default connect(createSelector(
    (state, ownProps) => ownProps.match.params.id,
    selectAllCards,
    (photoId, allCards) => {
        let card = null;
        if (allCards[photoId]) {
            card = allCards[photoId];
        }
        return { card };
    }
), { getCard })(CardWrapper);