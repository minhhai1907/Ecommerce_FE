import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  // subCategories: [],
  // subCategoriesById:{}
};

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getMainCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
     
    },
    getAllCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
    },
    // getSubCategoriesSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.subCategories =[...state.subCategories, action.payload.id];
    //   state.subCategoriesById=state.subCategories.map(cate=>
    //     state.subCategoriesById[cate]=action.payload.data
    //   )
    // },
  },
});


export const getAllCategories = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/category/all`);

    dispatch(slice.actions.getAllCategoriesSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};
export const getMainCategories = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/category/main`);
    console.log("categories",response.data)
    dispatch(slice.actions.getMainCategoriesSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};
// export const getSubCategories = (id) => async (dispatch) => {
//   dispatch(slice.actions.startLoading());
//   try {
//     const response = await apiService.get(`/category/sub/${id}`);
//     const data=response.data.data
//     dispatch(slice.actions.getSubCategoriesSuccess({id,data}));
//   } catch (error) {
//     dispatch(slice.actions.hasError(error));
//     toast.error(error.message);
//   }
// };

export default slice.reducer;
