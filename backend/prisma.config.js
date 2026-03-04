import * as dotenv from 'dotenv';
dotenv.config();
export default {
  schema: 'prisma/schema.prisma',
  datasource: {
    url: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  },
};
