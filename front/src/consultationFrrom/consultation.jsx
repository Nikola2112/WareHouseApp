import React, { useState, useEffect } from 'react';
import './consultation.css'; // Підключення стилів

export default function ConsultationPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        question: '',
        additionalQuestion: '',
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const savedForm = localStorage.getItem('consultationForm');
        if (savedForm) {
            setForm(JSON.parse(savedForm));
        }
    }, []);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('consultationForm', JSON.stringify(form));
        setSubmitted(true);

        // Затримка для відображення повідомлення 3 секунди
        setTimeout(() => {
            setForm({ name: '', company: '', phone: '', email: '', question: '', additionalQuestion: '' });
            setStep(1);
            setSubmitted(false);
        }, 3000);
    };

    const nextStep = () => {
        setStep(2);
    };

    return (
        <div className="tabs">
            <div className="items-block">
                <div className="text">
                    Замовте консультацію з автоматизації складу!
                    <br />
                    Залиште свої контактні дані, і ми зв’яжемося з вами найближчим часом.
                </div>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="form">
                            <div className="form-input">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Ваше ім’я"
                                    required
                                />
                                <label>Ваше ім’я</label>
                            </div>
                            <div className="form-input">
                                <input
                                    type="text"
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    placeholder="Організація"
                                />
                                <label>Організація</label>
                            </div>
                            <div className="form-input">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Телефон"
                                    required
                                />
                                <label>Телефон</label>
                            </div>
                            <div className="form-input">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Ел. пошта"
                                    required
                                />
                                <label>Ел. пошта</label>
                            </div>
                            <button
                                type="button"
                                className="next-step-btn"
                                onClick={nextStep}
                            >
                                Далі
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form">
                            <div className="form-input comment">
                                <label>Ваше питання</label>
                                <textarea
                                    name="question"
                                    value={form.question}
                                    onChange={handleChange}
                                    placeholder="Ваше питання"
                                    rows={5}
                                    required
                                />
                            </div>
                            {!submitted ? (
                                <button type="submit" className="submit-btn">
                                    Відправити
                                </button>
                            ) : (
                                <div className="form-sent-message" style={{ color: 'green', marginTop: '10px' }}>
                                    Форма успішно відправлена!
                                </div>
                            )}
                        </div>
                    )}
                </form>
                <div className="note">
                    Натискаючи на кнопку, ви даєте згоду на обробку своїх персональних даних
                    і погоджуєтесь з політикою конфіденційності.
                </div>
            </div>
        </div>
    );
}