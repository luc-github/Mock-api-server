var express = require('express');
const multer = require('multer');
const mime = require('mime');

var router = express.Router();
// upload file path
const FILE_PATH = 'uploads';

// configure multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}.${Date.now()}.${mime.getExtension(file.mimetype)}`);
    }
});

var upload = multer({ storage: storage });

router.post('/', upload.array('files', 8), async (req, res) => {
    try {
        const { files } = req;

        // check if files are available
        if (!files) {
            res.status(400).send({
                status: false,
                data: 'No photo is selected.'
            });
        } else {
            let data = [];

            // iterate over all files
            files.map(p => data.push({
                name: p.originalname,
                mimetype: p.mimetype,
                size: p.size
            }));

            // send response
            res.send({
                status: true,
                message: 'files are uploaded.',
                data: data
            });
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/', async (req, res) => {
    res.json({ foo: 'bar' })
    console.log(router)
})

module.exports = router;
