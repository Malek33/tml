require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")

app.use(express.json())

// app.use('/', (req, res)=>{
//     res.json('Yo Man its been a long time <<3')
// })

const posts = [
    {
        username: "Kyle",
        title: "Post 1"
    },
    {
        username: "Jim",
        title: "Post 2"
    },
]

app.get('/posts', authenticateToken, (req, res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res)=>{
    // Auth user

    const username = req.body.username
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if  (err) return res.sendStatus(403)
        req.user = user
        next()
    })
    // Bearer
}

app.listen(5000, ()=>{
    console.log('server is running');
})

// ACCESS_TOKEN_SECRET = eb93bac0b9b318ff9bc04d8335d117573706715108e19252bb9889e9edf2962a6aac561477f616312dbd460a1a918659b5b6c99319551551b4f249e7505ea05f
// REFRESH_TOKEN_SECRET = 9ab1ea39b64c7fa0358af7c6a1ce8cb27a82a4192e06672b3a2ee32d5778e95b95794c9ca7cb13855855b02b438a90427f4973fb5f7a44be55cedcfa116bd70e