const Publication = require('../models/Publication');

module.exports = {
  index(req, res, next) {
    const { query } = req;

    if(Object.keys(query).length === 1 && query.title) {
      Publication.find({title: {$regex: query.title}})
        .then(publications => res.send(publications))
        .catch(next);
    } else {
      Publication.find(query)
        .then(publications => res.send(publications))
        .catch(next);
    }

    console.log(query);
  },

  create(req, res, next) {
    const data = req.body;
    Publication.create(data)
      .then(publication => res.send(publication))
      .catch(next);
  },

  edit(req, res, next) {
    const publicationId = req.params.id;
    const publicationProps = req.body;
    console.log(publicationProps);

    Publication.update({_id: publicationId}, publicationProps)
      .then(() => Publication.findById({_id: publicationId}))
      .then(publication => res.send(publication))
      .catch(next);
  },

  delete(req, res, next) {
    const publicationId = req.params.id;

    Publication.remove({_id: publicationId})
      .then(publication => res.send(publication))
      .catch(next);
  }
}