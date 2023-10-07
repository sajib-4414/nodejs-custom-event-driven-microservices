import React , {useState, useEffect} from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = function () {
    const [posts, setPosts] = useState({});
    const fetchPosts = async() =>{
        const response = await axios.get('http://localhost:4002/posts') .catch(function (error) {
            console.log("Error getting posts");
            // if (error.response) {
            //   // The request was made and the server responded with a status code
            //   // that falls out of the range of 2xx
            //   console.log(error.response.data);
            //   console.log(error.response.status);
            //   console.log(error.response.headers);
            // } else if (error.request) {
            //   // The request was made but no response was received
            //   // `error.request` is an instance of XMLHttpRequest in the browser 
            //   // and an instance of http.ClientRequest in node.js
            //   console.log(error.request);
            // } else {
            //   // Something happened in setting up the request that triggered an Error
            //   console.log('Error', error.message);
            // }
           
          });
        // console.log(response.data)
        console.log("called ")
        setPosts(response.data);
    }
    useEffect(() => {
        fetchPosts();
    }, []);//empty array means only run this function one time

    //object.values is used to extract the array from the object
    const renderedPosts = Object.values(posts).map(post =>{
        return( 
        <div 
        key={post.id} 
        className="card" 
        style={{width: '30%', marginBottom: '20px'}}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList comments={post.comments}/>
                <CommentCreate postId={post.id}/>
                
            </div>
          
        </div>);
    });
    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
        </div>
}

export default PostList;