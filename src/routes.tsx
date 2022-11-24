import { Navigate, RouteObject } from 'react-router-dom'
import { App } from './App'
import { Home } from './pages/Home'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]
