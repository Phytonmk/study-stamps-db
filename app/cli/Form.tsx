import { useState, useEffect, useContext } from "react";
import { Text, Box, Static, useInput } from "ink";
import TextInput from "ink-text-input";
import { connectionContext } from "./App";
import Spinner from "ink-spinner";

export const Form: React.FC<{
  numberOnly: { [param: string]: boolean };
  getQuery: (...args: any[]) => string;
  requiredParams: string[];
  onExit: () => void;
}> = ({ getQuery, numberOnly, requiredParams, onExit }) => {
  const connection = useContext(connectionContext);
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
            onExit();
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

  return (
    <Box flexDirection="column">
      {error ? (
        <Box borderStyle="round" borderColor="red">
          <Text>{error}</Text>
        </Box>
      ) : null}
      {loading ? (
        <Text color="green">
          <Spinner /> Processing query...
        </Text>
      ) : null}
      {requiredParams.map((param, index) => (
        <Box flexDirection="column" key={param}>
          {params.length === index ? (
            <>
              <Text>Input {param}:</Text>
              <TextInput
                value={paramInputValue}
                onChange={setParamInputValue}
                onSubmit={() => {
                  setParams((prevParams) => {
                    let value = paramInputValue.replace(/\n/g, "");
                    const paramName = requiredParams[params.length];
                    if (numberOnly[paramName]) {
                      value = value.replace(/[^\d]/g, "");
                    }
                    if (value) {
                      setParamInputValue("");
                      return [...prevParams, value];
                    }
                    return prevParams;
                  });
                }}
              />
            </>
          ) : (
            <>
              <Text>Input {param}:</Text>
              <Text color={params[index] !== undefined ? "green" : "grey"}>
                {params[index] !== undefined ? params[index] : "not added yet"}
              </Text>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};
