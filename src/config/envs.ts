import { env } from 'process'

export const envs = {
  PORT: env.PORT,
  JWT_SEED: env.JWT_SEED
}
