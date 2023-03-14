import Express from "express";
import cors from "cors";
import createHttpError from "http-errors";
import listEndpoints from "express-list-endpoints";
import mediasRouter from "./media/index.js";
const server = Express();
const port = process.env.PORT || 3001;

const whiteList = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];
server.use(
  cors({
    origin: (currentOrigin, corsNext) => {
      x;
      if (!currentOrigin || whiteList.indexOf(currentOrigin) !== -1) {
        corsNext(null, true);
      } else {
        corsNext(
          createHttpError(
            400,
            `Origin ${currentOrigin} is not in the whitelist!`
          )
        );
      }
    },
  })
);

server.use(Express.json());
server.use("/medias", mediasRouter);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server is running on port:", port);
});
