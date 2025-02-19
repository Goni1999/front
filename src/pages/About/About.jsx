import React from 'react';
import './About.scss';
import '../../components/Blogs/Blog.scss';
import Section2 from '../../components/Section2/Section2';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ReportCaseModal from '../../components/ReportCaseModal/ReportCaseModal';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className='padding-home'>

    <hr/>
      <header className="about-header">
        <h1 className="about-title">CapitalTrust: Empowering Financial Security and Growth</h1>
        <p className="about-subtitle">Since 2012, we've been pioneering investment security, offering peace of mind and tailored financial strategies.</p>
      </header>

      <section className="about-introduction">
        <div className="intro-image">
          <img src="/images/Logo.png" alt="CapitalTrust Logo" className="logo" />
        </div>
        <div className="intro-text">
          <h2>Our Journey: From Vision to Trust</h2>
          <p>Founded with a singular vision in 2012, CapitalTrust was created to prioritize the security of investments and the peace of mind of our clients. We understood the importance of trust in finance, and this vision has guided us to offer secure, transparent, and future-focused investment solutions.</p>
        </div>
      </section>

      <section className="about-security">
        <div className="security-text">
          <h2>Commitment to Protection and Innovation</h2>
          <p>We utilize cutting-edge security technologies, including encryption and multi-factor authentication, to safeguard your assets. Our compliance with global financial regulations ensures that your investments are handled with the highest degree of integrity and professionalism.</p>
        </div>
        <div className="security-image">
          <img src="/images/image14.jpg" alt="Advanced Security" />
        </div>
      </section>

      <section className="about-approach">
        <h2>Tailored Financial Solutions for Every Goal</h2>
        <p>At CapitalTrust, we understand that every investor is unique. Our expert advisors work closely with clients to create customized strategies, helping them navigate various investment landscapes—from stocks to real estate, to the latest digital assets.</p>
        <div className="approach-details">
          <div className="advisor">
            <h3>Expert Financial Advisors</h3>
            <p>Our team of seasoned professionals is dedicated to helping you make informed, confident decisions about your financial future.</p>
          </div>
          <div className="scam-protection">
            <h3>Protecting Against Financial Scams</h3>
            <p>With fraud becoming increasingly sophisticated, we empower our clients with the knowledge and tools to stay safe. We offer real-time fraud detection systems and continuous education to recognize and avoid scams.</p>
          </div>
        </div>
        <div className="investment-image">
          <img src="/images/image22.jpg" alt="Investing with CapitalTrust" />
        </div>
      </section>

      

      <section className="about-why-choose">
        <h2>Why Choose CapitalTrust?</h2>
        <p>Choosing CapitalTrust means opting for a partner dedicated to your financial success. Here's why clients trust us:</p>
        <div className="reasons-list">
          <div className="reason-item">
            <h3>Proven Success</h3>
            <p>With over a decade of experience, our track record of successful investments speaks for itself.</p>
          </div>
          <div className="reason-item">
            <h3>Personalized Service</h3>
            <p>We tailor every strategy to suit your personal financial goals, ensuring the best possible outcomes.</p>
          </div>
          <div className="reason-item">
            <h3>24/7 Client Support</h3>
            <p>Our dedicated support team is available around the clock to assist with any inquiries or concerns.</p>
          </div>
        </div>
      </section>
      <br/>
      <Section2 />
      <br/>

      <section className="about-conclusion">
        <h2>Partner with Us Today</h2>
        <p>Since 2012, CapitalTrust has been more than just a financial institution. We’re a trusted partner in your financial journey, committed to protecting and growing your wealth.</p>
        <p>Ready to secure your financial future? Contact us today to explore our range of investment solutions.</p>
        <div className='reportcase'>
    <ReportCaseModal />
    </div>
      </section>
</div>
      <Footer />
    </div>
  );
};

export default About;
