import React from 'react';
import './Section31.scss';

const Section31 = () => {
    const processes = [
        {
          id: 1,
          icon: '/images/star.png',
          title: 'Report Online Fraud',
          description: 'Easily report scams through our secure platform. Your action helps combat cybercrime, and we ensure confidentiality and urgency in handling your reports.',
        },
        {
          id: 2,
          icon: '/images/software-application.png',
          title: 'Track Investigations',
          description: 'Monitor your fraud case in real-time. Get regular updates and full transparency as our team works to resolve your case efficiently and effectively.',
        },
        {
          id: 3,
          icon: '/images/document.png',
          title: 'Safe Investments',
          description: 'Invest with confidence. We vet opportunities to ensure they are secure, profitable, and meet industry standards, prioritizing your financial security.',
        },
        {
          id: 4,
          icon: '/images/innovation.png',
          title: '24/7 Support',
          description: 'Our support team is available anytime to assist with fraud reporting, case tracking, or investment inquiries, offering quick and compassionate help.',
        },
        {
          id: 5,
          icon: 'https://static.capital.com/capital-v-c-20250129-1/_next/static/media/card-pos.71d77f70.svg',
          title: 'Safe Transactions',
          description: 'We provide secure, transparent payment options with trusted providers, keeping your financial information protected and ensuring seamless transactions.',
        },
      ];
      

  return (
    <div className="section31">
      <h3>Our Processes</h3>
      <div className="processes-grid">
        {processes.map((process) => (
          <div className="process-card" key={process.id}>
            <div className="process-icon">
              <img src={process.icon} alt={process.title} />
            </div>
            <h4>{process.title}</h4>
            <p>{process.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section31;
