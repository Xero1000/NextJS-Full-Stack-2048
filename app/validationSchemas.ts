import { z } from "zod"

// validation schema that ensures the user enters at least
// one value for their name. 
export const highscoreNameSchema = z.object({
    name: z.string().min(1, "Name is required").max(255),
})