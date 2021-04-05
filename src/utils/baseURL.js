const BASE_URL_HEROKU = "https://nodejs-lah.herokuapp.com"
const BASE_URL_LOCAL = "http://localhost:9000"

var baseURL = BASE_URL_HEROKU;
const setBaseURL = (isDev = false) => {
    if (isDev) {
        baseURL = BASE_URL_LOCAL;
    } else {
        baseURL = BASE_URL_HEROKU;
    }
}

export {baseURL, setBaseURL}
