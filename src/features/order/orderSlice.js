import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { clearTotalProducts } from "../cart/cartSlice";

const initialState = {
  isLoading: false,
  error: null,
  order: {},
  orders: [],
  productOrder: [],
  totalOrder: 0,
  currentPage: 1,
  totalPage: 1,
  filters: {},
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createOrderSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getOrdersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload.results;
      state.totalPage = action.payload.totalPages;
      state.currentPage = action.payload.page;
      state.totalOrder = action.payload.totalResults;
    },
    updateStatusOrderByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    updateOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    handleChangeFilters(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
    },
    handleClearFilters(state) {
      state.isLoading = false;
      state.error = null;
      state.filters = {};
      state.productOrder = [];
    },
    getProductOrder(state, action) {
      state.productOrder = state.orders.find(
        (order) => order._id === action.payload
      ).products;
      state.productOrder = state.productOrder.map(({ productId, quantity }) => {
        productId = productId[0];
        return { productId, quantity };
      });
    },
    getTotalProducts(state, action) {
      state.totalProduct = action.payload;
    },
  },
});

export const {
  startLoading,
  hasError,
  getOrdersSuccess,
  updateOrderSuccess,
  getTotalProducts,
  createOrderSuccess,
  handleClearFilters,
  handleChangeFilters,
  getProductOrder,
  updateStatusOrderByIdSuccess,
} = slice.actions;

export const getOrderList = (filters) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    filters = { ...filters, ...getState().order.filters };
    const response = await apiService.get("/order/me", { params: filters });

    if (response) {
      dispatch(getOrdersSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const getOrdersDashboard = (filters) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    filters = { ...filters, ...getState().order.filters };
    const response = await apiService.get("/order/admin/all", {
      params: filters,
    });
    console.log("response.data",response.data.data)
    if (response) {
      dispatch(getOrdersSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const createOrder = (order) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.post("/order/me/create", { orderBody:order });
    console.log("response",response.data)
    if (response) {
      dispatch(clearTotalProducts());
      const filters = { page: 1, limit: 5 };
      dispatch(getOrderList(filters));
      // toast.success("Thank you for buy product at Coder eCommerce");
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const updateOrderDashboard = (order, filters) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.put(`/order/admin/update`, { ...order });
    if (response) {
      dispatch(updateOrderSuccess(response.data));
      dispatch(getOrdersDashboard(filters));
      toast.success("update status Order Successfully");
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const updateStatusOrderById =
  ({ orderId, status }, filters) =>
  async (dispatch) => {
    dispatch(startLoading());

    try {
      const response = await apiService.put(`/order/me/update`, {
        orderIds: [orderId],
        status,
      });

      if (response) {
        dispatch(updateStatusOrderByIdSuccess());
        dispatch(getOrderList(filters));
        toast.success("cancel Order Successfully");
      }
    } catch (error) {
      dispatch(hasError(error));
      toast.error(error.message);
    }
  };

export default slice.reducer;
