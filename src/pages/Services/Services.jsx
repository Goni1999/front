import React from 'react'
import Section5 from '../../components/InvestmentForm/InvestForm';
import Reviews from '../../components/Reviews/Reviews';
import ReportCaseModal from '../../components/ReportCaseModal/ReportCaseModal';
import './Services.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Services = () => {
  return (
    <div className='Services'>
    <Navbar />
    <div className='padding-home'>

    <Section5 />
    <h2>Inform us now and help will be on its way!</h2>
    <br />
    <div className='reportcase'>
    <ReportCaseModal />
    </div>
    <br />
    <br />
    <br />
    <Reviews />
    <section className="about-investments">
        <div className="investment-types">
          <h2>Investment Opportunities</h2>
          <p>Explore our diverse range of investment options tailored to suit your risk appetite and financial goals.</p>
          <div className="investment-list">
            <div className="investment-item">
              <h3>Stocks & Bonds</h3>
              <p>Our clients gain access to a diversified portfolio of stocks and bonds, backed by expert guidance for optimal returns.</p>
            </div>
            <div className="investment-item">
              <h3>Real Estate</h3>
              <p>Invest in prime residential and commercial real estate, chosen for long-term growth and stability.</p>
            </div>
            <div className="investment-item">
              <h3>Mutual Funds</h3>
              <p>Diversify across multiple asset classes with professionally managed mutual funds for consistent performance.</p>
            </div>
            <div className="investment-item">
              <h3>Cryptocurrencies</h3>
              <p>We offer secure avenues for investing in the dynamic world of digital assets, with the highest level of security.</p>
            </div>
          </div>
        </div>
        <div className="investment-image">
          <img src="/images/image22.jpg" alt="Investing with CapitalTrust" />
        </div>
      </section>
      </div>
    <Footer />
    </div>
  )
}

export default Services;