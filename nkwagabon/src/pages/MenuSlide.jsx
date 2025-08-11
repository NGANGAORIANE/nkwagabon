import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function MenuSlider({ restaurantId, onClose }) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef();

  useEffect(() => {
    const fetchMenus = async () => {
      const res = await fetch(`http://localhost:3000/menus/${restaurantId}`);
      const data = await res.json();
      setMenus(data);
      setLoading(false);
    };
    fetchMenus();
  }, [restaurantId]);

  // Fermer si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100000,
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      {loading ? (
        <p>Chargement des menus...</p>
      ) : menus.length === 0 ? (
        <p>Aucun menu trouvé.</p>
      ) : (
        <>
          <h5 className="mb-3">Menus disponibles</h5>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={15}
            slidesPerView={2}
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {menus.map((menu) => (
              <SwiperSlide key={menu.id}>
                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '10px',
                    background: '#f9f9f9',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={menu.photo}
                    alt={menu.nom}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <h6 className="mt-2">{menu.nom}</h6>
                  <p className="mb-1">{menu.description}</p>
                  <strong>{menu.prix} FCFA</strong>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
