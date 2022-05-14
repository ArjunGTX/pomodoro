import { Route, Routes } from "react-router-dom";
import { LandingPage, PageNotFound } from "./pages";
import { paths } from "./util/constant";

function App() {
  return (
    <Routes>
      <Route path={paths.HOME} element={<LandingPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
