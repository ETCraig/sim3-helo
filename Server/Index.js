require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const checkLoggedIn = require('./Middleware');
const massive = require('massive');
const session = require('express-session');


const {SERVER_PORT, REACT_APP_CLIENT_ID, CLIENT_SECRET, REACT_APP_DOMAIN, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
});
//AUTH0
app.get('/auth/callback', async (req, res) => {
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    };
    
    let responseWithToken = await axios.post(`https://${process.env.REACT_APP_DOMAIN}/oauth/token`, payload);
    
    let userData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${responseWithToken.data.access_token}`);
    
    let picture = `https://robohash.org/${Math.floor((Math.random() + 1) * 1000)}`;

    const db = req.app.get('db');
    let {sub, pic, first, last} = userData.data;
    let userExists = await db.Find_User([userData.data.sub]);
    console.log('userExists');
    if(userExists[0]) {
        req.session.user = userExists[0];
        res.redirect('http://localhost:3000/#/Dashboard');
    } else {
        console.log('newUser');
        let pic = picture;
        db.Create_User([sub, pic, first, last]).then(createdUser => {
            req.session.user = createdUser[0];
            res.redirect('http://localhost:3000/#/Dashboard');
        });
    }
});


const ctrl = require('./Controller');

app.get('/api/checkLoggedIn', checkLoggedIn);
app.get('/api/getUserInfo', ctrl.getUserInfo);
app.get('/api/getUsers', ctrl.getUsers);
app.post("/api/addFriend", ctrl.addFriend);
app.get("/api/getRecommended/:sortParameter/:userParameter", ctrl.getRecommended);
app.patch("/api/userPatch", ctrl.userPatch);
app.get("/api/userSearch/:searchParameter/:searchInput", ctrl.userSearch);
app.delete("/api/removeFriend/:user_id/:friend_id", ctrl.removeFriend);


const port = process.env.SERVER_PORT || 3300;
app.listen(port, () => { console.log(`Listening an operating on Port ${port}`) });