import 'dotenv/config'
import { Pact } from '@pact-foundation/pact'
import path from 'path'
import { getArticles } from './articles'

const chai = require('chai')
const expect = chai.expect

const mockProvider = new Pact({
  consumer: 'ArticleWeb',
  provider: 'ArticleAPI',
  port: parseInt(process.env.MOCK_SERVER_PORT),
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'info'
})

const ARTICLE_BODY = [{
  "response": {
    "articles": [{
      "name": "Estratégia de Teste para APIs",
      "readingTime": 3,
      "author": "Priscila Campos",
      "publicationDate": "Jul 26, 2022"
    }]
  },
}]

describe('Integração com API do Artigos', () => {
  jest.setTimeout(30000);
  beforeAll(async() => 
    await mockProvider.setup().then(() => {
      mockProvider.addInteraction({
        uponReceiving: 'Solicitação para retornar artigos',
        withRequest: {
          method: 'GET',
          path: '/articles'
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: ARTICLE_BODY,
        },
      });
    })
  )

  it('Lista de artigos publicados', async() => {
    const jsonData = await getArticles()

    expect(jsonData[0].response.articles[0].name).equal("Estratégia de Teste para APIs")
    expect(jsonData[0].response.articles[0].readingTime).equal(3)
    expect(jsonData[0].response.articles[0].author).equal("Priscila Campos")
    expect(jsonData[0].response.articles[0].publicationDate).equal("Jul 26, 2022")
  })

  afterEach(() => mockProvider.verify())

  afterAll(() => mockProvider.finalize())
})
