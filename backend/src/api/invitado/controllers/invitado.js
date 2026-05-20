'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::invitado.invitado', ({ strapi }) => ({

  // GET /api/invitados/validar/:codigo
  async validar(ctx) {
    const codigoNormalizado = ctx.params.codigo?.trim().toUpperCase();
    if (!codigoNormalizado) return ctx.badRequest('El codigo es requerido.');

    const resultados = await strapi.documents('api::invitado.invitado').findMany({
      filters: { codigo: codigoNormalizado },
      populate: { acompanantes: true }
    });

    const invitado = resultados[0];
    if (!invitado) return ctx.notFound('Codigo no encontrado.');

    return ctx.send({
      data: {
        yaConfirmado: invitado.confirmado,
        nombre: invitado.nombre,
        acompanantesMaximos: invitado.acompanantesMaximos,
        acompanantes: invitado.acompanantes ?? []
      }
    });
  },

  // POST /api/invitados/confirmar
  // Body: { codigo: string, acompanantes: [{ nombre?: string }] }
  async confirmar(ctx) {
    const { codigo, acompanantes = [] } = ctx.request.body;

    if (!codigo) return ctx.badRequest('El campo codigo es requerido.');
    if (!Array.isArray(acompanantes)) return ctx.badRequest('acompanantes debe ser un arreglo.');

    const codigoNormalizado = codigo.trim().toUpperCase();

    const resultados = await strapi.documents('api::invitado.invitado').findMany({
      filters: { codigo: codigoNormalizado }
    });

    const invitado = resultados[0];
    if (!invitado) return ctx.notFound('Codigo no encontrado.');
    if (invitado.confirmado) return ctx.badRequest('Esta invitacion ya fue confirmada.');

    if (acompanantes.length > invitado.acompanantesMaximos) {
      return ctx.badRequest(
        `El maximo permitido es ${invitado.acompanantesMaximos} acompanante(s).`
      );
    }

    // Guardar null si el nombre viene vacío
    const acompanantesLimpios = acompanantes.map(a => ({
      nombre: a.nombre?.trim() || null
    }));

    const actualizado = await strapi.documents('api::invitado.invitado').update({
      documentId: invitado.documentId,
      data: {
        confirmado: true,
        fechaConfirmacion: new Date().toISOString(),
        acompanantes: acompanantesLimpios
      },
      populate: { acompanantes: true }
    });

    const total = actualizado.acompanantes?.length ?? acompanantesLimpios.length;
    const msg = total === 0
      ? `¡Gracias ${invitado.nombre}! Tu asistencia ha sido confirmada.`
      : `¡Gracias ${invitado.nombre}! Tu asistencia ha sido confirmada con ${total} acompañante(s).`;

    return ctx.send({
      data: {
        mensaje: msg,
        nombre: invitado.nombre,
        acompanantes: actualizado.acompanantes ?? acompanantesLimpios
      }
    });
  }

}));
