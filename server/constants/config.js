import { CLIENT_URL } from "../app";





const corsOptions = {
  origin: [CLIENT_URL, "http://localhost:5173", "http://localhost:4173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const VIBECHAT_TOKEN="vibechat-token"
export  {corsOptions,VIBECHAT_TOKEN}