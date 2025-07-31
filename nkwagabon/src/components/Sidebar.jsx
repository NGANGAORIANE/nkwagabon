import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaChartBar,
  FaUsers,
  FaMapMarkerAlt,
  FaUtensils,
  FaCalendarAlt,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';

export default function AdminSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { to: '/admin', icon: <FaChartBar />, label: 'Tableau de bord' },
    { to: '/admin/utilisateurs', icon: <FaUsers />, label: 'Utilisateurs' },
    { to: '/admin/destinations', icon: <FaMapMarkerAlt />, label: 'Destinations' },
    { to: '/admin/restaurants', icon: <FaUtensils />, label: 'Restaurants' },
    { to: '/admin/evenements', icon: <FaCalendarAlt />, label: 'Événements' },
    { to: '/', icon: <FaAngleLeft />, label: 'Retour' },
  ];

  return (
    <aside
      className="bg-light border-end vh-100 p-3"
      style={{
        width: collapsed ? '64px' : '240px',
        position: 'fixed',
        top: '72px',
        left: 0,
        transition: 'width 0.2s',
        zIndex: 1030
      }}
    >
      <button
        className="btn btn-sm btn-outline-secondary mb-3"
        style={{ width: '100%' }}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Déplier le menu" : "Replier le menu"}
      >
        {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
      <nav className="d-flex flex-column gap-3">
        {links.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`d-flex align-items-center gap-2 text-decoration-none px-2 py-2 rounded ${
              location.pathname === to ? 'bg-success text-white' : 'text-dark'
            }`}
            style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            <span>{icon}</span>
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}