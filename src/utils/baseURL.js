const BASE_URL_HEROKU="https://nodejs-lah.herokuapp.com"
const BASE_URL_LOCAL="http://localhost:9000"

export const baseURL = process.env.NODE_ENV === 'development' ? BASE_URL_LOCAL : BASE_URL_HEROKU
