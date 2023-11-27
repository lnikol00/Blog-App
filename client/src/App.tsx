import './assets/global.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import BlogDetails from './pages/home/BlogDetails';
import NotFound from './pages/notFound/NotFound';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import Layout from './context/Layout';
import RequireAuth from './context/RequireAuth';
import PersistLogin from './context/PersistLogin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route index element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/blogs/:id' element={<BlogDetails />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>

  );
}

export default App;
