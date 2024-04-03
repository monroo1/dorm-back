/**
 * `getUserInvites` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.filters = {
      ...ctx.query.filters,
      ["user"]: {
        id: {
          $eq: ctx.state.user.id,
        },
      },
    };

    await next();
  };
};
