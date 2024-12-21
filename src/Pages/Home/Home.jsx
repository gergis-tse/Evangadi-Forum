import React from 'react'
import { useContext } from 'react'
import { AppState } from '../../App'

const Home = () => {
      const { user } = useContext(AppState)
      console.log(user)
      return (
            <>
                  <h1>Home Page</h1>
                  <br />
                  <br />
                  <h2> Welcome: {user?.username} </h2>

            </>
  )
}

export default Home