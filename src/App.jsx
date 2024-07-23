import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Link from "./pages/Link"
import Redirect from "./pages/Redirect"
import UrlProvider  from "../src/context"
import RequireAuth from "./components/require-auth"
import { Analytics } from '@vercel/analytics/react';

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      
      {
        path:'/dashboard',
        element:(
        <RequireAuth>
        <Dashboard/>
        </RequireAuth>)
      },
      {
        path:'/link/:id',
        element:(
        <RequireAuth><Link/>
        </RequireAuth>
        )
      },
      {
        path:'/:id',
        element:<Redirect/>
      },

    
    ]
  }
])
function App() {
 

  return (
    <>
        <UrlProvider>
      <RouterProvider router={router} />
      <Analytics/>
    </UrlProvider>
    </>
  )
}

export default App
