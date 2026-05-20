'use strict';

// Las rutas personalizadas van primero para evitar que /:id capture "validar" o "confirmar"
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/invitados/validar/:codigo',
      handler: 'invitado.validar',
      config: { auth: false, policies: [], middlewares: [] }
    },
    {
      method: 'POST',
      path: '/invitados/confirmar',
      handler: 'invitado.confirmar',
      config: { auth: false, policies: [], middlewares: [] }
    },
    // Rutas CRUD estándar
    { method: 'GET',    path: '/invitados',     handler: 'invitado.find',    config: { policies: [], middlewares: [] } },
    { method: 'GET',    path: '/invitados/:id', handler: 'invitado.findOne', config: { policies: [], middlewares: [] } },
    { method: 'POST',   path: '/invitados',     handler: 'invitado.create',  config: { policies: [], middlewares: [] } },
    { method: 'PUT',    path: '/invitados/:id', handler: 'invitado.update',  config: { policies: [], middlewares: [] } },
    { method: 'DELETE', path: '/invitados/:id', handler: 'invitado.delete',  config: { policies: [], middlewares: [] } }
  ]
};
