module.exports = function(req, res) {
    console.log('checking logged in, req.user: ', req.user)
    if (req.session.user) {
        res.status(200).send(req.session.user);
        console.log('logged in')
    } else {
        console.log('not logged in')
        res.status(401).send('Nice try sucka');
    };
}