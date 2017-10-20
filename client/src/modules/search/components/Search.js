import React, { Component } from 'react';
import nav from '../../nav';
import core from '../../core';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import SearchInput from './SearchInput';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state={
            selected: 'people',
            people: [],
            tags: []
        };
    }

    handlePeopleTabClick() {
        this.setState({ selected: 'people'})
    }

    handleTagsTabClick() {
        this.setState({ selected: 'tags'})        
    }

    handleItemClick(e) {
        if (this.state.selected === 'people') {
            this.props.history.push(`/${e.currentTarget.textContent}`)
        }
        if (this.state.selected === 'tags') {
            this.props.history.push(`explore/tags/${e.currentTarget.textContent}`)
        }
    }

    doSearch(term) {
        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };
        if (this.state.selected === 'people') {
            axios.get(`${window.location.protocol}//${window.location.host}/api/users/search?q=${term}`, config)
                .then((res) => {
                    const list = res.data.map((user) => {
                        return {
                            id: user.id,
                            name: user.username,
                            image_url: 'https://scontent-bom1-1.cdninstagram.com/t51.2885-19/11906329_960233084022564_1448528159_a.jpg'
                        }
                    });
                    this.setState({
                        people: list
                    })
                })
        }
        if (this.state.selected === 'tags') {
            axios.get(`${window.location.protocol}//${window.location.host}/api/tags/search?q=${term}`, config)
            .then((res) => {
                const list = res.data.map((tag) => {
                    return {
                        id: tag.id,
                        name: tag.tag_name,
                        image_url: 'https://image.flaticon.com/icons/png/512/1/1533.png'
                    }
                });
                this.setState({
                    tags: list
                })
            })
        }
    }

    componentWillMount() {
        this.props.setActive('explore')
    }

    render() {
        const doSearch = _.debounce((term) => { this.doSearch(term)}, 300);
        return (
            <div className={this.props.className}>
                <SearchInput onSearchTermChange={doSearch.bind(this)} />
                <TabList>
                    <Tab onClick={this.handlePeopleTabClick.bind(this)} name={'people'} selected={this.state.selected}>PEOPLE</Tab>
                    <Tab onClick={this.handleTagsTabClick.bind(this)} name={'tags'} selected={this.state.selected}>TAGS</Tab>                    
                </TabList>
                <SearchResultList>
                    {this.state[this.state.selected].map((item) => {
                        return (
                            <core.components.ListItem key={this.state.selected+item.id}>
                                <div style={{display: 'flex', height: '100%'}} onClick={this.handleItemClick.bind(this)}>
                                <Picture src={item.image_url}/>
                                <div style={{margin: 'auto 0'}}>
                                    <div style={{ fontFamily: 'Roboto', fontWeight: '700'}}>{item.name}</div>                                  
                                </div>

                                </div>
                            </core.components.ListItem>
                        );
                    })}
                </SearchResultList>
            </div>
        );
    }
}

const StyledSearch = styled(Search)`

`;


const TabList = styled.div`
    display: flex;
    height: 50px;
`;

const Tab = styled.div`
    width: 50%;
    text-align: center;
    margin: auto;
    padding: 15px;
    font-family: 'Roboto';
    font-weight: 700;
    color: ${props => (props.name === props.selected) ? 'black' : '#bbb'
    };
    border-bottom: ${props => (props.name === props.selected) ? '1px solid' : 'none'
};
`;

const SearchResultList = styled.div`
`;


const Picture = styled.img`
    border-radius: 50%;
    height: 80%;
    margin: auto 20px auto 20px;
`;


export default withRouter(connect(null, { setActive: nav.actions.setActive })(StyledSearch));