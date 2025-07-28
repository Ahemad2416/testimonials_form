import { createBrowserRouter } from "react-router-dom";
import FormDesign from "../../component/Form/Form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FormDesign /> 
  },
  {
    path: "form",
    element: <FormDesign /> 
  }
]);