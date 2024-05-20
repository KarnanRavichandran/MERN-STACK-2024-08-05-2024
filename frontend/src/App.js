import './App.css';
import Layout from './components/Layout/Layout';
import { Route,Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PagenotFound from './pages/PagenotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import DashBoard from './pages/user/DashBoard';
import PrivateRoute from './components/Route/PrivateRoute';
import ForgotPasssword from './pages/Auth/ForgotPasssword';
import AdminDashBoard from './pages/Admin/AdminDashBoard';
import AdminRoute from './components/Route/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Order';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrder from './pages/Admin/AdminOrder';


function App(props) {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/product/:slug' element={<ProductDetails/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/category/:slug' element={<CategoryProduct/>} />
      <Route path='/cart' element={<CartPage/>} />

      <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<DashBoard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />

        </Route>

      <Route path='/dashboard' element={<AdminRoute />}>
      <Route path='admin' element={<AdminDashBoard/> } />
      <Route path='create-category' element={<CreateCategory />} />
      <Route path='create-product' element={<CreateProduct />} />
      <Route path='admin/product/:slug' element={<UpdateProduct />} />
      <Route path='admin/products' element={<Products />} />
      <Route path='admin-users' element={<Users />} />
      <Route path='admin/orders' element={<AdminOrder />} />

      </Route>

      <Route path='/about' element={<About/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgot-password' element={<ForgotPasssword/>} />

      <Route path='/contact' element={<Contact/>} />
      <Route path='/privacy' element={<Policy/>} />
      <Route path='/*' element={<PagenotFound/>} />
    </Routes>
    </>
  );
}

export default App;
