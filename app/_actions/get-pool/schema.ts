import * as z from 'zod'


export const schema = z.object({
  code: z.string().nonempty(),
});
