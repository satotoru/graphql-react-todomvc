import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { graphql } from './gql'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const testFieldDocument = graphql(`
  query TestField {
    testField
    }
  `)

function App() {
  const [count, setCount] = useState(0)
  const { data } = useQuery({
    queryKey: ['testField'],
    queryFn: async () => {
      const { testField } = await request({
        url: 'http://localhost:5000/graphql',
        document: testFieldDocument
      })
      return testField
    },
  })

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR {data}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
