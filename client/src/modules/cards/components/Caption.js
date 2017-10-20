import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Caption extends Component {
    renderText(text) {
        return <div key={text} style={{display: 'inline'}}>{text}</div>
    }

    renderTagText(tag_name) {
        return <Link key={tag_name} to={`/explore/tags/${tag_name.substr(1)}`} style={{display: 'inline', textDecoration: 'none', color: '#458eff'}}>{tag_name}</Link>
    }

    render() {
        const list = [];
        let flag = false;
        let acc = '';

        if (!this.props.photo) {
            return <div></div>
        }
        if (!this.props.photo.caption) {
            return <div></div>
        }
        this.props.photo.caption.split("").forEach((char, index, array) => {
            switch(flag) {
                case false:
                  if (char === '#' || array.length-1 === index) {
                    flag = true;
                    //acc += char;
                    list.push(this.renderText(acc));
                    acc=char;
                    break;
                  }
                  acc += char;
                  break;
                case true:
                  if ((char === ' ' || char===',') || array.length-1 === index) {
                    flag = false;
                    acc += char;
                    list.push(this.renderTagText(acc));
                    acc=char;
                    break;
                  }
                   acc += char;
              }
            })
        return (
            <div className={this.props.className}>
                <Username><Link style={{ textDecoration: 'none', color: 'black'}} to={`/${this.props.photo.user.username}`}>{this.props.photo.user.username}</Link></Username> {list}
            </div>
        );
    }
}

const Username = styled.div`
    display: inline;
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 15px;
`;

const StyledCaption = styled(Caption)`
    margin: 10px 0;
`;

export default StyledCaption;