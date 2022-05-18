import { Route, Routes } from "react-router-dom";
import { PageWrapper } from "./components";
import {
  LandingPage,
  Login,
  PageNotFound,
  SignUp,
  TodoInfo,
  TodoList,
} from "./pages";
import { paths } from "./util/constant";

function App() {
  return (
    <Routes>
      <Route path={paths.HOME} element={<LandingPage />} />
      <Route path={paths.LOGIN} element={<Login />} />
      <Route path={paths.SIGN_UP} element={<SignUp />} />
      <Route
        path={paths.TODO}
        element={
          <PageWrapper requiresAuth>
            <TodoList />
          </PageWrapper>
        }
      />
      <Route
        path={`${paths.TODO}/:todoId`}
        element={
          <PageWrapper requiresAuth>
            <TodoInfo />
          </PageWrapper>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
