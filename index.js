const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes')

const app = express();
/**multer */
/* // upload file path
const FILE_PATH = 'uploads';

// configure multer
const upload = multer({
    dest: `${FILE_PATH}/`
}); */
// enable files upload
// app.use(fileUpload({
//     createParentPath: true
// }));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', routes)


app.get('/', function (req, res) {
    const filteredRoutes = app._router.stack.filter(route => (route.route !== undefined))
    res.json(filteredRoutes);
})

//start app 
const port = process.env.PORT || 3000;

app.listen(port, () => {
    if (process.execArgv.includes('--inspect')) {
        console.log('Open chrome://inspect')
        console.log('info : https://www.digitalocean.com/community/tutorials/how-to-debug-node-js-with-the-built-in-debugger-and-chrome-devtools#step-3-%E2%80%94-debugging-nodejs-with-chrome-devtools');
    }
    console.log(`App is listening on port ${port}.`)
}
);