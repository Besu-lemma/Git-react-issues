import React from "react";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import SearchBar from "./component/SearchBar/SearchBar";
import IssueItems from "./component/IssuesPage/IssueItems";

function App() {
  return (
    <div className="h-[100%]">
      <Provider store={Store}>
        <div className="App sm:container bg-slate-200 mx-auto px-3 md:px-8 pt-4">
          <SearchBar />
          <IssueItems />
        </div>
      </Provider>
    </div>
  );
}

export default App;
