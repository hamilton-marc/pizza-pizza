import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateTopping = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateTopping),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const topping = await db.topping.update({ where: { id }, data });

    return topping;
  }
);
