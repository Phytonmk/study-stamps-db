import {
  useState,
  useCallback,
  createContext,
  useEffect,
  useContext,
} from "react";
import { Text, Box, Static, useInput } from "ink";
import TextInput from "ink-text-input";
import { connectionContext } from "./App";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
import InkTableWeiredType from "ink-table";

const InkTable: React.FC<{ data: any[] }> = InkTableWeiredType as any;

export const QueryTable: React.FC<{
  getQuery: (...args: any[]) => string;
  requiredParams: string[];
  onExit: () => void;
}> = ({ getQuery, requiredParams, onExit }) => {
  const connection = useContext(connectionContext);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<string[]>([]);
  const [paramInputValue, setParamInputValue] = useState("");

  useEffect(() => {
    let actual = true;
    const query = getQuery(...params);
    if (
      connection !== null &&
      query &&
      params.length === requiredParams.length
    ) {
      setLoading(true);
      connection
        .query(query)
        .then(({ rows }) => {
          if (actual) {
            setLoading(false);
            setData(rows);
          }
        })
        .catch((err) => {
          if (actual) {
            setLoading(false);
            setError(err.message);
          }
        });
    }
    return () => (actual = false);
  }, [getQuery, params, connection, setLoading]);

  useInput((input) => {
    if (input === "q" && params.length === requiredParams.length) {
      onExit();
    }
  });

  if (params.length !== requiredParams.length) {
    return (
      <Box flexDirection="column">
        <Text>Input {requiredParams[params.length]}:</Text>
        <TextInput
          value={paramInputValue}
          onChange={setParamInputValue}
          onSubmit={() => {
            setParams((prevParams) => [...prevParams, paramInputValue]);
            setParamInputValue("");
          }}
        />
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      {error ? (
        <Box borderStyle="round" borderColor="red">
          <Text>{error}</Text>
        </Box>
      ) : null}
      {loading ? (
        <Text color="green">
          <Spinner /> Loading data...
        </Text>
      ) : null}
      {data ? (
        data.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <InkTable data={data} />
        )
      ) : null}
      <Text color="grey">Type q to go back</Text>
    </Box>
  );
};
