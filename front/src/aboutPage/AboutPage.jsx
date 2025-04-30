import './AboutPage.css';
import ware from '../img/ware3.png';

export default function AboutPage() {
    return (
        <section
            className="about-hero"
            /* 👉 підставте власний шлях до зображення */
            style={{ backgroundImage: `url(${ware})` }}
        >
            <div className="about__content">
                <h1 className="about__title">Компанія&nbsp;Топлог</h1>

                <p className="about__lead">
                    Компанія&nbsp;«Топлог» — український розробник складських систем класу.
                    Працюємо на ринку автоматизації складської логістики
                    із 2009 року. Географія реалізованих проєктів охоплює Україну.
                    Автоматизовано понад 200 складів із різною галузевою специфікою.
                    «Топлог» внесена до Реєстру акредитованих ІТ-компаній Мінцифри.
                </p>

                <div className="about__stats">
                    <div className="stat">
                        <span className="stat__num">15</span>
                        <span className="stat__txt">років плідної роботи</span>
                    </div>
                    <div className="stat">
                        <span className="stat__num">200+</span>
                        <span className="stat__txt">автоматизованих складів</span>
                    </div>
                    <div className="stat">
                        <span className="stat__num">50</span>
                        <span className="stat__txt">професіоналів у штаті</span>
                    </div>
                </div>

                <a href="/projects" className="about__btn">Наші проєкти</a>
            </div>
        </section>
    );
}