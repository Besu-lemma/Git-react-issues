import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IssuesBoxHeader from "./IssuesBoxHeader";
import IssueList from "./IssueList";
import { CircleLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { fetchIssues, setCurrentPage } from "../../redux/githubSlice";

function IssueItems() {
  const { loading, totalPages, currentPage, search } = useSelector(
    (state) => state.github
  );
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(currentPage - 1);

  const handlePageChange = ({ selected }) => {
    dispatch(fetchIssues({ page: selected + 1, search }));
    setActivePage(selected);
  };

  useEffect(() => {
    if (currentPage <= 1) {
      setActivePage(0);
      handlePageChange({ selected: 0 });
    }
  }, [currentPage]);

  return (
    <>
      <div className="rounded-md border border-slate-700 mt-6">
        <IssuesBoxHeader />
        {loading ? (
          <div className="h-[58vh] flex justify-center items-center">
            <CircleLoader color="#fc466b" size={85} />
          </div>
        ) : (
          <IssueList />
        )}
      </div>
      <div className="py-8">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="flex flex-wrap justify-center items-center gap-2"
          activeClassName="bg-blue-600 hover:border-transparent rounded-md"
          previousLinkClassName={`prev ${
            activePage === 0
              ? "opacity-50 cursor-not-allowed"
              : "text-blue-500 px-3 py-1 border border-transparent transition hover:border-white rounded-md"
          }`}
          nextLinkClassName={`next ${
            activePage === totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : "text-blue-500 px-3 py-1 border border-transparent transition hover:border-white rounded-md"
          }`}
          pageLinkClassName="page border border-transparent px-3 py-1 flex justify-center items-center transition hover:border-white rounded-md text-white"
          breakLinkClassName="px-3 py-1 text-white"
          forcePage={activePage}
        />
      </div>
    </>
  );
}

export default IssueItems;
