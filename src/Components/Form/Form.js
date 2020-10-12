import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Form.css';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            img: '',
            content: '',
            showImage: false
        }
    }

    // componentDidMount() {
    //     if (!this.props.user.username) {
    //         this.props.history.push('/');
    //     }
    // }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.img !== prevState.img) {
            if(this.state.img.includes('http')){
                this.setState({ showImage: true })
            } else {
                this.setState({showImage: false})
            }
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    addPost = (e) => {
        e.preventDefault();
        const { content, img, title } = this.state;
        axios.post(`/api/post`, { title, img, content }).then(() => {
            this.props.history.push('/dashboard');
        }).catch(err => console.log(err));
    }
 
    render() {
        const divBackground = {
            backgroundImage: 'url(http://moorestown-mall.com/noimage.gif)'
        }

        return (
            <main className='Form'>
                <section className='form-container'>
                    <h1>New Post</h1>
                    <form>
                        <label htmlFor='title'>Title:</label>
                        <input id='title' name='title' value={this.state.title} onChange={ (e) => this.handleChange(e)}/>
                        <div className='img-container' style={divBackground}></div>
                        <label htmlFor='img'>Image URL:</label>
                        <input id='img' name='img' value={this.state.img} onChange={(e) => this.handleChange(e)} />
                        <label htmlFor='content'>Content:</label>
                        <textarea id='content' name='content' value={this.state.content} onChange={(e) => this.handleChange(e)} />
                        <button onClick={this.addPost}>Post</button>
                    </form>
                </section>
                
            </main>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Form);