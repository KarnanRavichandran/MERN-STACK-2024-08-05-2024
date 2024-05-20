import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Button, Modal } from "antd";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisiable] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getAll-category");
      if (data.success) {
        setCategories(data.categorys);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedName,
        }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        // Update the category in the categories array
        const updatedCategories = categories.map((category) => {
          if (category._id === selected._id) {
            return { ...category, name: updatedName };
          }
          return category;
        });
        setCategories(updatedCategories);
        setVisiable(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        setCategories(categories.filter(category => category._id !== pId)); // Remove the deleted category from the state
        setVisiable(false); // Close the modal
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  
  

  return (
    <Layout title={"DashBoard -Create Category"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage Category</h1>
          <div className="p-3 w-50">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-75">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
              {categories?.map((c) => (
  <tr key={c._id}>
    <td>{c.name}</td>
    <td>
      <button
        className="btn btn-primary ms-2"
        onClick={() => {
          setVisiable(true);
          setUpdatedName(c.name);
          setSelected(c);
        }}
      >
        Edit
      </button>
      <button
        className="btn btn-danger ms-2"
        onClick={() => {
          console.log("Deleting category with ID:", c._id); // Verify the ID
          handleDelete(c._id); // Pass the correct ID to handleDelete
        }}
      >
        Delete
      </button>
    </td>
  </tr>
))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisiable(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdateSubmit}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
