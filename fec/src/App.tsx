import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProductPage from "./pages/ProductPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import RegisterPage from "./pages/RegisterPage";
import StorePage from "./pages/StorePage";
import UserPage from "./pages/UserPage";
import StoreProvider from "./store/StoreProvider";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="products" element={<StorePage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="refund-policy" element={<RefundPolicyPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
};

export default App;
