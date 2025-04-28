import { useState, useMemo } from 'react';
import './ProjectsPage.css';
import projects from './projects';

export default function ProjectsPage() {
    /* підрахунок кількості проєктів у кожній галузі */
    const categories = useMemo(() => {
        const map = new Map();
        projects.forEach(({ cat }) => map.set(cat, (map.get(cat) || 0) + 1));
        return Array.from(map.entries());  // [ ['Автозапчастини', 3], ... ]
    }, []);

    const [open, setOpen] = useState(false);   // показ/приховати панель «Галузі»

    return (
        <section className="projects">
            <div className="projects__inner">
                <h1 className="projects__title">
                    200+ масштабних проєктів<br />автоматизації складської логістики
                </h1>

                {/* КНОПКА «Галузі» */}
                <button
                    type="button"
                    className={`projects__btn ${open ? 'projects__btn--active' : ''}`}
                    onClick={() => setOpen(!open)}
                >
                    Галузі
                </button>

                {/* ПАНЕЛЬ ГАЛУЗЕЙ */}
                {open && (
                    <ul className="categories">
                        <li className="cat">
                            <span className="cat__label cat__label--active">Усі</span>
                            <span className="cat__count">{projects.length}</span>
                        </li>

                        {categories.map(([label, count]) => (
                            <li key={label} className="cat">
                                {/* ⬇️ при бажанні замініть на React-іконку або <img src="..."/> */}
                                <span className="cat__icon" aria-hidden="true">🎯</span>
                                <span className="cat__label">{label}</span>
                                <span className="cat__count">{count}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* СІТКА ПРОЄКТІВ */}
                <div className="projects__grid">
                    {projects.map(({ title, desc, cat, img }) => (
                        <article key={title} className="card">
                            <img className="card__img" src={img} alt={title} loading="lazy" />
                            <div className="card__overlay">
                                <h3 className="card__title">{title}</h3>
                                <p className="card__desc">{desc}</p>
                                <p className="card__cat">{cat}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}