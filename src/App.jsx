import { RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/home/home'
import { adminRoutes, privateRoutes, publicRoutes } from './routes/router'
import { useSelector } from 'react-redux'

function App() {
  const isLogin = useSelector(state => state.user.isLogin);
  const role = useSelector(state => state.user.role);
  let route = publicRoutes;
  if (isLogin == true && role == 'user') {
    route = privateRoutes;
  } else if (isLogin == true && role == 'admin') {
    route = adminRoutes;
  }

  return (
    <>
       <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
