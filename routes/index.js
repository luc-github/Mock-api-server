var express = require('express');
var router = express.Router()

const upload = require('./upload')
const wiki = require('./wiki')

const routes = [
    { path: '/upload', route: upload },
    { path: '/wiki', route: wiki },
]

routes.forEach(route => router.use(route.path, route.route))

router.get('/', function (req, res) {
    const filteredRoutes = router.stack.filter(route => (route.route !== undefined))
    res.json(filteredRoutes);
})

module.exports = router