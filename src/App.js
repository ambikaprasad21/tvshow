import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowList from "./ShowList";
import ShowDetails from "./ShowDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
