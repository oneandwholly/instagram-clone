import React, { Component } from 'react';
import styled from 'styled-components';

class SearchInput extends Component {
    constructor(props) {
        super(props);
    
        this.state = { term: "" };
    }

    render() {
        return (
            <div className={this.props.className}>
            {/*changes SearchBar to a controlled component*/}
            <input
            style={{borderLeft: 'none', borderRight: 'none', width: '100%', height: '100%'}}
                placeholder ='Search'
              value = {this.state.term}
              onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

const StyledSearchInput = styled(SearchInput)`
    width: 100%;
    height: 25px;
`;

export default StyledSearchInput;