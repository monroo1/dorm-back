/**
 * invite router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::invite.invite", {
  config: {
    create: {
      middlewares: ["api::invite.send-email"],
    },
  },
});
