import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  IconLogout,
  IconInfoCircle,
  IconChevronDown,
} from "@tabler/icons-react";
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  Button,
} from "@mantine/core";
import { getToken } from "./authToken";
import classes from "./LoggedInProfile.module.css";
import { Link } from "react-router-dom";

const loggedInProfileQuery = gql`
  query {
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
    viewer {
      login
      url
      name
      avatarUrl
    }
  }
`;

function LoginButton() {
  return <Button variant="default" component={Link} to="/login">Login</Button>;
}

export default function LoggedInProfile() {
  if (getToken() == "") {
    // Definitely not authenticated, shortcut to login button.
    return <LoginButton />;
  }

  const { loading, error, data } = useQuery(loggedInProfileQuery);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // TODO: Handle the case when the user is out of tokens:
  // https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#exceeding-the-rate-limit

  // Looks like type assertions are necessary here:
  // https://github.com/apollographql/apollo-link/issues/300#issuecomment-518445337
  if (
    error &&
    error.networkError &&
    "statusCode" in error.networkError &&
    error.networkError.statusCode === 401
  ) {
    return <LoginButton />;
  }

  if (error) {
    // Some other error.
    console.log("User query error:", error);
    return (
      <p>
        Error: <span>{error.toString()}</span>
      </p>
    );
  }

  const { login, url, name, avatarUrl } = data!.viewer;
  const { remaining, limit, resetAt } = data.rateLimit;

  // TODO: Display rate limits.
  // TODO: Implement Logout button.
  return (
    <Group>
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={
              userMenuOpened
                ? classes.user + " " + classes.userActive
                : classes.user
            }
          >
            <Group gap={7}>
              <Avatar
                src={avatarUrl}
                alt={name ?? ""}
                radius="xl"
                size={20}
              ></Avatar>
              <Text fw={500} size="sm" lh={1} mr={3}>
                {login}
              </Text>
              <IconChevronDown
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {
            // Specifying "noopener" to avoid leaking current context:
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/open#noopener
          }
          <Menu.Item
            leftSection={
              <IconInfoCircle
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component="a"
            href={url}
            target="_blank"
            rel="noopener"
          >
            {name}
          </Menu.Item>
          <Menu.Item disabled>
            {remaining} of {limit} tokens remaining
            <br />
            Reset at {resetAt}
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconLogout
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
