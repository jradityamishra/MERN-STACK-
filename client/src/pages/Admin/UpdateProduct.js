import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../../component/layout/Layout.js'
import AdminMenu from '../../component/layout/AdminMenu.js'
import { Select } from 'antd'
import { useNavigate,useParams } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const { Option } = Select

const UpdateProduct = () => {
  const navigate=useNavigate();
  const params=useParams();
  const [auth] = useAuth();
  const [categories,setCategories] = useState([])
  const[category,SetCategory]=useState("")
  const [photo, setPhoto] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [description, setDescription] = useState("")
  const [shipping, setShipping] = useState("")
  const [id,setId]=useState("")
//GET SINGLE PRODUCT 
const getSingleProduct=async()=>{
    try{
        const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`)
        setName(data.product.name)
        setDescription(data.product.description)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setName(data.product.name)
        setId(data.product._id);
        SetCategory(data.product.category._id)
        setShipping(data.product.shipping)
        console.log(data)
       
      }catch(error){
        console.log(error)
    toast.error("error in getting single products")}
}
useEffect(()=>{
  getSingleProduct()
   //eslint-disable-next-line
},[])
  //UPDATE PRODUCT
    
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        photo && productData.append("photo", photo);
        productData.append("category", category);
        const { data } = axios.put(
          `/api/v1/product/update-product/${id}`,
          productData,
          {headers:{Authorization:auth.token}}
          
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Product Updated Successfully");
          navigate("/dashboard/admin/products");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };

    //DELETE PRODUCT
    const handleDelete=async()=>{
      try{
        let answer=window.prompt("are you sure to delete this product")
        if(!answer) return;
        const {data}=await axios.delete(`/api/v1/product/product-delete/${id}`)
        navigate("/dashboard/admin/products");

      }catch(error){
        console.log(error)
        toast.error("error in deleting product")}
    }
  //Get ALL CATEGORY
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category");
      if (data?.success) {
        //console.log(categories)
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  useEffect(()=>{
    getAllCategory()
    console.log(categories)
  },[])

  return (
    <Layout title={'DashBoard-UpdateProduct'}>
      <div class='container m-5 p-5'>
        <div class='grid grid-cols-6 gap-4'>
          <div class='col-start-1 col-end-3'>
            <AdminMenu />
          </div>
          <div class='col-span-3'>
            <h1>UpdateProduct</h1>
            <div className="m-1 w-11/12">
              <Select
                bordered={false}
                placeholder="select the category"
                size='large'
                showSearch
                className='form-select mb-3'
                onChange={(value) => SetCategory(value)} 
                value={category}>
                
               {categories?.map((c) => 
             {
              return (
                  <>
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                  </>
                )
             })}
              </Select>
              <div className="mb-3">
                <label className='w-full px-4 py-2 bg-cyan-600 rounded text-white cursor-pointer'>
                  {photo ? photo.name : "Upload Photo"}
                  <input type="file"
                    name='photo'
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className='flex justify-center'>
                    <img src={URL.createObjectURL(photo)} className='w-3/4 rounded' alt='product-photo' height={'200px'} />
                  </div>

                ):(
                  <div className='flex justify-center'>
                    <img src={`/api/v1/product/get-photo/${id}`} className='w-3/4 rounded' alt='product-photo' height={'200px'} />
                  </div> 
                )}
              </div>
              <div className="mb-3 flex flex-col justify-center">
                <input type="text"
                  value={name}
                  placeholder='write your name'
                  className=' w-full p-3 m-2'
                  onChange={(e) => setName(e.target.value)}
                />
                <input type="text"
                  value={description}
                  placeholder='write description'
                  className=' w-full p-3 m-2'
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input type="number"
                  value={price}
                  placeholder='write a price'
                  className=' w-full p-3 m-2'
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input type="number"
                  value={quantity}
                  placeholder='write a quantity'
                  className=' w-full p-3 m-2'
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Select
                  bordered={false}
                  placeholder="select the category"
                  size='large'
                  showSearch

                  className='mb-3 select'
                  onChange={(value) => { setShipping(value) }}
                 value={shipping ? 'yes':'no'}
                  >

                  <Option value="0" >
                    No
                  </Option>
                  <Option value="1" >
                    Yes
                  </Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className='px-6 py-3 bg-cyan-600' onClick={handleUpdate}>UPDATE PRODUCT</button>
              </div>
              <div className="mb-3">
                <button className='px-6 py-3 bg-cyan-600' onClick={handleDelete}>DELETE PRODUCT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct