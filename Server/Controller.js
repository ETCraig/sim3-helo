module.exports = {
    getUserInfo: (req, res) => {
      console.log('Hit Method')
      let db = req.app.get('db');
      let user_id = req.session.user.id;

      db.Get_User_Info([user_id]).then(data => {
        res.status(200).send(data[0]);
      }).catch((err) => {
        console.log(err)
        res.status(500).send()});
    },
    getUsers: (req, res) => {
      console.log('Hit Users Backend')
      let db = req.app.get("db");
      let id = req.session.user.id;
    
      console.log("getting all users");
      db.Get_Users(id).then(helo_users => {
          // do other db then in second .then do for loop
          // res.status(200).send(users);
          db.Get_Friends(id).then(friends => {
            for (let i = 0; i < helo_users.length; i++) {
              for (let j = 0; j < friends.length; j++) {
                if (helo_users[i].id === friends[j].friend_id) {
                  helo_users[i].is_friend = true;
                }
              }
            }
            res.status(200).send(helo_users)
          })
        
        })
        .catch(err => {
          console.log("couldnt find users", err);
          res.status(500).send();
        });
    },
    addFriend: (req, res) => {
      let db = req.app.get("db");
      let { user_id, friend_id } = req.body;
      // console.log("adding friend", req.body.first_name );
      db.Add_Friend(user_id, friend_id).then(users => {
        console.log("friend added");
          res.status(200).send(users);
        }).catch(err => {
          console.log("couldnt add friend", err);
          res.status(500).send();
        });
    },
    getRecommended: (req, res) => {
      let db = req.app.get("db");
      let id = req.session.user.id;
      db.User_Search(id).then(users => {
          console.log("Recommended users", users);
          let filtered_users = users.filter(e => {
            return e[req.params.sortParameter] === req.params.userParameter;
          });
          res.status(200).send(filtered_users);
        }).catch(err => {
          console.log("couldnt find users", err);
          res.status(500).send();
        });
    },
    userPatch: (req, res) => {
      let db = req.app.get('db');
      let user_id = req.session.user.id;
      let {
        first_name,
        last_name,
        gender,
        hair_color,
        eye_color,
        hobby,
        birthday,
        birthday_month,
        birth_year
      } = req.body;
      db.User_Patch([
        first_name,
        last_name,
        gender,
        hair_color,
        eye_color,
        hobby,
        birthday,
        birthday_month,
        birth_year,
        user_id
      ]).then(data => {
        res.status(200).send(data[0]);
      }).catch(() => res.status(500).send());
    },
    removeFriend: (req, res) => {
      console.log('Hit Remove Backend')
      let db = req.app.get('db');
      console.log('Hits the req.params')
      let {user_id, friend_id} = req.params;
      console.log('Hits the db')
      db.Remove_Friend(user_id, friend_id).then(users => {
        res.status(200).send(users);
      }).catch(err => {
        console.log(err)
        res.status(500).send();
      });
    },
    userSearch: (req, res) => {
      console.log('Hit beginning')
      let db = req.app.get("db");
      let id = req.session.user.id;
      console.log('Hit Search backend', id, req.params.search_parameter, req.params.search_input);
      db.User_Search(id).then(users => {
          console.log("filtered users", users);
          let filtered_users = users.filter(e => {
            return e[req.params.searchParameter] === req.params.searchInput;
          });
          res.status(200).send(filtered_users);
        }).catch(err => {
          console.log("couldnt find users", err);
          res.status(500).send();
        });
    }
};