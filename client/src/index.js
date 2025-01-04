import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Animals from "./components/Animals";
import AddVisit from "./components/AddVisit";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path:"/animals",
                element: <Animals />,
            },
            {
                path:"/add-a-visit",
                element: <AddVisit />,
            }
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
