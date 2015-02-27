var express = require('express');
module.exports = function(app) {
  var customers = require(__dirname + '/controllers/customers_controller');
  var products = require(__dirname + '/controllers/products_controller');
  var orders = require(__dirname + '/controllers/orders_controller');
  app.use('/static', express.static( __dirname + '/static')).
      use('/images', express.static( __dirname + '/images')).
      use('/lib', express.static( __dirname + '/lib')).
      use('/bower_components', express.static( __dirname + '/bower_components')
  );
  app.get('/', function(req, res){
    res.render('shopping');
  });
  app.get('/products/get', products.getProducts);
  app.get('/orders/get', orders.getOrders);
  app.post('/orders/add', orders.addOrder);
  app.get('/customers/get', customers.getCustomer);
  app.post('/customers/update/shipping', customers.updateShipping);
  app.post('/customers/update/billing', customers.updateBilling);
  app.post('/customers/update/cart', customers.updateCart);
};