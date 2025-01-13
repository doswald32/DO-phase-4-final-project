import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Visits from "./components/Visits";
import NewVisit from "./components/NewVisit";
import UpdateVisit from "./components/UpdateVisit";

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
                path:"/visits",
                element: <Visits />,
            },
            {
                path:"/new-visit",
                element: <NewVisit />,
            },
            {
                path:"/update-visit/:id",
                element: <UpdateVisit />
            }
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
