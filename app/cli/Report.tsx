import {
  useState,
  useCallback,
  createContext,
  useEffect,
  useContext,
} from "react";
import { Text, Box, Static, useInput, Spacer } from "ink";
import TextInput from "ink-text-input";
import { connectionContext } from "./App";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
import InkTableWeiredType from "ink-table";

const InkTable: React.FC<{ data: any[] }> = InkTableWeiredType as any;

export const ReportDisplay: React.FC<{
  getQueries: (...args: any[]) => string[];
  getNames: () => string[];
  paramName: string;
  onExit: () => void;
}> = ({ getQueries, getNames, paramName, onExit }) => {
  const connection = useContext(connectionContext);
  const [data, setData] = useState<any[][]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [param, setParam] = useState<string | null>(null);
  const [paramInputValue, setParamInputValue] = useState("");

  useEffect(() => {
    let actual = true;
    const queries = getQueries(param);
    if (connection !== null && queries && param) {
      setLoading(true);
      Promise.all(queries.map((query) => connection.query(query)))
        .then((results) => {
          if (actual) {
            setLoading(false);
            setData(results.map(({ rows }) => rows));
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
  }, [getQueries, param, connection, setLoading]);

  useInput((input) => {
    if (input === "q" && (param !== null || paramName === "")) {
      onExit();
    }
  });

  if (paramName !== "" && param === null) {
    return (
      <Box flexDirection="column">
        <Text>Input {paramName}:</Text>
        <TextInput
          value={paramInputValue}
          onChange={setParamInputValue}
          onSubmit={() => setParam(paramInputValue)}
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
          data.map((tableData, index) => (
            <Box key={index} flexDirection="column">
              <Box height={1} />
              <Text>{getNames()[index]}</Text>
              <InkTable data={tableData} />
            </Box>
          ))
        )
      ) : null}
      <Text color="grey">Type q to go back</Text>
    </Box>
  );
};
