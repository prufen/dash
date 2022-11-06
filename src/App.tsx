import { useState } from 'react'
import './App.css'
import { Button, MantineProvider, Text } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div>
        <img src="/prufen.svg" className="logo" alt="Prufen logo" />
      </div>
      <Text>Prufen</Text>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </MantineProvider>
  )
}

export default App
