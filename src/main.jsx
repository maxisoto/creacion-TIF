import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    
    <RouterProvider router={App} />
);
