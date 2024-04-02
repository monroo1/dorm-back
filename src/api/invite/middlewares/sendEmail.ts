/**
 * `sendEmail` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const email = ctx.request.body.data.email;
    await next();

    await strapi.entityService.update(
      "api::invite.invite",
      ctx.response.body.data.id,
      {
        data: { user: ctx.state.user.id },
      }
    );

    await strapi.plugin("email").service("email").send({
      to: email,
      subject: "Приглашение в МЫЩага",
      text: "Вас пригласили в МЫЩага!",
      html: `<h1>Перейдите по ссылке чтобы зарегестрироваться в МЫЩага!</h1><a href="http://localhost:3000/signup">Кликни на меня</a>`,
    });

    return;
  };
};
