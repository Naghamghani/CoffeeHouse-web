// src/pages/About.jsx
import React from "react";
import "./About.css"; // استيراد ملف CSS
import "./Pages.css";
import omar from "../assets/omar.jpg";
import ahmad from "../assets/ahmad.jpg";
import lina from "../assets/lina.jpg";

const teamMembers = [
  {
    name: "Ahmed Al-Hakim",
    role: "Head Barista",
    img: ahmad ,
  },
  {
    name: "Lina Haddad",
    role: "Manager",
    img: lina ,
  },
  {
    name: "Omar Khalil",
    role: "Pastry Chef",
    img: omar ,
  },
];

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-header">About Us</h1>

      <section className="about-story">
        <h2>Our Story</h2>
        <p>
          Welcome to Brew Haven! Founded in 2015, our coffee shop started with a simple passion:
          creating the perfect cup of coffee in a cozy and welcoming environment. We believe that
          coffee is more than a drink—it's an experience. Our mission is to bring people together
          over great coffee and good vibes.
        </p>
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80"
          alt="Coffee Shop Interior"
          className="story-image"
        />
      </section>

      <section className="about-mission">
        <h2>Mission & Vision</h2>
        <p><strong>Mission:</strong> To provide high-quality coffee and a memorable experience in a cozy and friendly environment.</p>
        <p><strong>Vision:</strong> To become a community hub where coffee lovers gather, relax, and enjoy life.</p>
      </section>

      <section className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.img} alt={member.name} className="team-img" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-gallery">
        <h2>Our Coffee Moments</h2>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80" alt="Coffee Cup" />
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Coffee Beans" />
          <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80" alt="Barista at Work" />
        </div>
      </section>
    </div>
  );
};

export default About;