/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import HomeScreen from './pages/HomeScreen';
import SelectLocationScreen from './pages/SelectLocationScreen';
import DoctorSearchScreen from './pages/DoctorSearchScreen';
import DoctorProfileScreen from './pages/DoctorProfileScreen';
import AppointmentScreen from './pages/AppointmentScreen';
import PatientProfileScreen from './pages/PatientProfileScreen';
import CategoriesScreen from './pages/CategoriesScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/select-location" element={<SelectLocationScreen />} />
          <Route path="/categories" element={<CategoriesScreen />} />
          <Route path="/search" element={<DoctorSearchScreen />} />
          <Route path="/doctor/:id" element={<DoctorProfileScreen />} />
          <Route path="/appointments" element={<AppointmentScreen />} />
          <Route path="/profile" element={<PatientProfileScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

