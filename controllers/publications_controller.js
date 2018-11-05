const Publication = require('../models/Publication');

module.exports = {
  index(req, res, next) {
    const { query } = req;
    console.log(query);
    const skip = parseInt(query.skip);
    const limit = parseInt(query.limit);
    delete query.skip;
    delete query.limit;
    console.log(query);
    !!query.title ?
      Publication.find({...query, title: {$regex: query.title}})
        .skip(skip)
        .limit(limit)
        .then(publications => {
          Publication.find({...query, title: {$regex: query.title}})
            .count()
            .then( count => res.send([...publications, count]) );
        })
        .catch(next)
    : Publication.find(query)
        .skip(skip)
        .limit(limit)
        .then(publications => {
          Publication.find(query)
            .count()
            .then( count => res.send([...publications, count]) );
        })
        .catch(next)
  },

  advIndex(req, res, next) {
    const { query } = req;
    const skip = parseInt(query.skip);
    const limit = parseInt(query.limit);
    delete query.skip;
    delete query.limit;

    advQuery = {};
    Object.keys(query).map(field => {
      if(field.includes(' from') || field.includes(' to')) {
        if(field.includes(' from')) {
          if(advQuery[field.split(" ")[0]]) advQuery[field.split(" ")[0]]["$gte"] = parseInt(query[field]);
          else {
            advQuery[field.split(" ")[0]] = {
              $gte: 0,
              $lte: Infinity
            };
            advQuery[field.split(" ")[0]]["$gte"] = parseInt(query[field]);
          }
        } else {
          if(advQuery[field.split(" ")[0]]) advQuery[field.split(" ")[0]]["$lte"] = parseInt(query[field]);
          else {
            advQuery[field.split(" ")[0]] = {
              $gte: 0,
              $lte: 0
            };
            advQuery[field.split(" ")[0]]["$lte"] = parseInt(query[field]);
          }
        }
      } else {
        if(field === 'type') advQuery[field] = parseInt(query[field]);
        else {
          if(typeof query[field] === typeof []) {
            console.log(query[field]);
            advQuery[field] = {};
            advQuery[field]["$all"] = query[field];
          } else {
            advQuery[field] = {};
            advQuery[field]["$regex"] = query[field];
          }
        }
      }
    })

    Publication.find(advQuery)
      .skip(skip)
      .limit(limit)
      .then(publications => {
        Publication.find(advQuery)
          .count()
          .then( count => res.send([...publications, count]));
      })
      .catch(next);
    // res.send(advQuery);
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
  },

  aggregate(req, res, next) {
    Publication.aggregate([{$group: {_id: '$type', count: {$sum: 1}}}])
      .sort({_id: 1})
      .then(counts => res.send(counts))
      .catch(next);
  }
}