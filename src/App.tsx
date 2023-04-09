import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
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
import { ICategory } from './types/category';
import categoryRequest from './api/httpRequest/category';
import CategoryManager from './pages/admin/CategoryManager';
import AddCategory from './pages/admin/AddCategory';
import UpdateCategory from './pages/admin/UpdateCategory';
import { Button, Result, message } from 'antd';

function App() {
  const [data, setData] = useState<IProducts[]>([])
  const [products, setProducts] = useState<IProducts[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [reCall, setReCall] = useState(true)
  const navigate = useNavigate()

  const getProductsByCategory = async (id: string) => {
    if(id) {
      await categoryRequest.getDetailCategory(id, "?_embed").then(({products}: any) => {
        setProducts(products)
      })
    } else {
      setProducts(data)
    }   
  }

  const getCate = async (): Promise<void> => {
    const res = await categoryRequest.getAllCategory()
    setCategories(res)
  }

  const fetchAPI = async (): Promise<void> => {
    const dataResponse = await productRequest.getAllProduct()
    setData(dataResponse)
    setProducts(dataResponse)
  }

  useEffect(() => {
    fetchAPI()
    getCate()
  }, [reCall])

  const removeItem = async (id: string): Promise<void> => {

      await productRequest.deleteProduct(id).then(() => {
        message.success("Delete product successfully")
        navigate("/admin/products")
        setReCall(prev => !prev)
      }).catch(() => {
        message.error("Update category failed")
      })
    
  }

  const removeCate = async (id: string): Promise<void> => {
      await categoryRequest.deleteCategory(id).then(() => {
        message.success("Delete category successfully")
        navigate("/admin/categories")
        setReCall(prev => !prev)
      }).catch(() => {
        message.error("Update category failed")
      })
    
  }

  const onAdd = async (item: IProducts): Promise<void> => {
    await productRequest.postProduct(item).then(() => {
      message.success("Add product successfully")
      setReCall(prev => !prev)
      navigate("/admin/products")
    }).catch(() => {
      message.error("Update category failed")
    })
  }

  const onAddCate = async (item: ICategory): Promise<void> => {
    await categoryRequest.postCategory(item).then(() => {
      message.success("Add category successfully")
      setReCall(prev => !prev)
      navigate("/admin/categories")
    }).catch(() => {
      message.error("Update category failed")
    })
  }
  const onUpdate = async (id: string, item: IProducts): Promise<void> => {
    await productRequest.patchProduct(id, item).then(() => {
      message.success("Update product successfully")
      setReCall(prev => !prev)
      navigate("/admin/products")
    }).catch(() => {
      message.error("Update category failed")
    })
  }

  const onUpdateCate = async (id: string, item: ICategory): Promise<void> => {
    await categoryRequest.patchCategory(id, item).then(() => {
      message.success("Update category successfully")
      setReCall(prev => !prev)
      navigate("/admin/categories")
    }).catch(() => {
      message.error("Update category failed")
    })
  }

  const onHandSignUp = (user: IUserSignUp) => {
    authRequest.signup(user)
      .then(() => {
        navigate("/login")
      })
      .catch(({ response }) => {
        message.error(response.data.message)
      })
  }
  const onHandLogin = (user: IUserLogin) => {
    authRequest.login(user).then((response) => {

      const token = response.accessToken
      localStorage.setItem("token", JSON.stringify(token))

      const userInfo = response.user
      localStorage.setItem("user", JSON.stringify(userInfo))
      message.success('login success')
      navigate("/products")
    })
      .catch(({ response }) => {
        message.error(response.data.message)
      })
  }

  return (
    <div className="App" >
      <Routes>
        <Route path='/register' element={<Register signUp={onHandSignUp} />} />
        <Route path='/login' element={<Login login={onHandLogin} />} />
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path='products'>
            <Route index element={<ProductPage onChangeCate={getProductsByCategory} categories={categories} products={products} />} />
            <Route path=':id' element={<ProductDetailPage products={data} />} />
          </Route>
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path='products'>
            <Route index element={<ProductsManager data={data} onRemove={removeItem} />} />
            <Route path='add' element={<AddProduct categories={categories} onAdd={onAdd} />} />
            <Route path='update/:id' element={<UpdateProduct categories={categories} products={data} onUpdate={onUpdate} />} />
          </Route>
          <Route path='categories'>
            <Route index element={<CategoryManager data={categories} onRemoveCate={removeCate} />} />
            <Route path='add' element={<AddCategory onAddCate={onAddCate} />} />
            <Route path='update/:id' element={<UpdateCategory categories={categories} onUpdate={onUpdateCate} />} />
          </Route>
        </Route>
        <Route  element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary"><Link to={"/"}>Back Home</Link></Button>}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
