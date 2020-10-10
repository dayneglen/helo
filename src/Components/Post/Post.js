import React, {Component} from 'react';
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

    

    render(){
        console.log(this.props.match.params.id)
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
                </section>
                
            </div>
        )
    }
}

export default Post