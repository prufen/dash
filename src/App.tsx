import "@mantine/core/styles.css";

import { useState } from "react";
import { Button, MantineProvider, Stack } from "@mantine/core";
import Header from "./Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider>
      <Header />
      <Stack align="center" mt={50}>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </Stack>
    </MantineProvider>
  );
}

export default App;
