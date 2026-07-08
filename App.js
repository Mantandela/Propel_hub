import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import LoginForm from "./components/SignupAndLogin/LoginPage";
import SignupForm from "./components/SignupAndLogin/SignupPage";


import Navbar from './components/Navbar';
import { OwnerSidebarData } from './components/sidebars/OwnerSidebarData';
import { TenantSidebarData } from './components/sidebars/TenantSidebarData';

import CardMaker from './components/CardMaker';
import TenantView from './components/TenantView';
import TenantCard from './components/TenantCard';

function AppContent() {
  const [cards, setCards] = useState([]);
  const [tenantCards, setTenantCards] = useState([]);
  const [role, setRole] = useState("owner");
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect only when role changes, not on every click
  useEffect(() => {
    if (role === "owner" && !location.pathname.startsWith("/cardmaker") && !location.pathname.startsWith("/tenantview")) {
      navigate("/cardmaker", { replace: true });
    }
    if (role === "tenant" && !location.pathname.startsWith("/tenantview") && !location.pathname.startsWith("/tenantcard")) {
      navigate("/tenantview", { replace: true });
    }
  }, [role, navigate, location]);

  const handleCreate = (newCard) => setCards([...cards, newCard]);

  const handleDelete = (index) => {
    const cardToDelete = cards[index];
    const updatedCards = cards.filter((_, i) => i !== index);
    const updatedTenantCards = tenantCards.filter(
      (card) => card.name !== cardToDelete.name
    );
    setCards(updatedCards);
    setTenantCards(updatedTenantCards);
  };

  const handleAdd = (index) => {
    const cardToAdd = cards[index];
    setTenantCards([...tenantCards, cardToAdd]);
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleRemove = (index) => {
    const cardToRemove = tenantCards[index];
    setTenantCards(tenantCards.filter((_, i) => i !== index));
    setCards([...cards, cardToRemove]);
  };

  return (
    <>
      <Navbar 
        sidebarData={role === "owner" ? OwnerSidebarData : TenantSidebarData} 
        role={role} 
        setRole={setRole} 
      />

      <Routes>

        {/*These are the login and signup page routes*/}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Owner-only routes */}
        {role === "owner" && (
          <>
            <Route path="/cardmaker" element={
              <CardMaker cards={cards} onCreate={handleCreate} onDelete={handleDelete} />
            } />
            <Route path="/tenantview" element={
              <TenantView cards={cards} onAdd={handleAdd} />
            } />
            <Route path="/tenantcard" element={<Navigate to="/cardmaker" />} />
          </>
        )
        }

        {/* Tenant-only routes */}
        {role === "tenant" && (
          <>
            <Route path="/tenantview" element={
              <TenantView cards={cards} onAdd={handleAdd} />
            } />
            <Route path="/tenantcard" element={
              <TenantCard tenantCards={tenantCards} onRemove={handleRemove} />
            } />
            <Route path="/cardmaker" element={<Navigate to="/tenantview" />} />
          </>
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to={role === "owner" ? "/cardmaker" : "/tenantview"} />} />

  
        </Routes>









    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
