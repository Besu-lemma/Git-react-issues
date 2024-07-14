import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const initialState = {
  issues: [],
  loading: true,
  totalPages: 1,
  currentPage: 1,
  error: { status: false, message: null },
  search: "is:issue is:open",
};

export const fetchIssues = createAsyncThunk(
  "github/fetchIssues",
  async ({ page, search }, { rejectWithValue }) => {
    try {
      console.log(`Fetching issues for page: ${page}`);
      const response = await octokit.request("GET /search/issues", {
        q: search,
        page: page,
        per_page: 10,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      const totalPages = Math.ceil(response.data.total_count / 10);

      return {
        issues: response.data.items,
        totalPages,
        currentPage: page,
        search,
      };
    } catch (error) {
      console.error("Error fetching issues:", error);
      return rejectWithValue({
        status: true,
        message: error.message || "Unknown Error",
      });
    }
  }
);

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
        state.error = { status: false, message: null };
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload.issues;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.search = action.payload.search;
        state.error = { status: false, message: null };
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentPage = 1;
        state.totalPages = 0;
        state.issues = [];
      });
  },
});

export const { setSearch } = githubSlice.actions;

export default githubSlice.reducer;
