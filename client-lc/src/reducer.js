//LOCAL STORAGE
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");
//
//GLOBAL STATE
export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
  sortJobsOptions: ["latest", "oldest", "a-z", "z-a"],
  sortJobs: "latest",
  jobs: [],
  totalJobs: 0,
  numberOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "DISPLAY__ALERT":
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all Values!",
      };
    case "CLEAR__ALERT":
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    case "TOGGLE__SIDEBAR":
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case "REGISTER_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "User Created! Redirecting...",
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case "LOGIN_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "Login Successfull! Redirecting...",
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case "LOGOUT_USER":
      return {
        ...initialState,
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
      };
    case "UPDATE_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "Updated",
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case "HANDLE_CHANGE":
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };
    case "CLEAR_VALUES":
      return {
        ...state,
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobType: "full-time",
        status: "pending",
        jobLocation: state.userLocation,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sortJobs: "latest",
      };
    case "CREATE_JOB":
      return {
        ...state,
        isLoading: true,
      };
    case "CREATE_JOB_SUCCESS":
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "New Job Created",
      };
    case "CREATE_JOB_ERROR":
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case "GET_JOBS":
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case "GET_JOBS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numberOfPages: action.payload.numberOfPages,
      };
    case "SET_EDIT_JOB":
      const job = state.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
    case "DELETE_JOB":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_JOB":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_JOB_SUCCESS":
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Updated",
      };
    case "UPDATE_JOB_ERROR":
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case "SHOW_STATS":
      return {
        ...state,
        isLoading: true,
      };
    case "SHOW_STATS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      };
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.payload.page,
      };
    default:
      return state;
  }
};

export default reducer;
