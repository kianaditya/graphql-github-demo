import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
      repositories(first: 10) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`

const MyProfile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return <h4>Loading</h4>
      if (error) console.log(error)

      const {
        viewer,
        viewer: {
          repositories: { edges }
        }
      } = data
      return (
        <div>
          {viewer.name} {viewer.login}
          <ul>
            {edges.map(edge => {
              return <li>{edge.node.name}</li>
            })}
          </ul>
        </div>
      )
    }}
  </Query>
)

export default MyProfile
