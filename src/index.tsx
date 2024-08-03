import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AuthGuard from "./middleware/AuthGuard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={Store}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Login />
            </AuthGuard>
          }
        />
        <Route
          path="/register"
          element={
            <AuthGuard>
              <Register />
            </AuthGuard>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <App />
            </AuthGuard>
          }
        />
        <Route path="*" element={<>Page not Found</>} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
