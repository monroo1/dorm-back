export default (plugins, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.request.url === "/api/auth/local/register") {
      const invite = await strapi.entityService.findMany("api::invite.invite", {
        filters: { email: ctx.request.body.email },
      });

      if (invite.length === 0) {
        return ctx.badRequest(
          "Данному пользователю не было отправлено приглашение для регистрации!"
        );
      }

      await next();

      if (ctx.response.status === 200) {
        return strapi.entityService.update("api::invite.invite", invite[0].id, {
          data: { activated: true },
        });
      }

      return;
    } else {
      return next();
    }
  };
};
