import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearUser, getUser } from '../../redux/reducer';
import axios from 'axios';
import './Nav.css';

class Nav extends Component {

    componentDidMount() {
         this.findUser(); 
         console.log(this.props)
    }
    
    logout = () => {
        axios.get('/api/logout').then(() => {
            this.props.clearUser();
            this.props.history.push('/');
        })
    }

    findUser = () => {
        axios.get('/api/me').then(res => {
            this.props.getUser(res.data);
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className='Nav'>
                <section className='nav-wrapper'>
                    <section className='user-info'>
                        <img src={this.props.user.profile_pic} alt={this.props.user.username} />
                        <h3>{this.props.user.username}</h3>
                    </section>

                    <nav>
                        <Link to='/dashboard'><h3>Home</h3></Link>
                        <Link to='/new'><h3>New Post</h3></Link>
                    </nav>
                    <section className='logout'>
                        <Link onClick={this.logout} to='/'><h3>Logout</h3></Link>
                    </section>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { getUser, clearUser })(Nav));