const PublicationsController = require('../controllers/publications_controller');

module.exports = (app) => {
  
  app.get('/api/publications', PublicationsController.index);
  app.get('/api/publications/count', PublicationsController.aggregate);
  app.post('/api/publications', PublicationsController.create);
  app.put('/api/publications/:id', PublicationsController.edit);
  app.delete('/api/publications/:id', PublicationsController.delete);

}