import './App.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Create from './pages/Create/Create';
import BlogDetails from './pages/home/BlogDetails';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Layout from './components/hooks/Layout';
import RequireAuth from './components/context/RequireAuth';
import PersistLogin from './components/context/PersistLogin';

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
