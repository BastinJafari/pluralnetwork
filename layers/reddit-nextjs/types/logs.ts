import { z } from 'zod';


export const Routes = z.enum(['r/', 'u/', 'home', 'media', 'cud', 'thread', 'search'])

// To get the type from the schema, you can use the `.Type` property:
export type Route = z.infer<typeof Routes>;

