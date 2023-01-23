import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  reports: {},
  products: [],
  product: {},
  totalPageProduct: 1,
  totalProduct: 0,
  filters: {},
};

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getReportsDashboardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.reports = action.payload;
    },
    getProductDashBoardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.product = action.payload;
   
    },
    getProductsDashboardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalProduct = action.payload.totalResults;
      state.products = action.payload.results;

      state.totalPageProduct = action.payload.totalPages;
    },
    getOrdersDashboardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload.results;
      state.totalPage = action.payload.totalPages;
    },
    createProductDashBoardSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    updateProductDashBoardSuccess(state,action) {
      state.isLoading = false;
      state.error = null;
      state.product=action.payload
    },
    deleteProductDashboardSuccess(state){
      state.isLoading = false;
      state.error = null;
    },
    handleChangeDashBoardFilters(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
    },
    handleClearDashBoardFilters(state) {
      state.isLoading = false;
      state.error = null;
      state.filters = {};
    },
  },
});

export const {
  startLoading,
  handleChangeFilters,
  handleClearFilters,
  getProductsDashboardSuccess,
  getOrdersDashboardSuccess,
  getReportsDashboardSuccess,
  getProductDashBoardSuccess,
  createProductDashBoardSuccess,
  updateProductDashBoardSuccess,
  deleteProductDashboardSuccess,
  handleClearDashBoardFilters,
  handleChangeDashBoardFilters,
  hasError,
} = slice.actions;
 
export const getAllProductsDashboard =
  (filters) => async (dispatch,getState) => {
    dispatch(startLoading());
    try {
      filters = {
        // sortBy: "updatedAt.desc",
        ...filters,
        ...getState().dashboard.filters,
      };
      const response = await apiService.get("/products/admin/all", {
        params: filters,
      });
      dispatch(getProductsDashboardSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
      toast.error(error.message);
    }
  };

export const getOrdersDashboard = (filters) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get("/order/admin/all", {
      params: filters,
    });
    console.log("response",response.data)
    if (response) {
      dispatch(getOrdersDashboardSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const getReportsDashboard = (filters) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const params=filters
    const response = await apiService.get("/dashboard", {params });
      
    dispatch(getReportsDashboardSuccess(response.data.data));
   
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const getProductDashboard = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get(`/products/${id}`);
    if (response) {
      dispatch(getProductDashBoardSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const createProductDashboard = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    let imageUrl = [];
    await Promise.all(
      data.imageFile.map(async (file) => {
        let result = await cloudinaryUpload(file);
        imageUrl.push(result);
      })
    );
    data.imageUrls = [...data.imageUrls, ...imageUrl];

    const response = await apiService.post(`/products/admin/create`, { ...data });
    if (response) {
      dispatch(createProductDashBoardSuccess(response.data));
      toast.success("Create product Successfully");
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const updateProductDashboard = (id, data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    let imageUrl = [];
    await Promise.all(
      data.imageFile.map(async (file) => {
        let result = await cloudinaryUpload(file);
        imageUrl.push(result);
      })
    );
    data.imageUrls = [...data.imageUrls, ...imageUrl];

    const response = await apiService.put(`products/admin/update/${id}`, {
      ...data,
    });

    if (response) {
      dispatch(updateProductDashBoardSuccess(response.data.data));
      dispatch(getProductDashboard(id))
      toast.success("Update product Successfully");
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};
export const deleteProductDashboard=(id)=>async(dispatch)=>{
  dispatch(startLoading())
  try {
    await apiService.delete(`/products/admin/delete/${id}`)
    dispatch(deleteProductDashboardSuccess())
    dispatch(getAllProductsDashboard())
  } catch (error) {
    dispatch(hasError(error))
  }
}

export default slice.reducer;
