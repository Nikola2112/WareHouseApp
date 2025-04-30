import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
    return (
        <div className="contact-container">
            <div className="contact-content">
                <h1>Контактна інформація</h1>
                <div className="contact-info">
                    <h2>Телефон</h2>
                    <p className="phone-number">+380 675 504-39-0</p>
                    <p>Єдиний контактний номер</p>
                </div>
                <div className="contact-info">
                    <h2>Email</h2>
                    <p><a href="mailto:info@topua.ua">info@toplogua.ua</a></p>
                    <p>Загальний контакт для питань</p>
                </div>
                <div className="contact-info">
                    <h2>Технічна підтримка</h2>
                    <p><a href="mailto:support@topua.ua">support@topua.ua</a></p>
                    <p>Технічна підтримка клієнтів</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

