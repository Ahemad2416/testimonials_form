import { createBrowserRouter, Form } from "react-router-dom";
import FormDesign from "../../component/Form/Form";

export const router = createBrowserRouter([

    {
        path:"/",
        Element:<FormDesign></FormDesign>
    },

    {
        path:"form",
        element:<FormDesign></FormDesign>
    }
    
]);