import dotenv from 'dotenv'

const _config = () => {
  dotenv.config()
}

const env = () => {
  dotenv.config()
}

const config = {
  config: _config,
  env
}

export default config
