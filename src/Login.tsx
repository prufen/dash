import { useState } from "react";
import { Button, Code, Group, PasswordInput, Space, Text } from "@mantine/core";
import { getToken, setToken, clearToken } from "./authToken";

// Convert Headers object to raw text representation.
function headersString(headers: Headers) {
  let result = "";
  for (const h of headers) {
    result += `${h[0]}: ${h[1]}\n`;
  }
  return result;
}

interface Resp {
  response?: Response;
  responseText?: string;
}

function FetchResult({ response, responseText }: Resp) {
  if (response == null) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <Text>
        Issued GET request for <Code>https://api.github.com/rate_limit</Code>.
      </Text>
      <Space h="lg" />
      {response.ok ? (
        <>
          <Text c="green">
            Success! HTTP status: {response.status} {response.statusText}
          </Text>
        </>
      ) : (
        <>
          <Text c="red">
            Failed. HTTP status: {response.status} {response.statusText}
          </Text>
        </>
      )}
      <Space h="md" />
      <Text>Response headers:</Text>
      <Code block>{headersString(response.headers)}</Code>
      <Space h="md" />
      <Text>Response body:</Text>
      <Code block>{responseText}</Code>
    </>
  );
}

export default function Login() {
  const [stateToken, setStateToken] = useState(getToken());
  const [displayFetchResult, setDisplayFetchResult] = useState(false);
  const [resp, setResp] = useState<Resp>({});
  /* Disable Remove button if no token stored */
  const [clearDisabled, setClearDisabled] = useState(getToken() == "");

  return (
    <>
      <Text>
        Access token is stored in the browser local storage and used for
        querying GitHub repositories details. GitHub{" "}
        <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">
          Personal Access Token
        </a>{" "}
        can be{" "}
        <a href="https://github.com/settings/tokens?type=beta">generated</a> or
        obtained through OAuth. Treat it like a password.
      </Text>
      <Space h="lg" />
      <PasswordInput
        label="GitHub access token"
        withAsterisk
        placeholder="token"
        value={stateToken}
        onChange={(event) => {
          setStateToken(event.currentTarget.value);
          setDisplayFetchResult(false);
        }}
      />
      <Space h="md" />
      <Group justify="center">
        {/* Save and test button always enable to be able to test currently saved token */}
        <Button
          onClick={async () => {
            setToken(stateToken);
            setClearDisabled(getToken() == "");
            setDisplayFetchResult(true);
            setResp({});
            const response = await fetch("https://api.github.com/rate_limit", {
              headers: {
                Authorization: "Bearer " + stateToken,
              },
            });
            const text = await response.text();
            setResp({
              response: response,
              responseText: text,
            });
          }}
        >
          Save and test
        </Button>
        <Button
          disabled={clearDisabled}
          onClick={() => {
            clearToken();
            setClearDisabled(true);
            setStateToken("");
            setDisplayFetchResult(false);
          }}
        >
          Remove from browser local storage
        </Button>
      </Group>
      <Space h="md" />
      {displayFetchResult ? (
        <FetchResult
          response={resp.response}
          responseText={resp.responseText}
        />
      ) : null}
    </>
  );
}
