import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";

const { Route, Routes, Navigate } = require("react-router-dom");

export const useRouter = (isLoggedIn) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? <AuthPage isLogin={true} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/registration"
          element={
            !isLoggedIn ? <AuthPage isLogin={false} /> : <Navigate to="/" />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
        />
      </Routes>
    </>
  );
};
