import { config as configDotenv } from "dotenv";
configDotenv();
// import { Client } from "pg";
// import { queries } from "./queris";

// const cleint = new Client(process.env.DB_CONNECT_ADDRESS);

// (async () => {
//   await cleint.connect();
//   console.log("connected");
//   // const addStampQuery = queries.write.addStamp({
//   //   collection: "Ruessian trains",
//   //   color: "pink",
//   //   country: "Russia",
//   //   year: 2020,
//   //   title: "test-stamp-2",
//   //   location: {
//   //     volume: "greate volume 1",
//   //     page: 1,
//   //     x: 4,
//   //     y: 4,
//   //   },
//   //   price: 1000,
//   //   series: "art",
//   //   size: "m",
//   //   theme: "test-theme",
//   // });
//   // console.log(`Running query: ${addStampQuery}`);
//   // await cleint.query(addStampQuery);

//   // const removeByTheme = queries.write.removeStampsByTheme(10);
//   // console.log(removeByTheme);
//   // await cleint.query(removeByTheme);

//   // const updateLocation = queries.write.updateLocation(3, {
//   //   volume: "greate volume 1",
//   //   page: 1,
//   //   x: 4,
//   //   y: 4,
//   // });
//   // console.log(updateLocation);
//   // await cleint.query(updateLocation);

//   // const { rows } = await cleint
//   //   .query(queries.read.collectionReport("American plains").pages)
//   //   .catch((err) => {
//   //     console.error(err.message);
//   //     process.exit();
//   //   });
//   // console.log(rows);

//   console.log("done");
//   process.exit();
// })();

import { renderApp } from "./cli/App";

renderApp();
