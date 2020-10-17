// @ts-check
import { initSchema, UserSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const { Blog, Post, Comment } = initSchema(schema as any);

export {
  Blog,
  Post,
  Comment
};