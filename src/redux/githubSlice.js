import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/**
 * @typedef {Object} User
 * @property {string} login
 * @property {string} avatar_url
 * @property {number} id
 */

/**
 * @typedef {Object} IssueLabels
 * @property {number} id
 * @property {string} name
 * @property {string} color
 */

/**
 * @typedef {Object} ErrorState
 * @property {boolean} status
 * @property {string|null} message
 */

/**
 * @typedef {Object} Issue
 * @property {number} id
 * @property {User} user
 * @property {string} state
 * @property {number} number
 * @property {number} comments
 * @property {string} title
 * @property {string} html_url
 * @property {Date} created_at
 * @property {IssueLabels[]} labels
 */

/**
 * @typedef {Object} GitHubState
 * @property {Issue[]} issues
 * @property {boolean} loading
 * @property {number} totalPages
 * @property {number} currentPage
 * @property {string} search
 * @property {ErrorState} error
 */
// githubSlice.js

const GITHUB_API_URL = "https://api.github.com";
const PERSONAL_ACCESS_TOKEN =
  "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";

const initialState = {
  issues: [],
  loading: true,
  totalPages: 0,
  currentPage: 1,
  error: { status: false, message: null },
  search: "facebook/react+is:issue+is:open",
};

export const fetchIssues = createAsyncThunk(
  "github/fetchIssues",
  async ({ page, search }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${GITHUB_API_URL}/search/issues?q=${search}&page=${page}&per_page=10`,
        {
          headers: {
            Authorization: `token ${PERSONAL_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      const data = responseData.items;
      const totalPages =
        responseData.total_count < 1000
          ? Math.ceil(responseData.total_count / 10)
          : Math.ceil(1000 / 10);

      return { issues: data, totalPages, currentPage: page, search };
    } catch (error) {
      console.error("Error fetching GitHub issues:", error);
      return rejectWithValue({
        status: true,
        message: error instanceof Error ? error.message : "Unknown Error",
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
