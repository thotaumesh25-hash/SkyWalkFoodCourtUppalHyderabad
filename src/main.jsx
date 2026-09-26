import React, {useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import {ChevronLeft, ChevronRight, ArrowUpRight, ChevronDown, Clock3, Instagram, Mail, MapPin, Menu, Phone, Star, UtensilsCrossed, X } from 'lucide-react';
import './styles.css';

import cheeseBalls from './assets/food-cheese-balls.jpeg';
import momos from './assets/food-momos.jpeg';
import fries from './assets/food-fries.jpeg';
import entrance from './assets/storefront-entrance.png';
import sign from './assets/storefront-sign.png';

const reviews = [
  {
    name: "Navya Sree Banavathu",
    rating: 5,
    text: "I ordered the veg cheese balls, and they tasted really good. The service was also very good, and the staff were friendly and welcoming. Overall, I had a great experience!",
  },
  {
    name: "Pravalika Ak",
    rating: 5,
    text: "Excellent food nd service",
  },
  {
    name: "LakshmiNeelima",
    rating: 5,
    text: "Budget-Friendly Food Court! Definitely a place where you’ll leave with a full tummy and a happy heart! Yummy food, satisfying portions, and easy on the pocket. Worth a try if you’re looking for tasty food without spending too much!",
  },
  {
    name: "Mahesh Nagu",
    rating: 5,
    text: "Good taste…Good service",
  },
  {
    name: "Rahul Yadav",
    rating: 5,
    text: "Paneer Momos Are Delicious 😋",
  },
  {
    name: "Karnakar Yadav",
    rating: 5,
    text: "Great food, quick service, and a clean, pleasant atmosphere. Lots of tasty options to choose from.",
  },
  {
    name: "Kammampati Praveen",
    rating: 5,
    text: "Had a great experience at this food court! The food was delicious, fresh, and served nicely, with plenty of options and a clean, comfortable, lively atmosphere.",
  },
  {
    name: "Vadthya Vighnesh Nayak",
    rating: 5,
    text: "Pull up a chair, take a taste, come join with us — SkyWalk FoodCourt! 😁",
  },
];

const menuItems = [
  { name: 'Veg Cheese Balls', tag: 'Crispy favourite', image: cheeseBalls, description: 'Golden, crunchy bites with a cheesy centre — a crowd-pleasing snack.' },
  { name: 'Paneer Momos', tag: 'Customer favourite', image: momos, description: 'Soft dumplings filled with flavourful paneer and served with a dip.' },
  { name: 'Crispy Fries', tag: 'Loaded & fun', image: fries, description: 'Crispy fries finished with a creamy drizzle for a seriously snackable plate.' },
];

const navItems = [
  ['Home', 'home'],
  ['Menu', 'menu'],
  ['About', 'about'],
  ['Reviews', 'reviews'],
  // ['Visit Us', 'visit'],
];

function Reveal({ children, delay = 0, className = '' }) {

  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
const [visibleCards, setVisibleCards] = useState(3);
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth <= 650) {
      setVisibleCards(1);
    } else if (window.innerWidth <= 1000) {
      setVisibleCards(2);
    } else {
      setVisibleCards(3);
    }
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
const maxReviewIndex = Math.max(
  0,
  reviews.length - visibleCards
);

const nextReview = () => {
  setCurrentReview((prev) =>
    prev >= maxReviewIndex ? 0 : prev + 1
  );
};

const prevReview = () => {
  setCurrentReview((prev) =>
    prev <= 0 ? maxReviewIndex : prev - 1
  );
};
useEffect(() => {
  setCurrentReview((prev) =>
    Math.min(prev, maxReviewIndex)
  );
}, [visibleCards, maxReviewIndex]);
useEffect(() => {
  if (isPaused) return;

  const timer = setInterval(() => {
    nextReview();
  }, 4500);

  return () => clearInterval(timer);
}, [isPaused, maxReviewIndex]);

  const scrollTo = (id) => {
  setMobileOpen(false);

  setTimeout(() => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 150);
};

  return (
    <div className="site-shell">
      <div className="top-strip">
        <div>Fresh bites • Good vibes • Friendly service</div>
        <a href="tel:+919000196171"><Phone size={14} /> 9000196171</a>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="SkyWalk FoodCourt home">
            <span className="brand-mark"><UtensilsCrossed size={21} /></span>
            <span><strong>SKY</strong>WALK <small>FOODCOURT</small></span>
          </button>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>

          <button className="nav-cta" onClick={() => scrollTo('visit')}>Find Us <ArrowUpRight size={17} /></button>
          <button className="mobile-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div className="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              {navItems.map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)}>{label}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero section-anchor">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="container hero-grid">
            <Reveal className="hero-copy">
              <div className="eyebrow"><span /> UPPAL, HYDERABAD <span /></div>
              <h1>Good food.<br /><em>Great vibes.</em><br />Come hungry.</h1>
              <p className="hero-text">A casual neighbourhood food court serving satisfying Chinese, snacks — made for quick bites, relaxed catch-ups and happy tummies.</p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => scrollTo('menu')}>Explore the menu <ArrowUpRight size={18} /></button>
                <button className="text-btn" onClick={() => scrollTo('visit')}>Get directions <MapPin size={17} /></button>
              </div>
              <div className="hero-meta">
                <div><span className="dot" /> Dine-in</div>
                <div><span className="dot" /> Takeaway</div>
                <div><span className="dot" /> Delivery</div>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="hero-visual">
              <div className="hero-card hero-card-main">
                <img src={cheeseBalls} alt="Veg cheese balls at SkyWalk FoodCourt" />
                <div className="image-label"><span>Made for sharing</span><strong>Fresh bites, happy nights.</strong></div>
              </div>
              <div className="hero-card hero-card-small">
                <img src={sign} alt="SkyWalk FoodCourt storefront sign" />
              </div>
              <div className="floating-note"><Star fill="currentColor" size={15} /> <span>Local favourite<br /><b>Good taste. Good service.</b></span></div>
            </Reveal>
          </div>
          <div className="scroll-cue"><span /> Scroll to discover</div>
        </section>

        <section id="menu" className="section menu-section section-anchor">
          <div className="container">
            <Reveal className="section-heading">
              <div><span className="eyebrow eyebrow-dark">WHAT'S ON THE TABLE</span><h2>Little bites.<br /><em>Big cravings.</em></h2></div>
              <p>We keep the vibe casual and the plates satisfying. Here are a few customer-favourite bites from SkyWalk.</p>
            </Reveal>
            <div className="menu-grid">
              {menuItems.map((item, i) => (
                <Reveal key={item.name} delay={i * 0.08} className="food-card-wrap">
                  <article className="food-card">
                    <div className="food-image"><img src={item.image} alt={item.name} /><span>{String(i + 1).padStart(2, '0')}</span></div>
                    <div className="food-content"><small>{item.tag}</small><h3>{item.name}</h3><p>{item.description}</p><div className="food-line" /></div>
                  </article>
                </Reveal>
              ))}
            </div>
            {/* <Reveal className="menu-note"><ChevronDown size={18} /> <span>Ask the team about the full selection of Chinese, tea, milkshakes and snacks.</span></Reveal> */}
          </div>
        </section>

        <section id="about" className="section about-section section-anchor">
          <div className="container about-grid">
            <Reveal className="about-collage">
              <div className="collage-large"><img src={entrance} alt="SkyWalk FoodCourt entrance with warm lights" /></div>
              <div className="collage-small"><img src={sign} alt="SkyWalk FoodCourt exterior" /></div>
              <div className="collage-stamp">SKY<br />WALK<br /><small>FOODCOURT</small></div>
            </Reveal>
            <Reveal delay={0.1} className="about-copy">
              <span className="eyebrow">WHY SKY WALK</span>
              <h2>A warm little spot<br />for <em>every kind of craving.</em></h2>
              <p>SkyWalk FoodCourt is built around simple things: tasty food, friendly people and a comfortable place to pause. Whether you are grabbing a quick bite, meeting friends or settling in for a casual meal, there is always room for one more.</p>
              <div className="feature-list">
                <div><span>01</span><div><b>Casual atmosphere</b><small>Easy-going, clean and comfortable.</small></div></div>
                <div><span>02</span><div><b>Made for groups</b><small>Bring your people, pull up a chair.</small></div></div>
                <div><span>03</span><div><b>Quick & convenient</b><small>Dine-in, takeaway and delivery options.</small></div></div>
              </div>
            </Reveal>
          </div>
        </section>

      <section className="reviews-section" id="reviews">
  <div className="reviews-container">

    <div className="reviews-heading">
      <span className="section-tag">
        WHAT OUR GUESTS SAY
      </span>

      <h2>
        Loved by our <span>Guests</span>
      </h2>

      <p>
        Great food, friendly service and happy memories.
        See what our guests have to say about SkyWalk FoodCourt.
      </p>
    </div>


    <div
      className="reviews-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* LEFT ARROW */}

      <button
        className="review-arrow"
        onClick={prevReview}
        aria-label="Previous review"
      >
        <ChevronLeft size={24} />
      </button>


      {/* VIEWPORT */}

      <div className="reviews-viewport">

        <motion.div
          className="reviews-track"
          animate={{
            x: `${-(currentReview * (100 / visibleCards))}%`,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {reviews.map((review) => (

            <div
              className="review-slide"
              key={review.name}
            >

              <article className="review-card">

                <div className="review-card-top">

                  <div className="stars">
                    {"★".repeat(review.rating)}
                  </div>

                  <span className="review-badge">
                    Guest Review
                  </span>

                </div>


                <div className="quote-mark">
                  "
                </div>


                <p className="review-text">
                  {review.text}
                </p>


                <div className="review-person">

                  <div className="review-avatar">
                    {review.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="review-person-info">

                    <strong>
                      {review.name}
                    </strong>

                    <span>
                      Verified Guest
                    </span>

                  </div>

                </div>

              </article>

            </div>

          ))}

        </motion.div>

      </div>


      {/* RIGHT ARROW */}

      <button
        className="review-arrow"
        onClick={nextReview}
        aria-label="Next review"
      >
        <ChevronRight size={24} />
      </button>

    </div>


    {/* DOTS */}

    <div className="review-pagination">

      {Array.from({
        length: maxReviewIndex + 1,
      }).map((_, index) => (

        <button
          key={index}
          className={
            index === currentReview
              ? "active"
              : ""
          }
          onClick={() =>
            setCurrentReview(index)
          }
          aria-label={`Review slide ${index + 1}`}
        />

      ))}

    </div>

  </div>
</section>

        <section id="visit" className="section visit-section section-anchor">
  <div className="container visit-grid">

    <Reveal className="visit-copy">
      <span className="eyebrow">COME SAY HELLO</span>

      <h2>
        Your next<br />
        <em>food stop.</em>
      </h2>

      <p>
        Find us in Venkateswara Colony, Uppal. Drop in for a quick bite,
        a relaxed meal or a catch-up with friends.
      </p>

      {/* Contact Details */}
      <div className="contact-list">

        <a
          href="https://www.google.com/maps/place/SkyWalk+FoodCourt/@17.4008095,78.5616049,19z/data=!4m6!3m5!1s0x3bcb99003a90a61d:0x9be88f8b83c5b5a1!8m2!3d17.4007986!4d78.5621052!16s%2Fg%2F11ntpm2r6_?entry=ttu&g_ep=EgoyMDI2MDkyMi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={20} />

          <span>
            <b>Address</b>
            1/79/8/B, Venkateswara Colony,
            <br />
            Vijayapuri Colony, Uppal,
            <br />
            Hyderabad, Telangana 500039
          </span>

          <ArrowUpRight size={17} />
        </a>

        <a href="tel:+919000196171">
  <Phone size={20} />

  <span>
    <b>Vamshi</b>
    +91 9000196171
  </span>

  <ArrowUpRight size={17} />
</a>

        <a href="mailto:sunnyvamshi221100@gmail.com">
          <Mail size={20} />

          <span>
            <b>Email</b>
            sunnyvamshi221100@gmail.com
          </span>

          <ArrowUpRight size={17} />
        </a>

      </div>


      {/* Opening Hours */}
      <div className="opening-hours">

        <div className="hours-title">
          <Clock3 size={20} />

          <div>
            <small>OPENING HOURS</small>
            <h3>We're open every day</h3>
          </div>
        </div>

        <div className="hours-list">

          <div className="hours-row">
            <span>Monday</span>
            <strong>6:30 AM – 11:30 PM</strong>
          </div>

          <div className="hours-row">
            <span>Tuesday</span>
            <strong>6:30 AM – 11:30 PM</strong>
          </div>

          <div className="hours-row">
            <span>Wednesday</span>
            <strong>6:30 AM – 11:30 PM</strong>
          </div>

          <div className="hours-row">
            <span>Thursday</span>
            <strong>6:30 AM – 11:30 PM</strong>
          </div>

          <div className="hours-row">
            <span>Friday</span>
            <strong>6:30 AM – 11:30 PM</strong>
          </div>

          <div className="hours-row">
            <span>Saturday</span>
            <strong>6:30 AM – 11:30 PM</strong>
          </div>

          <div className="hours-row">
            <span>Sunday</span>
            <strong>6:30 AM – 11:30 PM</strong>
          </div>

        </div>
      </div>


      {/* Services */}
      <div className="service-chips">
        <span>Dine-in</span>
        <span>Takeaway</span>
        <span>Delivery</span>
        <span>Kids welcome</span>
        <span>Free street parking</span>
        <span>NFC payments</span>
      </div>

    </Reveal>


    {/* Right Side */}
    <Reveal delay={0.12} className="visit-visual">

      <div className="visit-photo">
        <img
          src={entrance}
          alt="SkyWalk FoodCourt entrance at night"
        />
      </div>

      <div className="visit-card">
        <Clock3 size={19} />

        <div>
          <small>COME AS YOU ARE</small>
          <strong>Good food, easy atmosphere.</strong>
        </div>
      </div>

    </Reveal>

  </div>
</section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <div><button className="brand footer-brand" onClick={() => scrollTo('home')}><span className="brand-mark"><UtensilsCrossed size={19} /></span><span><strong>SKY</strong>WALK <small>FOODCOURT</small></span></button><p>Chinese • Snacks</p></div>
          <div className="footer-links"><button onClick={() => scrollTo('menu')}>Menu</button><button onClick={() => scrollTo('about')}>About</button><button onClick={() => scrollTo('reviews')}>Reviews</button></div>
          <div className="footer-social"><a href="mailto:sunnyvamshi221100@gmail.com" aria-label="Email"><Mail size={18} /></a><a href="tel:+919000196171" aria-label="Phone"><Phone size={18} /></a><a href="#home" aria-label="Instagram"><Instagram size={18} /></a></div>
        </div>
        <div className="container footer-bottom">
  <span>
    © {new Date().getFullYear()} SkyWalk FoodCourt. All rights reserved. | Website by <strong>UR Technologies</strong>
  </span>
  <span>Made with care in Uppal, Hyderabad.</span>
</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
