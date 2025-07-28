import { RouterProvider } from 'react-router-dom'
import { router } from './assets/router/Router'

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App