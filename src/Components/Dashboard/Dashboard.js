import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            search: '',
            userPosts: true
        }
    }

    componentDidMount() {
        if(!this.props.user.username) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className = 'Dashboard'>

            </div>
        )
    }
}

const mapStateToProps = reduxStore => reduxStore;

export default connect(mapStateToProps)(Dashboard);