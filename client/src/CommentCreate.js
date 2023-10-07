import React , {useState} from "react";
import axios from 'axios'
const CommentCreate = ({postId})=>{
    const [content, setContent] = useState('')

    //if we use await inside a function, then the function has to be async.
    //await should be used for network call or long running task like code
    //otherwise the execution engine wont wait till the network response comes
    async function onSubmit(event){
        event.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {content});
        setContent('');
    }
    

    return(
        <div>
            <form onSubmit ={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input 
                    value= {content}
                    onChange = { event => setContent(event.target.value)}
                    type="text" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default CommentCreate