import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';
import parse from 'html-react-parser';

class PostList extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return this.props.posts.reverse().map(post => {
            return (
                <div className="card blue lighten-3 z-depth-5" key={post._id}>
                    <div className="card-content grey-darken-4-text">
                        <span className="card-title">{post.title}</span>
                        <span className="card-content flow-text">
                            {parse(post.body)}
                        </span>
                    </div>
                    <div className="card-content grey-darken-4-text">
                        <span className="left">{post.category}</span>
                        <p className="right">
                            Created On: {new Date(post.dateCreated).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="container">
                {this.renderPosts()}
            </div>
        );
    }
}

function mapStateToProps({ posts }){
    return { posts };
}

export default connect(mapStateToProps,{fetchPosts})(PostList);