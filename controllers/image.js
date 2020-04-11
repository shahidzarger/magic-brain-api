const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '294388546c18427ab38bba1c9b98dfeb'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where({ id: id })
        .increment({ entries: 1 })
        .returning('entries')
        .then(entries => {
            if (entries.length) {
                res.json(entries[0]);
            } else
                res.status(400).json('unable to get entries')
        })
        .catch(err => res.status(400).json('unable to get entries'));
}
module.exports = {
    handleImage,
    handleApiCall
}