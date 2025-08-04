import { createBrowserRouter } from "react-router-dom";
import FormDesign from "../../component/Form/Form";
import FormList from "../../component/Form/FormList";
import TestimonialForms from "../../component/Form/Form";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <TestimonialForms />
  },
  {
    path: "form",
    element: <TestimonialForms />
  },

  {
    path: "/list",
    element: <FormList/>
  }


]);