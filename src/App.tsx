import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import productRequest from './api/httpRequest/products';
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from './layouts/ClientLayout';
import AddProduct from './pages/admin/AddProduct';
import DashBoard from './pages/admin/DashBoard';
import ProductsManager from './pages/admin/ProductsManager';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductsPage';
import { IProducts } from './types/products';
import UpdateProduct from './pages/admin/UpdateProduct';
import { IUserLogin, IUserSignUp } from './types/user';
import authRequest from './api/httpRequest/auth';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [data, setData] = useState<IProducts[]>([])
  const navigate = useNavigate()

  const fetchAPI = async (): Promise<void> => {
    const dataResponse = await productRequest.getAllProduct()
    console.log(1);
    setData(dataResponse)
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  const removeItem = async (id: string): Promise<void> => {
    await productRequest.deleteProduct(id)
    navigate("/admin/products")
    fetchAPI()
  }

  const onAdd = async (item: IProducts): Promise<void> => {
    await productRequest.postProduct(item)
    fetchAPI()
  }

  const onUpdate = async (id: string, item: IProducts): Promise<void> => {
    await productRequest.patchProduct(id, item)
    fetchAPI()
  }

  const onHandSignUp = (user: IUserSignUp) => {
    authRequest.signup(user)
      .then(() => {
        navigate("/login")
      })
      .catch(({ response }) => {
        alert(response.data.message)
      })
  }
  const onHandLogin = (user: IUserLogin) => {
    authRequest.login(user).then((response) => {

      const token = response.accessToken
      localStorage.setItem("token", JSON.stringify(token))

      const userInfo = response.user
      localStorage.setItem("user", JSON.stringify(userInfo))
      alert('login success')
      navigate("/products")
    })
      .catch(({ response }) => {
        alert(response.data.message)
      })
  }

  return (
    <div className="App" style={{ height: "100%" }}>
      <Routes>
        <Route path='/register' element={<Register signUp={onHandSignUp} />} />
        <Route path='/login' element={<Login login={onHandLogin} />} />
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path='products'>
            <Route index element={<ProductPage products={data} onRemove={removeItem} />} />
            <Route path=':id' element={<ProductDetailPage products={data} />} />
          </Route>
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path='products'>
            <Route index element={<ProductsManager data={data} onRemove={removeItem} />} />
            <Route path='add' element={<AddProduct onAdd={onAdd} />} />
            <Route path='update/:id' element={<UpdateProduct products={data} onUpdate={onUpdate} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
