import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducer';
import axios from 'axios';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        if(this.props.user.username) {
            this.props.history.push('/dashboard');
        }
    }

    handleInput = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    register = () => {
        const { username, password } = this.state;
        const profilePic = `https://robohash.org/${username}`
        axios.post('/api/register', {username, password, profilePicture: profilePic}).then(res => {
            this.props.getUser(res.data);
            this.props.history.push('/dashboard');
        }).catch(err => console.log(err));
    }

    login = () => {
        const {username, password} = this.state;

        axios.post('/api/login', {username, password}).then(res => {
            this.props.getUser(res.data);
            this.props.history.push('dashboard');
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <p>Username: </p>
                <input value={this.state.username} name='username' onChange={(e) => this.handleInput(e)}/>
                <p>Password: </p>
                <input type='password' value={this.state.password} name='password' onChange={(e) => this.handleInput(e)}/>
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth);