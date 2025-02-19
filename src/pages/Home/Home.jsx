import React from 'react';
import CryptoData from '../../components/CryptoData/CryptoData';
import './Home.scss';
import VideoCarousel from '../../components/Carousel/VideoCarousel';
import Section1 from '../../components/Section1/Section1';
import Section2 from '../../components/Section2/Section2';
import Section3 from '../../components/Section3/Section3';
import Section4 from '../../components/Section4/Section4';
import Reviews from '../../components/Reviews/Reviews';
import Section5 from '../../components/Section5/Section5';
import InvestForm from '../../components/InvestmentForm/InvestForm';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import VideoCard from '../../components/VideoCards/VideoCard';

const Home = () => {

  const videos = [
    {
      videoUrl: 'https://www.youtube.com/watch?v=nYe-0sayJAU',
      title: 'Expert speaks with Channel Ten’s The Project',
      description: 'Dan Halpin speaks with Channel Ten’s The Project about the state of scams in Australia in May 2024',
      thumbnail: 'https://img.youtube.com/vi/nYe-0sayJAU/sddefault.jpg',
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=fhXOC83OIV8',
      title: 'Experts from Australia speak with 7News on scams',
      description: 'Expert speaks with 7News about Google ads leading victims to scammers on 18 November 2024',
      thumbnail: 'https://img.youtube.com/vi/fhXOC83OIV8/sddefault.jpg',
    },
    {
      videoUrl: 'https://www.youtube.com/watch?v=boCX3xOgK2o',
      title: 'ABC News. Capital Trust Partner, ABC Interview Dec 2022',
      description: 'Expert speaks with ABC The current crypto landscape',
      thumbnail: 'https://img.youtube.com/vi/boCX3xOgK2o/sddefault.jpg',
    },
  ];

  

  return (
    <div>
    <Navbar />
    <div className='padding-home'>

    <hr/>
    <VideoCarousel />
    <br />
    <Section3 /> 
    <br/>
    <hr/>
    <CryptoData />
    <br/>
    <br/>
    <Reviews />
    <br />
    <br/>

    <Section1 />
    <br/>
    <br/>

    <InvestForm />
    
    
    <br />
    <Section4 />
    <div className="text-center">
    
    <h2 className="text-center-h2">Please Note!</h2>
    <p className="text-center-p">If we successfully recover your stolen assets, we cannot be held responsible if the current value of the recovered cryptocurrency is lower than the value of the coins you originally purchased. The value of cryptocurrencies can fluctuate significantly, and market conditions may have changed since the time of your purchase.
    We strongly advise you to refer to the price cards below for the current value of the cryptocurrency you were scammed out of. You can use this information to calculate the current equivalent value of your recovered assets.
    We encourage you to stay informed and perform your own calculations based on the current market prices to better understand the value of your recovery.</p>
    
    <p>Thank you for trusting us to assist you in recovering your assets.</p>
    </div>
    </div>

    <Footer />
    </div>
  );
};

export default Home;
