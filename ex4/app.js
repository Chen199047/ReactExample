const express = require('express');
const data = require('./users.json');
const bodyParser =require('body-parser');

const users = data.users;

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('HTTP request: GET /');
});
app.get('/users', function (req, res) {
    res.send(users);
});

app.get('/users/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    let res_data = "No user";

    for (let user of users){
        if(id === user.id){
            res_data = user;
            break;
        }
    }
    res.send(res_data);
});

app.post('/users', function (req, res) {
    let user_data = req.body;

    users.push(user_data);
    res.send(users);
});

app.put('/users/:id', function (req, res) {
    let id = req.params.id;
    let user_data = req.body;
    console.log(user_data);
    for (let user of users){
        if(id === user.id){
            let uid = users.indexOf(user);
            users[uid] = user_data;
            break;
        }
    }
    res.send(user_data);
});

app.delete('/users/:id', function (req, res) {
    let id = req.params.id;

    for (let user of users){
        if(id === user.id){
            let uid = users.indexOf(user);
            users.splice(uid, 1);
        }
    }
    res.send(users);
});


//exercise 4 Follower function
app.get('/users/:id/follow', function (req, res) {
    let id = req.params.id;
    let res_data = "No user";

    for (let user of users){
        if(id === user.id){
            res_data = user.following;
        }
    }
    res.send(res_data)
});

app.put('/users/:id/follow', function (req, res) {
    let id = req.params.id;
    let res_data = "No user";
    let user_data = req.body.follow;
    for (let user of users){
        if(id === user.id){
            user.following.push(user_data);
        }
    }
    res.send(users)
});

app.delete('/users/:id/follow', function (req, res) {
    let id = req.params.id;
    let res_data = "No user";
    let user_data = req.body.follow;
    for (let user of users){
        if(id === user.id){
            user.following.pop(user_data);
        }
    }
    res.send(users)
});


//Exercise 5: Adding microblog posts
app.post('/users/:id/post', function (req, res) {
    let id = req.params.id;
    let post_content = req.body;
    for(let user of users){
        if(id === user.id){
            if("posts" in user){
                user.posts.push(post_content);
            }else{
                user.posts = [];
            }
        }
    }
    res.send(users);
});

app.get('/users/:id/post', function (req, res) {
    let id = req.params.id;
    let res_data = "No user";

    for (let user of users){
        if(id === user.id){
            res_data = user.posts;
        }
    }
    res.send(res_data)
});

app.put('/users/:id/post', function (req, res) {
    let id = req.params.id;
    let user_data = req.body.data;

    for(let user of users){
        if(id === user.id){
            user.posts.push(user_data);
        }
    }
    res.send(users);
})

app.listen(8080, function () {
    console.log("Example app listening on port 8080！")
});

app.use(function (req, res, next) {
    res.status(404).send("404 not Found");
});
