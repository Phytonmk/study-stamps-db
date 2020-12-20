import { useState, useCallback, createContext, useEffect } from "react";
import { render, Text, Box, Static } from "ink";
import TextInput from "ink-text-input";
import { Client } from "pg";
import Spinner from "ink-spinner";
import { Menu } from "./Menu";

export const connectionContext = createContext<Client | null>(null);
const defaultValue =
  process.env.DB_CONNECT_ADDRESS || "postgresql://user:secret@localhost";

const App = () => {
  const [connectionString, setConnectionQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const handleChange = useCallback(
    (value: string) => {
      if (loading) return;
      setError("");

      setConnectionQuery(value);
    },
    [loading]
  );
  const handleSubmit = useCallback(() => {
    if (loading) return;
    setError("");
    if (connectionString || defaultValue) {
      const client = new Client(connectionString || defaultValue);
      setClient(client);
    }
  }, [connectionString, loading]);

  useEffect(() => {
    let actual = true;
    if (client !== null) {
      setLoading(true);
      client
        .connect()
        .then(() => {
          if (actual) {
            setLoading(false);
          }
        })
        .catch((err) => {
          if (actual) {
            setLoading(false);
            setError(err.message);
            setClient(null);
          }
        });
    }
    return () => (actual = false);
  }, [client, setLoading]);

  const isConnected = client && !loading && !error;

  if (isConnected) {
    return (
      <connectionContext.Provider value={client}>
        <Menu />
      </connectionContext.Provider>
    );
  }

  return (
    <Box flexDirection="column">
      {error ? (
        <Box borderStyle="round" borderColor="red">
          <Text>{error}</Text>
        </Box>
      ) : null}
      <Box flexDirection="column">
        <Box>
          {loading ? (
            <Text color="green">
              <Spinner /> Connecting...
            </Text>
          ) : (
            <Text>Enter postgresql connection string:</Text>
          )}
        </Box>
        <TextInput
          placeholder={defaultValue}
          onSubmit={handleSubmit}
          value={connectionString}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export const renderApp = () => render(<App />);
