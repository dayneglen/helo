import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Post.css';

class Post extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            authorPicture: ''
        }
    }

    componentDidMount() {
        this.getPost();
    }

    getPost = () => {
        const { id } = this.props.match.params;
        axios.get(`/api/post/${id}`).then(res => {
            const { content, img, profile_pic, title, username } = res.data;
            this.setState({
                title,
                img,
                content,
                authorPicture: profile_pic,
                author: username
            })
        }).catch(err => console.log(err))
    }

    deletePost = () => {
        const { id } = this.props.match.params;
        axios.delete(`/api/post/${id}`).then(() => {
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }


    render(){
        console.log(this.props)
        const {title, img, content, author, authorPicture} = this.state;
        console.log(authorPicture)
        return(
            <div className='Post'>
                <section className='post-container'>
                    <section>
                        <h1>{title}</h1>
                        <img className='post-pic' src={img} alt='post' />
                    </section>
                    <section>
                        <p>{content}</p>
                    </section>
                    <section className='fixed'>
                        <h6>{author}</h6>
                        <img className='profile-pic' src={authorPicture} alt={author} />
                    </section>
                    {(this.state.author === this.props.user.username) 
                    ? <button className='delete-btn' onClick={this.deletePost}>Delete</button>
                    : null}
                    
                </section>
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Post);