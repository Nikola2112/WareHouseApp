import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Локалізації: українська (основна) + англійська.
 * За замовчуванням застосунок запускається українською.
 */
const resources = {
    uk: {
        translation: {
            nav: {
                wms: 'Складська система',
                projects: 'Проєкти',
                about: 'Про нас',
                contacts: 'Контакти',
            },
            phone: '+380 67 123-45-67',
            cta: 'Отримати КП',
            login: 'Увійти',
            logout: 'Вийти',
            productList: 'Список товарів',
            addProduct: 'Додати товар',
        },
    },
    en: {
        translation: {
            nav: {
                wms: 'WareHouse system',
                projects: 'Projects',
                about: 'About us',
                contacts: 'Contacts',
            },
            phone: '+380 67 123-45-67',
            cta: 'Get proposal',
            login: 'Login',
            logout: 'Logout',
            productList: 'Products',
            addProduct: 'Add product',
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'uk',           // мова за замовчуванням
    fallbackLng: 'uk',   // резервна мова
    interpolation: { escapeValue: false },
});

export default i18n;