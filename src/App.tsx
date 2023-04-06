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
import { ICategory } from './types/category';
import categoryRequest from './api/httpRequest/category';
import CategoryManager from './pages/admin/CategoryManager';
import AddCategory from './pages/admin/AddCategory';
import UpdateCategory from './pages/admin/UpdateCategory';

function App() {
  const [data, setData] = useState<IProducts[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [reCall, setReCall] = useState(true)
  const navigate = useNavigate()

  const getCate = async (): Promise<void> => {
    const res = await categoryRequest.getAllCategory()
    setCategories(res)
  }

  const fetchAPI = async (): Promise<void> => {
    const dataResponse = await productRequest.getAllProduct()
    setData(dataResponse)
  }

  useEffect(() => {
    fetchAPI()
    getCate()
  }, [reCall])

  const removeItem = async (id: string): Promise<void> => {
    const verifier = confirm("Are you sure you want to delete this product?")
    if (verifier) {
      await productRequest.deleteProduct(id).then(() => {
        alert("Delete product successfully")
        navigate("/admin/products")
        setReCall(prev => !prev)
      }).catch(() => {
        alert("Update category failed")
      })
    }
  }

  const removeCate = async (id: string): Promise<void> => {
    const verifier = confirm("Are you sure you want to delete this category?")
    if (verifier) {
      await categoryRequest.deleteCategory(id).then(() => {
        alert("Delete category successfully")
        navigate("/admin/categories")
        setReCall(prev => !prev)
      }).catch(() => {
        alert("Update category failed")
      })
    }
  }

  const onAdd = async (item: IProducts): Promise<void> => {
    await productRequest.postProduct(item).then(() => {
      alert("Add product successfully")
      setReCall(prev => !prev)
      navigate("/admin/products")
    }).catch(() => {
      alert("Update category failed")
    })
  }

  const onAddCate = async (item: ICategory): Promise<void> => {
    await categoryRequest.postCategory(item).then(() => {
      alert("Add category successfully")
      setReCall(prev => !prev)
      navigate("/admin/categories")
    }).catch(() => {
      alert("Update category failed")
    })
  }
  const onUpdate = async (id: string, item: IProducts): Promise<void> => {
    await productRequest.patchProduct(id, item).then(() => {
      alert("Update product successfully")
      setReCall(prev => !prev)
      navigate("/admin/products")
    }).catch(() => {
      alert("Update category failed")
    })
  }

  const onUpdateCate = async (id: string, item: ICategory): Promise<void> => {
    await categoryRequest.patchCategory(id, item).then(() => {
      alert("Update category successfully")
      setReCall(prev => !prev)
      navigate("/admin/categories")
    }).catch(() => {
      alert("Update category failed")
    })
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
    <div className="App" >
      <Routes>
        <Route path='/register' element={<Register signUp={onHandSignUp} />} />
        <Route path='/login' element={<Login login={onHandLogin} />} />
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path='products'>
            <Route index element={<ProductPage products={data} />} />
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
      </Routes>
    </div>
  )
}

export default App
