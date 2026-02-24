import React, { useEffect, useState } from "react";
import img from "../assests/periodicservices1.jpg";
import bat3 from "../assests/batteries3.jpg";
import bat5 from "../assests/dentingpainting2.jpg";
import acci from "../assests/accidentservice.jpg";
import tyre from "../assests/tyreswheels6.jpg";
import custom from "../assests/customservices9.png";
import wind from "../assests/windsheild.jpg";
import light from "../assests/light.jpg";
import enigine from "../assests/Engine_Decarbonization.jpg.jpg";
import wash from "../assests/carwash-removebg-preview(3).png";
import { useNavigate } from "react-router-dom";
import heroBg from "../assests/Repair-img.png";


export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const services = [
    { img: bat3, title: "Batteries" },
    { img: bat5, title: "Denting & Painting" },
    { img: img, title: "Periodic Services" },
    { img: acci, title: "Accidental Repair" },
    { img: tyre, title: "Tyres & Wheels" },
    { img: custom, title: "Custom Services" },
    { img: wind, title: "Windshield & Glass" },
    { img: light, title: "Lights & Fitments" },
    { img: enigine, title: "Engine Decarbonization" },
    { img: wash, title: "Car Wash" }
  ];

  const reviews = [
    {
      id: 1,
      title: "I Can Vouch For Them",
      text: "Professional service with genuine parts. Great atmosphere and reasonable rates!",
      name: "Yash Gite",
      platform: "Google",
      workshop: "Urja Automobiles - Nashik",
      icon: "https://static.vecteezy.com/system/resources/previews/011/598/471/original/google-logo-icon-illustration-free-vector.jpg",
    },
    {
      id: 2,
      title: "Definitely Urja Automobiles",
      text: "Best customer service experience. Clear information and fair pricing.",
      name: "Saurabh Gore Patil",
      platform: "Google",
      workshop: "Urja Automobiles - Nashik",
      icon: "https://static.vecteezy.com/system/resources/previews/011/598/471/original/google-logo-icon-illustration-free-vector.jpg",
    },
    {
      id: 3,
      title: "Highly Recommended!",
      text: "Quick roadside rescue and same-day service. Very professional team!",
      name: "Vitthal Jadhav",
      platform: "Google",
      workshop: "Urja Automobiles - Nashik",
      icon: "https://static.vecteezy.com/system/resources/previews/011/598/471/original/google-logo-icon-illustration-free-vector.jpg",
    },
  ];

  const steps = [
    { id: 1, title: "Choose", desc: "Select Service", icon: "🎯" },
    { id: 2, title: "Book", desc: "Make Appointment", icon: "📅" },
    { id: 3, title: "Fair Price", desc: "Get Quote", icon: "💰" },
    { id: 4, title: "Doorstep", desc: "Pickup & Drop", icon: "🚗" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getOpacity = (baseY) => Math.max(0, 1 - (scrollY - baseY) / 400);
  const getTranslateY = (baseY) => Math.min(50, Math.max(0, (scrollY - baseY) / 10));

  return (
    <>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div 
              className="hero-bg" 
              style={{ 
                backgroundImage: `url(${heroBg})`  // ✅ Uses your local image!
              }}
            ></div>

          <div className="hero-content">
            <div className="hero-text animate-hero">
              <h1 className="hero-title">World-Class Car Care</h1>
              <p className="hero-subtitle">
                Premium automotive service at affordable prices. Complete car care, 
                maintenance & repairs by certified experts.
              </p>
              <button 
                className="cta-button pulse" 
                onClick={() => navigate("/login")}
              >
                Book Service Now
              </button>
            </div>
          </div>
        </section>

        {/* Main Title */}
        <section className="title-section">
          <h1 className="main-title">GARAGE MASTER</h1>
          <div className="title-underline"></div>
        </section>

        {/* Services Grid */}
        <section className="services-section">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="service-card"
                style={{ 
                  '--delay': `${index * 0.1}s`,
                  opacity: getOpacity(200 + index * 50),
                  transform: `translateY(${getTranslateY(200 + index * 50)}px)`
                }}
              >
                <div className="service-icon">
                  <img src={service.img} alt={service.title} />
                </div>
                <h3>{service.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="features-content">
              <div className="features-text">
                <h2 className="section-title gradient-text">Why Choose Us?</h2>
                <p className="features-desc">
                  Delivering top-notch automotive solutions with certified experts 
                  and cutting-edge technology. Trust Urja Automobiles for your vehicle.
                </p>
              </div>
              <div className="features-grid">
                {[
                  { icon: "https://www.garage.movemycar.in/assets/images/garage.png", title: "Certified Experts", desc: "Skilled technicians" },
                  { icon: "https://www.garage.movemycar.in/assets/images/garage.png", title: "Modern Facility", desc: "Advanced equipment" },
                  { icon: "https://www.garage.movemycar.in/assets/images/wallet.png", title: "Affordable", desc: "Best value pricing" },
                  { icon: "https://www.garage.movemycar.in/assets/images/customer-service.png", title: "24/7 Support", desc: "Real-time updates" }
                ].map((feature, i) => (
                  <div key={feature.title} className="feature-card">
                    <img src={feature.icon} alt={feature.title} />
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="features-image">
              <img 
                src="https://www.garage.movemycar.in/assets/images/image-1.jpg"
                alt="Modern Garage"
              />
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="process-section">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple 4-Step Process</p>
          <div className="process-grid">
            {steps.map((step) => (
              <div key={step.id} className="process-step">
                <div className="step-number">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <div>
                <h2>Ready For Service?</h2>
                <h3>Call: <span className="phone">8080056951</span></h3>
                <p>Quality repair services guaranteed</p>
              </div>
              <img 
                src="https://www.garage.movemycar.in/assets/images/schedule-apointment.png"
                alt="Schedule"
                className="cta-image"
              />
              <button 
                className="cta-button large pulse" 
                onClick={() => navigate("/login")}
              >
                Book Now →
              </button>
            </div>
          </div>
        </section>

        {/* Guides */}
        <section className="guides-section">
          <h2 className="section-title">Handy Guides</h2>
          <div className="guides-grid">
            {[
              { img: "https://www.boschcarservice.com/xrm/media/guides/accident_guide_image_640w_360h.jpg", title: "Accident Guide", desc: "Post-accident steps" },
              { img: "https://www.boschcarservice.com/xrm/media/guides/battery_guide_image_640w_360h.jpg", title: "Battery Guide", desc: "Maintenance tips" },
              { img: "https://www.boschcarservice.com/xrm/media/guides/fuel_saving_guide_image_640w_360h.jpg", title: "Fuel Guide", desc: "Save fuel & money" }
            ].map((guide, i) => (
              <div key={guide.title} className="guide-card">
                <img src={guide.img} alt={guide.title} />
                <div className="guide-content">
                  <h4>{guide.title}</h4>
                  <p>{guide.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="reviews-section">
          <h2 className="section-title">Customer Reviews</h2>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <img src={review.icon} alt={review.platform} />
                  <div>
                    <h4>{review.name}</h4>
                    <span>{review.platform}</span>
                  </div>
                </div>
                <div className="review-content">
                  <h3>"{review.title}"</h3>
                  <p>{review.text}</p>
                  <div className="workshop-tag">{review.workshop}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --black: rgb(0,0,0);
          --red: rgb(230,30,50);
          --white: rgb(255,255,255);
          --gray: rgb(179,179,179);
        }

        .home-container {
          font-family: 'Poppins', sans-serif;
          background: var(--black);
          color: var(--white);
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* Hero */
        .hero-section {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            var(--black) 0%, 
            rgba(230,30,50,0.3) 50%, 
            var(--black) 100%),
            url('https://www.cmsgarageandbody.com/images/InteriorBanner3.jpg');
          background-size: cover;
          background-position: center;
          animation: heroPan 25s linear infinite;
        }

        @keyframes heroPan {
          0% { background-position: center 0%; }
          50% { background-position: center 100%; }
          100% { background-position: center 0%; }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
          text-align: center;
        }

       .hero-title {
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 800;

  background: linear-gradient(45deg, #FFFFFF, #FF7A18);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  margin-bottom: 1.5rem;

  text-shadow: 0 0 25px rgba(255, 122, 24, 0.6);
  animation: glowPulse 3s ease-in-out infinite alternate;
}

        @keyframes glowPulse {
          0% { 
            text-shadow: 0 0 20px rgba(230,30,50,0.5), 0 0 40px rgba(230,30,50,0.3); 
          }
          100% { 
            text-shadow: 0 0 30px rgba(230,30,50,0.8), 0 0 60px rgba(230,30,50,0.5); 
          }
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto 2.5rem;
          opacity: 0.95;
          color: var(--gray);
        }

        .cta-button {
          background: linear-gradient(45deg, var(--red), rgba(230,30,50,0.8));
          color: var(--white);
          border: 2px solid var(--red);
          padding: 1.1rem 3rem;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 12px 30px rgba(230,30,50,0.4);
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(230,30,50,0.6);
          background: var(--red);
        }

        .cta-button.large { padding: 1.3rem 4rem; font-size: 1.3rem; }

        .pulse {
          animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(230,30,50,0.7); }
          70% { box-shadow: 0 0 0 25px rgba(230,30,50,0); }
          100% { box-shadow: 0 0 0 0 rgba(230,30,50,0); }
        }

        /* Title */
        .title-section {
          padding: 4rem 0;
          text-align: center;
          background: linear-gradient(135deg, var(--black), rgba(230,30,50,0.1));
        }

        .main-title {
          font-size: clamp(4rem, 10vw, 7rem);
          font-weight: 900;
          color: var(--white);
          letter-spacing: -2px;
          margin-bottom: 1rem;
          text-shadow: 3px 3px 0 var(--red);
          animation: titleShake 4s ease-in-out infinite;
        }

        @keyframes titleShake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .title-underline {
          width: 200px;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--red), var(--white));
          margin: 0 auto 1rem;
          border-radius: 2px;
          animation: underlineGlow 2s ease-in-out infinite alternate;
        }

        @keyframes underlineGlow {
          from { box-shadow: 0 0 10px var(--red); }
          to { box-shadow: 0 0 20px var(--red), 0 0 30px var(--red); }
        }

        /* Sections */
        .section-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: 1.5rem;
          color: var(--white);
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: var(--red);
          border-radius: 2px;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          color: var(--gray);
          margin-bottom: 3rem;
          font-weight: 300;
        }

        /* Services */
        .services-section {
          padding: 6rem 0;
          background: rgba(255,255,255,0.02);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 3rem auto 0;
          padding: 0 20px;
        }

        .service-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          animation: cardRise 0.8s ease-out forwards;
          animation-delay: var(--delay);
          opacity: 0;
          transform: translateY(60px) scale(0.95);
        }

        @keyframes cardRise {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .service-card:hover {
          transform: translateY(-20px) scale(1.02);
          border-color: var(--red);
          box-shadow: 0 30px 60px rgba(230,30,50,0.3);
          background: rgba(255,255,255,0.12);
        }

        .service-icon {
          margin-bottom: 1.5rem;
        }

        .service-icon img {
          width: 90px;
          height: 90px;
          object-fit: contain;
          transition: all 0.4s ease;
          filter: brightness(0) invert(1);
        }

        .service-card:hover .service-icon img {
          transform: scale(1.15) rotate(360deg);
          filter: brightness(0) invert(0.3) sepia(1) saturate(3) hue-rotate(330deg);
        }

        .service-card h3 {
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 0.5rem;
        }

        /* Features */
        .features-section {
          padding: 7rem 0;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .features-content {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 5rem;
          align-items: center;
          margin-bottom: 4rem;
        }

        .gradient-text {
          background: linear-gradient(45deg, var(--white), var(--red));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .features-desc {
          font-size: 1.25rem;
          color: var(--gray);
          line-height: 1.8;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 2.5rem 2rem;
          border-radius: 18px;
          text-align: center;
          transition: all 0.4s ease;
        }

        .feature-card:hover {
          border-color: var(--red);
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(230,30,50,0.2);
        }

        .feature-card img {
          width: 70px;
          height: 70px;
          margin-bottom: 1.2rem;
          filter: brightness(0) invert(1);
          transition: all 0.4s ease;
        }

        .feature-card:hover img {
          filter: brightness(0) invert(0.3) sepia(1) saturate(4) hue-rotate(330deg);
          transform: scale(1.1);
        }

        .feature-card h4 {
          font-size: 1.3rem;
          color: var(--white);
          margin-bottom: 0.8rem;
        }

        .features-image {
          text-align: center;
        }

        .features-image img {
          max-width: 100%;
          border-radius: 24px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          border: 8px solid rgba(230,30,50,0.2);
          transition: all 0.6s ease;
        }

        .features-image:hover img {
          transform: scale(1.03);
          border-color: var(--red);
        }

        /* Process */
        .process-section {
          padding: 7rem 0;
          background: rgba(230,30,50,0.03);
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .process-step {
          text-align: center;
          padding: 3rem 2rem;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 2px solid rgba(255,255,255,0.1);
          position: relative;
          transition: all 0.4s ease;
        }

        .process-step:hover {
          border-color: var(--red);
          background: rgba(255,255,255,0.1);
          transform: translateY(-20px);
          box-shadow: 0 35px 70px rgba(230,30,50,0.3);
        }

        .step-number {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          animation: bounce 2.5s infinite;
          text-shadow: 0 5px 15px rgba(230,30,50,0.5);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-8px); }
        }

        .process-step h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--red);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* CTA */
        .cta-section {
          padding: 7rem 0;
          background: linear-gradient(135deg, var(--red), rgba(230,30,50,0.9));
        }

        .cta-content {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 4rem;
          align-items: center;
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: clamp(2.2rem, 5vw, 3rem);
          margin-bottom: 1rem;
          color: var(--white);
        }

        .phone {
          color: var(--white);
          font-size: 2.5rem;
          font-weight: 900;
          background: rgba(0,0,0,0.3);
          padding: 1rem 2rem;
          border-radius: 50px;
          display: inline-block;
          border: 2px solid rgba(255,255,255,0.3);
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .cta-image {
          width: 220px;
          height: 220px;
          object-fit: contain;
          filter: drop-shadow(0 25px 50px rgba(0,0,0,0.5));
        }

        /* Guides */
        .guides-section {
          padding: 7rem 0;
        }

        .guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .guide-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(25px);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.5s ease;
          cursor: pointer;
        }

        .guide-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: var(--red);
          box-shadow: 0 40px 80px rgba(230,30,50,0.3);
        }

        .guide-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .guide-card:hover img {
          transform: scale(1.1);
        }

        .guide-content {
          padding: 2rem;
        }

        .guide-content h4 {
          color: var(--white);
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          font-weight: 600;
        }

        .guide-content p {
          color: var(--gray);
          font-size: 1.1rem;
        }

        /* Reviews */
        .reviews-section {
          padding: 7rem 0 4rem;
          background: rgba(255,255,255,0.02);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .review-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(25px);
          padding: 3rem 2.5rem;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.5s ease;
        }

        .review-card:hover {
          transform: translateY(-15px);
          border-color: var(--red);
          box-shadow: 0 40px 80px rgba(230,30,50,0.25);
          background: rgba(255,255,255,0.15);
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }

        .review-header img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          box-shadow: 0 15px 30px rgba(0,0,0,0.4);
          border: 3px solid var(--red);
        }

        .review-header h4 {
          font-size: 1.2rem;
          color: var(--white);
          margin-bottom: 0.2rem;
        }

        .review-header span {
          color: var(--red);
          font-size: 1rem;
          font-weight: 500;
        }

        .review-content h3 {
          color: var(--red);
          font-size: 1.6rem;
          margin-bottom: 1.2rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .review-content p {
          color: var(--gray);
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }

        .workshop-tag {
          background: var(--red);
          color: var(--white);
          padding: 0.8rem 1.5rem;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 600;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 20px rgba(230,30,50,0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .features-content { grid-template-columns: 1fr; gap: 3rem; }
        }

        @media (max-width: 768px) {
          .cta-content { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
          .cta-image { width: 160px; height: 160px; }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .main-title { letter-spacing: -1px; }
        }

        @media (max-width: 480px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
