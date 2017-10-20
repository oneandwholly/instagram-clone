import React, { Component } from 'react';
import nav from '../../nav';
import cards from '../../cards';
import { connect } from 'react-redux';
import { fetchHomeFeed } from '../actions';

class Home extends Component {
    componentWillMount() {
        this.props.setActive('home')
        if (this.props.cardIds.length===0) {
          this.props.fetchHomeFeed();
        }
    }

    fetchHomeFeed() {
        this.props.fetchHomeFeed()
    }

    render() {
        return (
            <div>
            {this.props.cardIds.map(cardId => {
              return <cards.components.Card key={cardId+'home'} photoId={this.props.cards[cardId].photoId} likeStatus={this.props.cards[cardId].likeStatus} comments={this.props.cards[cardId].comments}/>
            })}
        </div>
        );
    }
}

export default connect((state, ownProps) => {
  return { cards: state.cards, cardIds: state.home.cards }
}, {setActive: nav.actions.setActive, fetchHomeFeed})(Home);
