import { useState, useEffect, useContext } from "react";
import { Text, Box, Static, useInput } from "ink";
import { connectionContext } from "./App";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
import TextInput from "ink-text-input";

export const Select: React.FC<{
  query: string;
  requiredParams: string[];
  queryOnSelect: (...args: any[]) => string;
  onExit: () => void;
}> = ({ query, requiredParams, queryOnSelect, onExit }) => {
  const connection = useContext(connectionContext);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<string[]>([]);
  const [paramInputValue, setParamInputValue] = useState("");

  useEffect(() => {
    let actual = true;
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
  }, [query, connection]);

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

  if (error) {
    return (
      <Box borderStyle="round" borderColor="red">
        <Text>{error}</Text>
        <Text color="grey">Type q to go back</Text>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box flexDirection="column">
        <Text>
          <Spinner />
        </Text>
        <Text color="grey">Type q to go back</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <SelectInput
        items={data.map((row) => ({
          value: row.id,
          label: row.title,
        }))}
        onSelect={({ value }) => {
          setLoading(true);
          connection
            .query(queryOnSelect(value, ...params))
            .then(() => {
              setLoading(false);
              onExit();
            })
            .catch((err) => {
              setLoading(false);
              setError(err.message);
            });
        }}
      />
      <Text color="grey">Type q to go back</Text>
    </Box>
  );
};
