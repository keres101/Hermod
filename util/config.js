import dotenv from 'dotenv'

const _config = () => {
  env()
}

const env = () => {
  if (process.env.NODE_ENV === 'development') {
    dotenv.config()
  }
}

const config = {
  config: _config,
  env
}

export default config
