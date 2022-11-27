import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateTopping = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateTopping),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const topping = await db.topping.create({ data: input });

    return topping;
  }
);
