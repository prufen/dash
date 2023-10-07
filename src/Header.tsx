import { Container, Group, Text, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import classes from './Header.module.css';

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
    <Group>
      <img src="/prufen.svg" className="logo" alt="Prufen logo" />
      <Text>Prufen</Text>
    </Group>
  )
}

export default function Header() {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <PrufenLogo />
        <ColorThemeSwitcher />
      </Container>
    </header>
  );
}
