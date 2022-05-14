import { Route, Routes } from "react-router-dom";
import { LandingPage, Login, PageNotFound } from "./pages";
import { paths } from "./util/constant";

function App() {
  return (
    <Routes>
      <Route path={paths.HOME} element={<LandingPage />} />
      <Route path={paths.LOGIN} element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
