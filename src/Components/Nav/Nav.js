import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = props => {
    return ( 
        <div>
            <img src={props.user.profile_pic} alt={props.user.username}/>
            <h3>{props.user.username}</h3>
            <Link to='/dashboard'><h3>Home</h3></Link>
            <Link to='/new'><h3>New Post</h3></Link>
            <Link to='/'><h3>Logout</h3></Link>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav);