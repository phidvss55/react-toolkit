import "./newProduct.css";
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'
import { addProduct } from '../../redux/apiCall'
import { useDispatch } from 'react-redux';

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleArrData = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(',') }
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!file) {
      alert('file empty')
      return;
    }
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default: 
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.log('error happened', error);
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          // const product = { ...inputs, img: downloadURL, categories: cat };
          const product = { ...inputs, img: downloadURL };
          console.log('product', product)
          addProduct(product, dispatch);
        });
      }
    );
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        {/* Row */}
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        {/* Row */}
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="Apple Airpods" onChange={handleChange} />
        </div>
        {/* Row */}
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="desc" placeholder="Description about Apple Airpods" onChange={handleChange} />
        </div>
        {/* Row */}
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="text" placeholder="123" onChange={handleChange} />
        </div>
        {/* Row */}
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" name="categories" placeholder="jeans, skirts ..." onChange={handleArrData} />
        </div>
        {/* Row */}
        <div className="addProductItem">
          <label>Sizes</label>
          <input type="text" name="size" placeholder="S,M,XL ... " onChange={handleArrData} />
        </div>
        {/* Row */}
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" name="color" placeholder="red, violet, yellow ... " onChange={handleArrData} />
        </div>
        {/* Row */}
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" id="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
