import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
        if (!this.props.user.username) {
            this.props.history.push('/');
        }

        this.getPosts();
    }

    getPosts = () => {
        const { search, userPosts } = this.state;
        axios.get(`/api/posts/${this.props.user.user_id}?search=${search}&userPosts=${userPosts}`).then(res => {
            this.setState({ posts: res.data });
        }).catch(err => console.log(err));
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleCheck = e => {
        this.setState({ userPosts: e.target.checked })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getPosts();
    }

    render() {
        const posts = this.state.posts.map((post, i) => {
            return (
                <Link key={i} to={`/post/${post.post_id}`} className='post-link'>
                    <section className='show-post'>
                        <h2>{post.title}</h2>
                        <section className='username-img'>
                            <p>by {post.username}</p>
                            <img src={post.profile_pic} alt={post.username} />
                        </section>
                    </section>
                </Link>
            )
            
            
        })
        return (
            <div className='Dashboard'>
                <section className='dashboard-container'>
                    <form className='search-posts'>
                        <section className='search-input'>
                            <input value={this.state.search} name='search' placeholder='Search by Title' onChange={this.handleChange} />
                            <button onClick={this.handleSubmit} type='submit'>Search</button>
                            <button>Reset</button>
                        </section>
                        <section className='posts-checked'>
                            <h3>My Posts</h3>
                            <input checked={this.state.userPosts} type='checkbox' onChange={this.handleCheck} />
                        </section>
                    </form>
                    <section className='display-post-container'>
                        {posts}
                    </section>

                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => reduxStore;

export default connect(mapStateToProps)(Dashboard);