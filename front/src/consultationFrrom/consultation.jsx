import React, { useState } from 'react';
import './consultation.css'; // Подключение стилей

export default function ConsultationPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        question: '',
        additionalQuestion: '', // Новый вопрос
    });

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Дякуємо! Форма відправлена.');
        setForm({ name: '', company: '', phone: '', email: '', question: '', additionalQuestion: '' });
        setStep(1); // Сбросить шаги после отправки
    };

    const nextStep = () => {
        setStep(2);
    };

    return (
        <div className="tabs">
            <div className="items-block">
                <div className="text">
                    Закажите консультацию по автоматизации склада!
                    <br />
                    Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время.
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Этап 1 */}
                    {step === 1 && (
                        <div className="form">
                            <div className="form-input">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Ваше имя"
                                    required
                                />
                                <label>Ваше имя</label>
                            </div>
                            <div className="form-input">
                                <input
                                    type="text"
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    placeholder="Организация"
                                />
                                <label>Организация</label>
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
                                    placeholder="Эл. почта"
                                    required
                                />
                                <label>Эл. почта</label>
                            </div>
                            <button
                                type="button"
                                className="next-step-btn"
                                onClick={nextStep}
                            >
                                Далее
                            </button>
                        </div>
                    )}

                    {/* Этап 2 */}
                    {step === 2 && (
                        <div className="form">
                            <div className="form-input comment">
                                <label>Ваш вопрос</label>
                                <textarea
                                    name="question"
                                    value={form.question}
                                    onChange={handleChange}
                                    placeholder="Ваш вопрос"
                                />
                            </div>
                        </div>
                    )}
                </form>
                <div className="note">
                    Нажимая на кнопку, вы даете согласие на обработку своих персональных данных
                    и соглашаетесь с политикой конфиденциальности.
                </div>
            </div>
        </div>
    );
}