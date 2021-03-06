import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from '../../auth';
import users from '../../users';
import nav from '../../nav';
import create from '../../create';
import home from '../../home';
import profiles from '../../profiles';
import cards from '../../cards';
import search from '../../search';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import IndexRoute from './IndexRoute';

class App extends Component {
    componentWillMount() {
        if (this.props.hasToken) {
            this.props.fetchUserWithToken();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasToken) {
            this.props.fetchUserWithToken();
        }
    }

    renderIndexRoute() {
        if (this.props.hasToken) {
            return () => <home.components.Home />

        }
        return () => <auth.components.LandingPage navActions={nav.actions}/>
    }

    render() {
        const { MainContent, TopNav, BottomNav, Options, More } = nav.components;
        if (!this.props.hasToken) {
          return <auth.components.LandingPage navActions={nav.actions}/>
        }
        return (
            <BrowserRouter>
                <Wrapper>
                    <Options />
                    <TopNav />
                    <MainContent>
                        <Switch>
                            <Route path='/' exact component={IndexRoute} />
                            <Route path='/explore' exact component={search.components.Search} />
                            <Route path='/activity' exact component={search.components.Activity} />
                            <Route path='/create/post' exact component={create.components.Create} />
                            <Route path='/explore/tags/:tag_name' component={search.components.TagSearchResult} />
                            <Route path='/p/:id' component={cards.components.CardWrapper} />
                            <Route path='/:username' component={profiles.components.Profile} />
                        </Switch>
                    </MainContent>
                    <BottomNav />
                    <More />
                </Wrapper>
            </BrowserRouter>
        );
    }
}

/* Styled Components*/
const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export default connect(
    createStructuredSelector({
        hasToken: auth.selectors.selectHasToken
    }),
    {
        fetchUserWithToken: users.actions.fetchUserWithToken
    }
)(App);
