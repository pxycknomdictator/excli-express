import express from "express";

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get("/", (_, res) => {
    return res.status(200).json({ status: "OK" });
});

export { app };
