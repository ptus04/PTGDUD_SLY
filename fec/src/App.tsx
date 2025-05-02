import { Route, Routes } from "react-router";
import StoreProvider from "./store/StoreProvider";
import Layout from "./layouts/Layout";
import AboutUsPage from "./pages/AboutUsPage";
import AccountPage from "./pages/AccountPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import RegisterPage from "./pages/RegisterPage";
import useDocumentTitle from "./hooks/useDocumentTitle";

const App = () => {
  useDocumentTitle();

  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="refund-policy" element={<RefundPolicyPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </StoreProvider>
  );
};

export default App;
