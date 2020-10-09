import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';

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

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        console.log(this.state.search)
        return (
            <div className='Dashboard'>
                <section className='dashboard-container'>
                    <section className='search-posts'>
                        <section className='search-input'>
                            <input value={this.state.search} name='search' placeholder='Search by Title' onChange={this.handleChange} />
                            <button>Search</button>
                            <button>Reset</button>
                        </section>
                        <section className='posts-checked'>
                            <h3>My Posts</h3>
                            <input type='checkbox' />
                        </section>
                    </section>
                </section> 
            </div>
        )
    }
}

const mapStateToProps = reduxStore => reduxStore;

export default connect(mapStateToProps)(Dashboard);