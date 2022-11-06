import { useState } from 'react'
import { Button, MantineProvider, Stack, Text } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Stack align="center" mt={50}>
        <div>
          <img src="/prufen.svg" className="logo" alt="Prufen logo" />
        </div>
        <Text>Prufen</Text>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </Stack>
    </MantineProvider>
  )
}

export default App
