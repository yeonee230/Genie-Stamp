import "regenerator-runtime";
import dotenv from "dotenv/config";
import "./db";
import "./models/Stamp";
import "./models/Teacher";
import app from "./server";


const PORT = process.env.PORT || 5011;

app.listen(PORT, () => console.log(`⭐️ Conneted server! PORT : ${PORT}`));
