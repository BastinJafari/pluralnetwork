import { z } from 'zod';
import * as jwt from "jsonwebtoken";

const PlatformSlug = z.union([z.literal('REDDIT'), z.literal('MEETUP'), z.literal('TELEGRAM')]);

const Organization = z.object({
  id: z.string(),
  name: z.string(),
});


const Account = z.object({
  id: z.string(),
  username: z.string(),
  platform: PlatformSlug,
  token: z.string().optional(),
});

const RedditAccount = Account.extend({
  platform: z.literal('REDDIT'),
  karma: z.number(),
});


export const PluralAccount = z.object({
  id: z.string(),
  accounts: z.array(Account),
});

export const SessionSchema = z.object({
  user: z.object({
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
  }),
  expires: z.string().datetime(),

})

const schemaForType = <T>() => <S extends z.ZodType<T, any, any>>(arg: S) => {
  return arg;
};


export const RedditContext = z.object({
  user: RedditAccount,
  jwt: z.string()
}).refine((schema) => {
  const token = schema.jwt;
  jwt.verify(token, "SSSSSS,", (err, decoded) => {
    if (err) {
      return false;
    }
    return decoded.sub === schema.user.id;
  });

});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const PhoneNumber = z.object({
  phone: z.string().regex(phoneRegex, 'Invalid Number!'),
})

export const TelegramVerificationCode = z.string()
// To get the types from the schemas, you can use the `.Type` property:

export type RedditAccount = z.infer<typeof RedditAccount>;

