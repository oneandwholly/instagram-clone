import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTopNav, selectActive } from '../selectors';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import auth from '../../auth';
import users from '../../users';

import add_icon  from '../../../assets/icons/add-o.png';
import options_icon  from '../../../assets/icons/options.png';
import logo from '../../../assets/icons/logo.png';

class TopNav extends Component {
    componentWillReceiveProps(newProps) {
        this.setState({ pathname: newProps.location.pathname })
    }
    renderLeft() {
        if (this.props.allUsersById && this.props.authUserId) {
            if (this.props.allUsersById[this.props.authUserId].username === this.props.location.pathname.substr(1)) {
            return <LeftIcon src={options_icon} />
            }
        }
        return <div></div>;
    }
    renderMiddle() {
        if (this.props.location.pathname.substr(0,3) === '/p/') {
            return <div>Photo</div>
        }
        if(this.props.active === "profile") {
            return <div>Profile</div>
        }
        if(this.props.active === "home") {
            return <Logo src={logo} alt='' />
        }
        if(this.props.active === "create") {
            return <div>New Post</div>
        }
        return <div></div>
    }
    renderRight() {
        if (this.props.allUsersById && this.props.authUserId) {
            if (this.props.allUsersById[this.props.authUserId].username === this.props.location.pathname.substr(1)) {
            return <RightIcon src={add_icon} />
            }
        }
        return <div></div>;        
    }
    render() {
        if (this.props.visibility) {
            return (
                <ParentDiv>
                    <FixedDiv>
                        {this.renderLeft()}
                        {this.renderMiddle()}
                        {this.renderRight()}
                    </FixedDiv>
                </ParentDiv>
            );
        }
        return <div></div>;
    }
}

/* Styled Components*/
const ParentDiv = styled.div`
    height: 44px;
    width: 100%;
`;

const FixedDiv = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Roboto', sans-serif;
    align-items: center;
    position: fixed; 
    height: inherit;
    width: inherit;
    background-color: #fff;
    border-bottom: 1px double #e7e7e7;
    `;
    
const LeftIcon = styled.img`
    margin: 0 16px;
    width: 26px;
    height: 23px;
    `;
    
const RightIcon = styled.img`
    margin: 0 12px;
    width: 40px;
    height: 34px;
`;
const Logo = styled.img`
    height: 39px;
`;

export default withRouter(connect(
    createStructuredSelector({
        visibility: selectTopNav,
        active: selectActive,
        authUserId: auth.selectors.selectUserId,
        allUsersById: users.selectors.selectById
    })
)(TopNav));