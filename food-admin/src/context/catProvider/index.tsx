// "use client";
// import axios from "axios";
// import React, {
//   ChangeEvent,
//   PropsWithChildren,
//   createContext,
//   useContext,
//   useState,
// } from "react";
// import { authContext } from "../authProvider";

// interface ICreateCatContext {
//   categories: any;
//   getCategories: () => void;
//   handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
//   handleCategoryForm: (e: ChangeEvent<HTMLInputElement>) => void;
//   uploadImage: () => void;
//   deleteCategory: (catId: string) => void;
// }
// export const catContext = createContext<ICreateCatContext>({
//   getCategories: () => {},
//   handleFile: () => {},
//   handleCategoryForm: () => {},
//   uploadImage: () => {},
//   deleteCategory: (catId: string) => {},
//   categories: [],
// });

// const CatProvider = ({ children }: PropsWithChildren) => {
//   const { token } = useContext(authContext);
//   const [categories, setCategories] = useState<any>([]);
//   let [categoryForm, setCategoryForm] = useState({
//     name: "",
//     description: "",
//     image: "",
//   });
//   const getCategories = async () => {
//     try {
//       const { categories } = await axios
//         .get("http://localhost:8080/categories")
//         .then((res) => res.data);
//       setCategories(categories);
//     } catch (error) {
//       console.log("ERROR IN GETCATEGORIES FUNCTION", error);
//     }
//   };

//   const createCategory = async () => {
//     try {
//     const { data } = await axios
//         .post("http://localhost:8080/categories", {
//           name: categoryForm.name,
//           description: categoryForm.description,
//           image: categoryForm.image,
//         })
    
//         console.log("DATA", data);
//       setCategories([...categories, data.category]);
//     } catch (error) {
//       console.log("ERROR IN CREATECATEGORY FUNCTION", error);
//     }
//   };

//   const [file, setFile] = useState<File | null>(null);
//   const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
//     setFile(e.currentTarget.files![0]);
//   };
//   const handleCategoryForm = (e: ChangeEvent<HTMLInputElement>) => {
//     setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
//   };
//   const uploadImage = async () => {
//     try {
//       const formData = new FormData();
//       formData.set("image", file!);
//       const image = await axios.post("http://localhost:8080/upload", formData);
//       categoryForm.image = image.data.url;
//       createCategory();
//     } catch (error) {
//       console.log("ERROR IN UPLOAD IMAGE FUNCTION", error);
//     }
//   };
//   const deleteCategoryFromArray = (id: string) => {
//     setCategories((oldCategories: any) => {
//       return oldCategories.filter((obj: any) => obj._id !== id);
//     });
//   };
//   const deleteCategory = async (catId: string) => {
//     try {
//       const data = await axios.delete(
//         `http://localhost:8080/categories/${catId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       deleteCategoryFromArray(catId);
//     } catch (error) {}
//   };
//   return (
//     <catContext.Provider
//       value={{
//         categories,
//         getCategories,
//         handleFile,
//         uploadImage,
//         handleCategoryForm,
//         deleteCategory,
//       }}
//     >
//       {children}
//     </catContext.Provider>
//   );
// };
// export default CatProvider;
"use client";
import axios from "axios";
import React, {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { authContext } from "../authProvider";

interface ICreateCatContext {
  categories: any;
  isLoading: boolean;
  getCategories: () => void;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCategoryForm: (e: ChangeEvent<HTMLInputElement>) => void;
  uploadImage: () => void;
  deleteCategory: (catId: string) => void;
}
export const catContext = createContext<ICreateCatContext>({
  getCategories: () => {},
  handleFile: () => {},
  handleCategoryForm: () => {},
  uploadImage: () => {},
  deleteCategory: (catId: string) => {},
  categories: [],
  isLoading: false,
});

const CatProvider = ({ children }: PropsWithChildren) => {
  const { token } = useContext(authContext);
  const [categories, setCategories] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  let [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: "",
  });

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const { categories } = await axios
        .get("http://localhost:8080/categories")
        .then((res) => res.data);
      setCategories(categories);
      console.log("GET CATEGORIES SUCCESS", categories);
    } catch (error) {
      console.log("ERROR IN GETCATEGORIES FUNCTION", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/categories", {
        name: categoryForm.name,
        description: categoryForm.description,
        image: categoryForm.image,
      });
      console.log("create data", data);
      setCategories([...categories, data.category]);
    } catch (error) {
      console.log("ERROR IN CREATECATEGORY FUNCTION");
    }
  };

  const [file, setFile] = useState<File | null>(null);
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files![0]);
  };
  const handleCategoryForm = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.set("image", file!);
      const { data } = await axios
        .post("http://localhost:8080/upload", formData);
      console.log("IMAGE URL", data);
      categoryForm.image = data.image_url;
      createCategory();
    } catch (error) {
      console.log("ERROR IN UPLOAD IMAGE FUNCTION", error);
    }
  };


  const deleteCategoryFromArray = (id: string) => {
    setCategories((oldCategories: any) => {
      return oldCategories.filter((obj: any) => obj._id !== id);
    });
  };
  
  const deleteCategory = async (catId: string) => {
    try {
      const data = await axios.delete(
        `http://localhost:8080/categories/${catId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      deleteCategoryFromArray(catId);
    } catch (error) {}
  };
  return (
    <catContext.Provider
      value={{
        categories,
        getCategories,
        handleFile,
        uploadImage,
        handleCategoryForm,
        deleteCategory,
        isLoading,
      }}
    >
      {children}
    </catContext.Provider>
  );
};
export default CatProvider;
