import { Verifier } from '@pact-foundation/pact'

const baseURL = 'http://localhost:3356'
const pactArticleWeb = 'http://localhost:9292/pacts/provider/ArticleAPI/consumer/ArticleWeb/latest'

describe('Cenário: validar contrato da  API ArticleAPI orientado ao consumidor ArticleWeb', () => {
  it('Então a resposta do Provider é a mesma esperada pelo Cliente Consumer', () => {
    const opts = {
      provider: 'ArticleAPI',
      providerBaseUrl: baseURL,
      pactUrls: [pactArticleWeb],
      publishVerificationResult: true,
      providerVersion: '1.0.0',
      providerVersionTags: ['test'],
      logLevel: 'DEBUG',
      timeout: 120000,
    }

    return new Verifier(opts).verifyProvider()
  })
})
