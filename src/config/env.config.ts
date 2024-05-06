
import * as dotenv from 'dotenv';

export const getEnvFile = (): string => `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: getEnvFile() });
