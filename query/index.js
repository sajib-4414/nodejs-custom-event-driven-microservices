const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json())
app.use(cors())

const posts = {};
function handleEvent(type, data){
    if(type == 'PostCreated'){
        const {id, title} = data
        posts[id] = { id, title, comments:[]}
    }
    else if (type == 'CommentCreated'){
        const {id, content, postId, status} = data;
        const post = posts[postId]
        post.comments.push({id, content, status})
    }
    else if (type == 'CommentUpdated'){
        const {id, content, postId, status} = data;
        const post = posts[postId]
        const comment = post.comments.find(comment => comment.id == id)
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (request, response) => {
    response.send(posts)
})

app.post('/events', (request, response) => {
    const {type, data} = request.body;
    handleEvent(type, data);
    response.send({})
})

app.listen(4002, async function callback(){
    console.log('Server running on port 4002')
    const response = await axios.get('http://localhost:4005/events');
    for (const event of response.data){
        console.log("Processing event:", event.type);
        handleEvent(event.type, event.data);
    }
})