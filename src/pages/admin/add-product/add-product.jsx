import React, { useEffect, useState } from 'react';
import imgBackground from '../../../assets/upload_area.png';
import AdminLayout from '../../../components/layout/admin-layout';
import AddressInput from '../../../components/input/address-input';
import PrimaryBtn from '../../../components/button/primary-btn';
import axios from 'axios';
import baseURL from '../../../services/baseURL';
import Toster from '../../../components/toster/toster';

const AddProduct = () => {
  const [previews, setPreviews] = useState([null, null, null, null]);
  const [title, setTitle] = useState("");
  const [orignalPrice, setOrignalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [txt, setTxt] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  }



  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
    }
  };


  const categories = [
    { name: "Vegetables" },
    { name: "Fruits" },
    { name: "Drinks" },
    { name: "Instant" },
    { name: "Dairy" },
    { name: "Bakery" },
    { name: "Grains" },
  ];

const addProductAPI = async () => {
  let token = localStorage.getItem("token");
  setLoading(true)
  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("discountedPrice", discountedPrice);
    formData.append("orignalPrice", orignalPrice);
    formData.append("description", description);
    formData.append("category", category);

    images.forEach((file, index) => {
      formData.append("imgs", file);
    });

    let res = await axios.post(`${baseURL}/product/api/add-product`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // ye zaroori hai
      },
    });

    if (res.data.status === 'success') {
      setShowToast(true)
      setTxt("product Added Successfully");
    }
    console.log("try -----------> ", res);
    
    setLoading(false);

    setPreviews([null, null, null, null]);
setImages([]);
setTitle("");
setDescription("");
setCategory("");
setOrignalPrice(0);
setDiscountedPrice(0);

  } catch (error) {
    console.log(error);
    setShowToast(true)
    setTxt(error.response.data.message)
    setLoading(false);
  }
};

    useEffect(() => {
        document.title = 'SnapBasket - Add Product'
    }, [])


  return (
    <AdminLayout>
      {showToast && <Toster txt={txt} show={showToast} setShow={setShowToast}/>}
      <div className="p-10 w-auto flex flex-wrap flex-col max-md:p-5">
        <h2 className='font-medium text-gray-700'>Product Image</h2>
        <div className="mt-2 flex gap-3 flex-wrap">
          {previews.map((preview, index) => (
            <React.Fragment key={index}>
              <input
                type="file"
                id={`fileUpload${index}`}
                className="hidden"
                accept="image/*"
                onChange={(e) => { handleFileChange(e, index), handleImages(e) }}

              />
           <label
  htmlFor={`fileUpload${index}`}
  className="w-25 h-15 bg-gray-100 flex items-center justify-center cursor-pointer bg-cover bg-center max-sm:w-20 max-sm:h-12"
 style={{
    backgroundImage: `url(${preview || imgBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  }}
>
</label>

            </React.Fragment>

          ))}
        </div>
        <div className='flex flex-col align-start font-medium text-gray-700 mt-5'>
          <label className='mb-2' htmlFor="productName">Product Name</label>
          <AddressInput type="text" id='productName' placeholder='Type Here' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="flex flex-col font-medium text-gray-700 mt-5">
          <label className="mb-2" htmlFor="productDescription">Product Description</label>
          <textarea
            id="productDescription"
            placeholder="Type Here"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              height: "150px",
              resize: "none",
            }}
          ></textarea>
        </div>

        <div className='mt-5'>
          <label className='mb-2 font-medium text-gray-700'>Category</label>
          <select className='block w-full h-10 border-1 border-gray-300 rounded-sm px-3 mt-2' id="categories" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {
              categories.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))
            }
          </select>
        </div>
        <div className='flex gap-5 mt-5 max-sm:flex-col'>
          <div>
            <label className='block mb-2 font-medium text-gray-700'>Product Price</label>
            <AddressInput type="text" value={orignalPrice} onChange={(e) => setOrignalPrice(e.target.value)} id='productName' placeholder='Type Here' />
          </div>
          <div>
            <label className='block mb-2 font-medium text-gray-700'>Offer Price</label>
            <AddressInput value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)} type="text" id='productName' placeholder='Type Here' />
          </div>
        </div>
        <div className='mt-10'>
          <PrimaryBtn loading={loading} className='bg-green-500 rounded-sm cursor-pointer text-white' txt={"Add"} onClick={() => addProductAPI()} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
