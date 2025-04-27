import { useMemo, useReducer } from "react";
import { Route, Routes } from "react-router";
import AppContext, { appReducer, initialState } from "./AppContext";
import Layout from "./layouts";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProductPage from "./pages/ProductPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="refund-policy" element={<RefundPolicyPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
