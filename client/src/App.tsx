import "./App.css";
import Header from "./components/Common/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import ListBook from "./Pages/Book/List";
import ListAuthor from "./Pages/Author/List";
import CreateBook from "./Pages/Book/Create";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/books" element={<ListBook />} />
        <Route path="/book/create" element={<CreateBook />} />
        <Route path="/authors" element={<ListAuthor />} />
      </Routes>
    </div>
  );
}

export default App;
