import { yupResolver } from "@hookform/resolvers/yup";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button, Grid, Stack, styled, Tab, Tabs, Typography } from "@mui/material";
import { capitalCase } from "change-case";
import { concat } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import * as yup from "yup";
import { FormProvider, FSelect, FTextField } from "../../components/form";
import LoadingScreen from "../../components/LoadingScreen";
import { getAllCategories } from "../../features/category/categorySlice";
import {
  createProductDashboard,
  getProductDashboard,
  updateProductDashboard,
} from "../../features/dashboard/dashboardSlice";
import ProductForm from "../../features/dashboard/Product/ProductForm";
import ProductUpLoadImg from "../../features/dashboard/Product/ProductUploadImg";
// import { TitleStyle } from "../../theme/customizations/TitleStyle";

const schema = yup.object({
  sku: yup.string().required(),
  title: yup.string().required(),
  status: yup.string().required(),
  price: yup.number().required(),
  discount: yup.number().required(),
  quantity: yup.number().required(),
  descriptions: yup.string().required(),
  categoryId: yup.string().required(),
  isDeleted: yup.boolean(),
  imageUrls: null,
  imageFile: null,
});
const STATUS = ["sale", "new", "comming soon"];
const HIDDEN = [
  { value: false, label: "show" },
  { value: true, label: "hide" },
];

const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };
  
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

const ProductImgStyle = styled("img")(({ theme }) => ({
  width: "50%",
  maxWidth: "200px",
  height: "auto",
  transform: "translate(-50%,-50%) scale(1)",
  top: "50%",
  left: "50%",
  position: "absolute",
  transition: theme.transitions.create(["transform", "hover"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    transform: "translate(-50%,-50%) scale(1.05)",
  },
}));


// const PROFILE_TABS = [
//   {
//     value: "Product",
//     icon: <AddBoxIcon sx={{ fontSize: 24 }} />,
//   },
//   {
//     value: "Images",
//     icon: <CameraAltIcon sx={{ fontSize: 24 }} />,
//   },
// ];

function CreateProductPage() {
  // const isAdd = location?.pathname.includes("add");
  // const isClone = location?.pathname.includes("clone");

//   const [currentTab, setCurrentTab] = useState("Product");

  const dispatch = useDispatch();
//   const  {product,isLoading} = useSelector((state) => state.dashboard);
//   console.log("product",product)
  const { categories } = useSelector((state) => state.category);
  console.log("categories",categories)

//   const handleChangeTab = (newValue) => {
//     setCurrentTab(newValue);
//   };

  const defaultValues = {
    sku: "",
    title:  "",
    status:"new",
    price:  0,
    discount:  0,
    quantity: 0,
    descriptions:  "",
    categoryId: categories[0],
    isDeleted:false,
    imageUrls:[],
    imageFile: [],
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors,isSubmitting },
  } = methods;

  const editorContent = watch("descriptions");

  const onEditorStateChange = (editorState) => {
    setValue("descriptions", editorState);
  };

//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       let values = getValues("imageFile");
//       const newImageUrl = acceptedFiles.map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       );

//       values = concat(values, newImageUrl);
//       setValue("imageFile", values);
//     },
//     [setValue, getValues]
//   );

  const handleRemoveAll = () => {
    setValue("imageFile", []);
    setValue("imageUrls", []);
  };

  const handleRemove = (file) => {
    let imageFile = getValues("imageFile");
    let imageUrls = getValues("imageUrls");

    imageFile = imageFile.filter((_file) => _file !== file);

    imageUrls = imageUrls.filter((_file) => _file !== file);

    setValue("imageFile", imageFile);
    setValue("imageUrls", imageUrls);
  };

  const onSubmit = (data) => {
    console.log("data",data)
    dispatch(createProductDashboard(data));
  };

  useEffect(() => {
   
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    reset(defaultValues);
  }, [ reset]);

  useEffect(() => {
    register("descriptions", { required: true });
  }, [register]);

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2 }}
        >
          {/* <TitleStyle> */}
            <CategoryIcon sx={{ width: "35px", height: "35px" }} />
            <Typography variant="h6" textAlign="left" sx={{ pl: 1 }}>
              Product
            </Typography>
          {/* </TitleStyle> */}

          <Box>
            <Button type="submit" variant="outlined" color="primary">
              Save
            </Button>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "flex",
            width: 1,
            minHeight: "100vh",
            backgroundColor: "white",
          }}
        >
          <Stack flexGrow="1">
            {/* <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                allowScrollButtonsMobile
                onChange={(e, value) => handleChangeTab(value)}
              >
                {PROFILE_TABS.map((tab) => (
                  <Tab
                    key={tab.value}
                    value={tab.value}
                    icon={tab.icon}
                    iconPosition="end"
                    label={capitalCase(tab.value)}
                  />
                ))}
              </Tabs>
            </Box> */}
            {/* {isLoading ? (
              <LoadingScreen />
            ) : ( */}
              <Box sx={{ px: 0.5, py: 2 }}>
                {/* {currentTab === "Product" && ( */}
            
                  <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    {/* <Box sx={{ position: "relative", minHeight: "300px" }}>
                      {product?.imageUrls?.[0] && (
                        <ProductImgStyle
                          alt={product?.title}
                          src={product?.imageUrls?.[0]}
                        />
                      )}
                    </Box> */}
                  </Grid>
            
                  <Grid item xs={12} md={8} sx={{ height: "100%" }}>
                    <Stack direction="column" sapcing={4}>
                      <Stack direction="row" spacing={3} sx={{ p: 3 }}>
                        <FTextField name="sku"  label="SKU" />
                      </Stack>
                      <Stack direction="row" sx={{ p: 3 }}>
                        <FTextField name="title" label="TITLE" />
                      </Stack>
                      <Stack direction="row" spacing={2} sx={{ p: 3 }}>
                        <FTextField name="price" label="PRICE" type="number" />
                        <FTextField name="discount" label="DISCOUNT" type="number" />
                        <FTextField name="quantity" label="QUANTITY" type="number" />
                      </Stack>
                      <Stack direction="row" spacing={2} sx={{ p: 3 }}>
                        <FSelect name="categoryId" label="CATEGORIES">
                          {categories?.map((option) => (
                            <option key={option._id} value={option._id} >
                              {option.title}
                            </option>
                          ))}
                        </FSelect>
                        <FSelect name="isDeleted" >
                          {HIDDEN?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </FSelect>
                        <FSelect name="status" label="STATUS">
                          {STATUS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </FSelect>
                      </Stack>
                      <Stack direction="row" spacing={2} sx={{ p: 3 }}>
                        <ReactQuill
                          theme="snow"
                          value={editorContent}
                          onChange={onEditorStateChange}
                          modules={modules}
                          formats={formats}
                          bounds={"#root"}
                        />
                      </Stack>
                      <p>{errors.descriptions && "Enter valid content"}</p>
                    </Stack>
                  </Grid>
                </Grid>   



                
{/*             
                  <ProductUpLoadImg
                    // handleDrop={handleDrop}
                    handleRemoveAll={handleRemoveAll}
                    handleRemove={handleRemove}
                  /> */}
                
              </Box>
            
          </Stack>
        </Box>
      </FormProvider>
    </Box>
  );
}

export default CreateProductPage;
