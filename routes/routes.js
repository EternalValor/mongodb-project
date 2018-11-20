const PublicationsController = require('../controllers/publications_controller');
const UsersController = require('../controllers/users_controller');

module.exports = (app) => {
  
  // API routes
  app.get('/api/publications', PublicationsController.index);
  app.get('/api/publications/count', PublicationsController.aggregate);
  app.get('/api/publications/adv', PublicationsController.advIndex);
  app.post('/api/publications', PublicationsController.create);
  app.put('/api/publications/:id', PublicationsController.edit);
  app.delete('/api/publications/:id', PublicationsController.delete);

  // User authentication routes
  app.post('/signup', UsersController.signup);
  app.post('/signin', UsersController.signin);
  app.post('/signin/:id', UsersController.auth);
}