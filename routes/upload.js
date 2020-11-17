var express = require('express');
var router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = [];

            //loop all files
            Object.keys(req.files.files).forEach((key) => {
                let file = req.files.files[key];

                //move file to uploads directory
                file.mv('./uploads/' + file.name);

                //push file details
                data.push({
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                });
            });

            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})


router.get('/', async (req, res) => {
    res.json({ foo: 'bar' })
    console.log(router)
})

module.exports = router;
