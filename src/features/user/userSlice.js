import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  selectedUser: null,
  users: [],
  totalPage: 0,
  totalUsers: 0,
  currentPage: 1,
  filters: {},
  currentUser:{}
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload;
    },
    deactiveUserSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    updateUserSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getCurrentUserProfileSuccess(state,action) {
      state.isLoading = false;
      state.error = null;
      state.currentUser=action.payload
    },
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalUsers = action.payload.count;
      state.users = action.payload.users
      state.currentPage = action.payload.page;
    },
    handleChangeUserFilters(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
    },
    handleClearUserFilters(state) {
      state.isLoading = false;
      state.error = null;
      state.filters = {};
    },
  },
});

export default slice.reducer;
export const {
  startLoading,
  hasError,
  getCurrentUserProfileSuccess,
  updateUserProfileSuccess,
  getUserSuccess,
  getUserListSuccess,
  deactiveUserSuccess,
  updateUserSuccess,
  handleChangeUserFilters,
  handleClearUserFilters,
} = slice.actions;

export const updateUserProfile =
  ({
    userId,
    name,
    email,
    password,
    phone,
    address,
    avatarUrl,
    role,
    creditCards,
  }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const data = {
        name,
        email,
        password,
        phone,
        address,
        avatarUrl,
        role,
        creditCards,
      };
      if (!password) delete data.password;
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/user/me`, { ...data });
      dispatch(updateUserProfileSuccess(response.data.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(hasError(error.message));
      toast.error(error.message);
    }
  };

export const getUser = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get(`/user/${id}`);
    dispatch(getUserSuccess(response.data));
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get("/user/me");
    dispatch(getCurrentUserProfileSuccess(response.data.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const getUserList = (filters) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const params=filters
    const response = await apiService.get(`/user`,{params} );
    dispatch(getUserListSuccess(response.data.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const deactiveUser = (id, filters) => async (dispatch) => {
  
  dispatch(startLoading());
  try {
    const repsonse = await apiService.delete(`/user/${id}`);
    if (repsonse) {
      dispatch(deactiveUserSuccess());
      dispatch(getUserList(filters));
    }
    toast.success("You are deactive user sucessfully!");
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const updateUser = (id, updateContent, filters) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const repsonse = await apiService.put(`/user/${id}`, {
      ...updateContent,
    });
    if (repsonse) {
      dispatch(updateUserSuccess());

      dispatch(getUserList(filters));

      toast.success("You are updated user sucessfully!");
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};
