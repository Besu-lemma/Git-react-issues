import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IssuesBoxHeader from "./IssuesBoxHeader";
import IssueList from "./IssueList";
import { BarLoader } from "react-spinners";
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
            <BarLoader color="#fff" />
          </div>
        ) : (
          <IssueList />
        )}
      </div>
      <div className="py-8">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={10}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="flex gap-4 h-[30px] text-md text-white justify-center items-center pagination"
          activeClassName="bg-blue-600 hover:border-transparent rounded-md"
          previousLinkClassName={`prev ${
            activePage === 0
              ? "opacity-50 cursor-not-allowed"
              : "text-blue-500 flex px-3 justify-center border border-transparent transition hover:border-white rounded-md"
          }`}
          nextLinkClassName={`next ${
            activePage === totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : "text-blue-500 px-3 flex justify-center border border-transparent transition hover:border-white rounded-md"
          }`}
          pageLinkClassName="page border border-transparent w-full flex justify-center items-center hover:border"
          pageClassName="w-[30px] flex justify-center border border-transparent transition hover:border-white rounded-md"
          forcePage={activePage}
        />
      </div>
    </>
  );
}

export default IssueItems;
