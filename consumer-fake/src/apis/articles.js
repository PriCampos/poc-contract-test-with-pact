import 'dotenv/config'
import axios from 'axios'

const baseURL = `http://127.0.0.1:${process.env.MOCK_SERVER_PORT}`

const getArticles = async() => {
  return await axios
    .get(`${baseURL}/articles`).then(response => response.data)
}

module.exports = {
  getArticles
}