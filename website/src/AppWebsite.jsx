import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import "./styles/App.css";

import PageTransition from "./components/PageTransition.jsx";
import PageLoadingWrapper from "./components/PageLoadingWrapper.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import NotificationSystem from "./components/NotificationSystem.jsx";

// Lazy load components for better performance
const Home = lazy(() => import("./pages/Home.jsx"));
const ShopPage = lazy(() => import("./pages/ShopPage.jsx"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage.jsx"));
const Aboutpage = lazy(() => import("./pages/Aboutpage.jsx"));

function AppWebsite() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return (
      <PageLoadingWrapper
        isLoading={true}
        loadingType="progress"
        minLoadTime={1500}
      >
        <div />
      </PageLoadingWrapper>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <PageLoadingWrapper
              isLoading={true}
              loadingType="spinner"
              loadingVariant="dots"
            >
              <div />
            </PageLoadingWrapper>
          }>
            <Routes>
              <Route
                path="/"
                element={
                  <PageTransition variant="fade" duration={0.6}>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/shop"
                element={<PageTransition variant="fade" duration={0.6}><ShopPage /></PageTransition>}
              />
              <Route
                path="/contactus"
                element={<PageTransition variant="fade" duration={0.6}><ContactUsPage /></PageTransition>}
              />
              <Route
                path="/about"
                element={<PageTransition variant="fade" duration={0.6}><Aboutpage /></PageTransition>}
              />
              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
        <NotificationSystem />
      </Router>
    </ErrorBoundary>
  );
}

export default AppWebsite;
