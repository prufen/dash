import { useState } from 'react'
import { Button, Center, ColorScheme, ColorSchemeProvider, Group, Header, MantineProvider, Stack, Text, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

function ColorThemeSwitcher() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
}

function PrufenLogo() {
  return (
    <Group spacing="xs">
      <img src="/prufen.svg" className="logo" alt="Prufen logo" />
      <Text>Prufen</Text>
    </Group>
  )
}

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const [count, setCount] = useState(0)

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Header height={40}>
          <Group position="apart">
            <PrufenLogo />
            <ColorThemeSwitcher />
          </Group>
        </Header>
        <Stack align="center" mt={50}>
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
        </Stack>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
