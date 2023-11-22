import { z } from "zod"

const schema = z.object({
    name: z.string().min(1),
    score: z.number()
})

export default schema