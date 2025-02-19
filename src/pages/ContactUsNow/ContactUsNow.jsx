import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ContactUsNow.scss';

function ContactUsNow() {
    const [formData, setFormData] = useState({
        enquiryType: 'fraud-scams',
        fullName: '',
        email: '',
        phone: '',
        country: '',
        scamWebsite: '',
        lostMoney: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://server.capital-trust.eu/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error submitting enquiry.');
            }

            const data = await response.json();
            alert(data.message || 'Enquiry sent successfully!');
            setFormData({
                enquiryType: 'fraud-scams',
                fullName: '',
                email: '',
                phone: '',
                country: '',
                scamWebsite: '',
                lostMoney: '',
                message: '',
            });
        } catch (error) {
            console.error('❌ Error submitting enquiry:', error);
            alert(error.message || 'There was an error submitting your enquiry.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='padding-home'>

            <main role="main">
                <div className="lt-start-screen-wrap lt-container">
                    <div className="lt-container-inner">
                        <div className="lt-breadcrumbs-wrapper lt-pt-lg-5 lt-pb-lg-4">
                            <ol className="breadcrumbs">
                                <li>
                                    <a href="/hc/en-us">CapitalTrust</a>
                                </li>
                                <li>Submit a request</li>
                            </ol>
                        </div>
                        <div className="lt-row lt-align-items-sm-center">
                            <div className="lt-search-box lt-search-box--small lt-search-box--icon lt-mb-4 lt-col-sm-12 lt-col-lg-4">
                                <form role="search" className="search" data-search="" data-instant="true" autocomplete="off" action="/hc/en-us/search" accept-charset="UTF-8" method="get">
                                    <input name="utf8" type="hidden" value="✓" autocomplete="off"/>
                                    <input type="search" name="query" id="query" placeholder="Search..." autocomplete="off" aria-label="guide_search"/>
                                </form>
                            </div>
                            <div className="lt-page__heading lt-col-sm-12 lt-col-lg-8">
                                <h1 className="lt-page__title lt-mb-3">Submit a request</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lt-container lt-new-request-page lt-pb-8 lt-pt-6 lt-pt-lg-8">
                    <div className="lt-container-inner">
                        <div className="lt-row">
                            <div className="lt-col-md-8 lt-offset-md-2" id="main-content">
                                <div className="lt-new-request-form">
                                    <form id="new_request" className="request-form" onSubmit={handleSubmit}>
                                        <div className="form-field select optional request_ticket_form_id">
                                            <label htmlFor="enquiry-type">Please choose the topic below</label>
                                            <select
                                                id="enquiry-type"
                                                name="enquiryType"
                                                value={formData.enquiryType}
                                                onChange={handleChange}
                                            >
                                                <option value="fraud-scams">Fraud/Scams</option>
                                                <option value="social-media">Social Media Cases</option>
                                                <option value="other-cases">All other cases</option>
                                            </select>
                                        </div>

                                        <div className="form-field string required request_anonymous_requester_email">
                                            <label htmlFor="full-name">Your email address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="example@email.com"
                                                required
                                            />
                                        </div>

                                        <div className="form-field string required request_subject">
                                            <label htmlFor="full-name">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                id="full-name"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Full Name"
                                                required
                                            />
                                        </div>

                                        <div className="form-field string required request_custom_fields_360020611480">
                                            <label htmlFor="phone">Your Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+12 345 678 901"
                                                required
                                            />
                                        </div>

                                        <div className="form-field string required request_custom_fields_360020731939">
                                            <label htmlFor="country">Your Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                id="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                placeholder="Country"
                                                required
                                            />
                                        </div>

                                        <div className="form-field string request_custom_fields_360020731939">
                                            <label htmlFor="scam-website">Is there a scam website or company?</label>
                                            <input
                                                type="url"
                                                name="scamWebsite"
                                                id="scam-website"
                                                value={formData.scamWebsite}
                                                onChange={handleChange}
                                                placeholder="www.scam.com"
                                            />
                                        </div>

                                        <div className="form-field string request_custom_fields_360020611480">
                                            <label htmlFor="lost-money">Did you lose any money?</label>
                                            <input
                                                type="text"
                                                name="lostMoney"
                                                id="lost-money"
                                                value={formData.lostMoney}
                                                onChange={handleChange}
                                                placeholder="Amount"
                                            />
                                        </div>

                                        <div className="form-field text required request_description">
                                            <label htmlFor="message">Please explain what happened:</label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows="4"
                                                placeholder="Please explain what happened"
                                                required
                                            />
                                        </div>

                                        

                                        <footer>
                                            <button className='footer-button' type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? 'Sending...' : 'Send Enquiry Now'}
                                            </button>
                                        </footer>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </div>
            <Footer />
        </div>
    );
}

export default ContactUsNow;
