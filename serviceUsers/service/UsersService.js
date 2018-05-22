'use strict';


/**
 * Crear un usuario
 * Cualquier usuario puede registrarse.
 *
 * body Users Crea el objeto usuario
 * returns Users
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "isSeller" : "isSeller",
  "name" : "name",
  "id" : "id",
  "state" : "state",
  "dateCreate" : "dateCreate",
  "isBuyer" : "isBuyer",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Eliminar un usuario 
 * Solo se puede eliminar un usuario logueado.
 *
 * userid String el usuario sera borrado
 * no response value expected for this operation
 **/
exports.deleteUser = function(userid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Obtener el usuario por id
 * 
 *
 * userid String Se requiereautenticacion. 
 * returns Users
 **/
exports.getUserById = function(userid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "isSeller" : "isSeller",
  "name" : "name",
  "id" : "id",
  "state" : "state",
  "dateCreate" : "dateCreate",
  "isBuyer" : "isBuyer",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Actualizar Usuario
 * Solo puede actualizar un usuario logueado
 *
 * userid String el id de usuario es necesario para actualizar
 * body Users Actualizar objeto usuario
 * no response value expected for this operation
 **/
exports.updateUser = function(userid,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

