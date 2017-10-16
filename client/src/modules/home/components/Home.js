import React, { Component } from 'react';
import nav from '../../nav';
import auth from '../../auth';
import { connect } from 'react-redux';

class Home extends Component {
    componentWillMount() {
        this.props.setActive('home')
    }

    fetchHomeFeed() {
        this.props.fetchHomeFeed(this.props.profile.userId, this.props.profile.pageToken, this.props.user.username)
    }

    render() {
        return (
            <div>
            Start
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home<br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>                    
            <br></br>
            Home
            <br></br>
            End
        </div>
        );
    }
}

export default connect(null, {setActive: nav.actions.setActive})(Home);