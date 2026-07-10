import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/SignupAndLogin/LoginPage";
import SignupPage from "./components/SignupAndLogin/SignupPage";
import CardMaker from "./components/CardMaker";
import TenantView from "./components/TenantView";
import TenantCard from "./components/TenantCard";
import { OwnerSidebarData } from "./components/sidebars/OwnerSidebarData";
import { TenantSidebarData } from "./components/sidebars/TenantSidebarData";

function AppContent() {
  // ==========================
  // Logged-in user role
  // ==========================

  const [role, setRole] = useState(localStorage.getItem("role") || null);

  // ==========================
  // Owner Properties
  // ==========================

  const [cards, setCards] = useState(() => 
  {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : [];
  });

  // ==========================
  // Tenant Saved Properties
  // ==========================

  const [tenantCards, setTenantCards] = useState(() => 
  {
    const saved = localStorage.getItem("tenantCards");
    return saved ? JSON.parse(saved) : [];
  });

  // ==========================
  // Save data automatically
  // ==========================

  useEffect(() => 
  {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => 
  {
    localStorage.setItem("tenantCards", JSON.stringify(tenantCards));
  }, [tenantCards]);

  useEffect(() => 
  {
    if (role) 
    {
      localStorage.setItem("role", role);
    }
    else
    {
      localStorage.removeItem("role");
    }
  }, [role]);

  // ==========================
  // Property Functions
  // ==========================

  const createCard = (newCard) => 
  {
    setCards((prev) => [...prev, newCard]);
  };

  const deleteCard = (id) => 
  {
    setCards((prev) => prev.filter((card) => card.id !== id));
    setTenantCards((prev) => prev.filter((card) => card.id !== id));
  };

  const addTenantCard = (id) => 
  {
    const property = cards.find((card) => card.id === id);

    if (!property) return;

    setTenantCards((prev) => [...prev, property]);
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const removeTenantCard = (id) => 
  {
    const property = tenantCards.find((card) => card.id === id);

    if (!property) return;

    setCards((prev) => [...prev, property]);
    setTenantCards((prev) => prev.filter((card) => card.id !== id));
  };

  // ==========================
  // Logout
  // ==========================

  const logout = () => {setRole(null);};

  return (
    <>
      {role && ( <Navbar sidebarData={ role === "owner" ? OwnerSidebarData : TenantSidebarData } logout={logout} /> )}

      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage setRole={setRole} />} />
        {/* Signup */}
        <Route path="/signup" element={<SignupPage setRole={setRole} />} />
        {/* Owner */}
        <Route path="/cardmaker" element={ role === "owner" ? 
          ( <CardMaker cards={cards} onCreate={createCard} onDelete={deleteCard} />) : 
          (<Navigate to="/login" replace /> )
        }/>
        {/* Shared Tenant View */}
        <Route path="/tenantview" element={
            role ? 
            ( <TenantView cards={cards} onAdd={addTenantCard} />) : 
            ( <Navigate to="/login" replace /> )} />

        {/* Tenant */}
        <Route path="/tenantcard" element={role === "tenant" ? 
        ( <TenantCard tenantCards={tenantCards} onRemove={removeTenantCard} /> )
        :
        ( <Navigate to="/login" replace /> )
        }/>
        {/* Default */}
        <Route path="/" element={ role ?
        ( <Navigate to={ role === "owner" ? "/cardmaker" : "/tenantview" } replace/>)
        : 
        ( <Navigate to="/login" replace />)}/>
        {/* Unknown */}
        <Route path="*" element={<Navigate to="/" replace />} />
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
