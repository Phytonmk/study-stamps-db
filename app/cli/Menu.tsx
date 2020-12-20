import {
  useState,
  useCallback,
  createContext,
  useEffect,
  useContext,
} from "react";
import { Text, Box, Static } from "ink";
import TextInput from "ink-text-input";
import { connectionContext } from "./App";
import SelectInput from "ink-select-input";
import { QueryTable } from "./Table";
import { queries } from "../queris";
import { ReportDisplay } from "./Report";
import { Form } from "./Form";
import { Select } from "./Select";

const items = [
  {
    label: "list all stamps",
    value: "stamps",
  },
  {
    label: "add stamp",
    value: "newStampForm",
  },
  {
    label: "remove stamps by theme",
    value: "removeStampsByTheme",
  },
  {
    label: "update location of stamp",
    value: "updateLocation",
  },
  {
    label: "get countries by section",
    value: "countriesBySection",
  },
  {
    label: "get volumes by series",
    value: "volumesBySeries",
  },
  {
    label: "get locations by theme",
    value: "locationsByTheme",
  },
  {
    label: "get theme of series by size",
    value: "themeOfSeriesBySize",
  },
  {
    label: "get country by location",
    value: "countryByLocation",
  },
  {
    label: "get countries by theme",
    value: "countryByTheme",
  },
  {
    label: "display collection report",
    value: "collectionReport",
  },
];

const screen2param = {
  stamps: [],
  countriesBySection: ["section name"],
  volumesBySeries: ["series name"],
  locationsByTheme: ["theme name"],
  themeOfSeriesBySize: ["size name"],
  countryByLocation: [
    "volume name",
    "page number",
    "coordinate x on page (number)",
    "coordinate y on page  (number)",
  ],
  countryByTheme: ["theme name"],
};

export const Menu = () => {
  const [screen, setScreen] = useState("");
  const onExit = useCallback(() => setScreen(""), []);
  const handleSelect = (item: { value: string }) => {
    setScreen(item.value);
  };

  if (screen === "newStampForm") {
    return (
      <Form
        getQuery={queries.write.addStamp}
        numberOnly={{
          year: true,
          цена: true,
          price: true,
          "x coordinate on page": true,
          "y coordinate on page": true,
        }}
        requiredParams={[
          "collection",
          "section",
          "year",
          "price",
          "color",
          "country",
          "volume",
          "page",
          "x coordinate on page",
          "y coordinate on page",
          "series",
          "size",
          "title",
          "theme",
        ]}
        onExit={onExit}
      />
    );
  }
  if (screen === "removeStampsByTheme") {
    return (
      <Select
        query={`select id, title from themes`}
        requiredParams={[]}
        queryOnSelect={queries.write.removeStampsByTheme}
        onExit={onExit}
      />
    );
  }
  if (screen === "updateLocation") {
    return (
      <Select
        query={`select id, title from stamps`}
        requiredParams={["volume", "page", "x", "y"]}
        queryOnSelect={queries.write.updateLocation}
        onExit={onExit}
      />
    );
  }
  if (screen === "collectionReport") {
    return (
      <ReportDisplay
        getQueries={(collection) =>
          Object.values(queries.read.collectionReport(collection))
        }
        getNames={() => Object.keys(queries.read.collectionReport(""))}
        paramName="collection name"
        onExit={onExit}
      />
    );
  }
  if (queries.read[screen]) {
    return (
      <QueryTable
        getQuery={queries.read[screen]}
        requiredParams={screen2param[screen]}
        onExit={onExit}
      />
    );
  }

  return (
    <Box flexDirection="column">
      <Text>Select one of available actions</Text>
      <SelectInput items={items} onSelect={handleSelect} />
    </Box>
  );
};
