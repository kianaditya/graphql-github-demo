import React from 'react'
import './App.css'

import {ApolloClient} from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import MyProfile from './components/MyProfile'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-boost'


const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${
        process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
      }`
    }
  }
})

const link = authLink.concat(httpLink)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>GitHub API</h1>
        <MyProfile />
      </div>
    </ApolloProvider>
  )
}

export default App
