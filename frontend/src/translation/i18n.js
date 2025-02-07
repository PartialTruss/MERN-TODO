import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Language: "Language",
        Default: "Default",
        Persian: "فارسی",
        Connect: "Connect",
        Github: "Find me on Github",
        Linkedin: "Checkout my Linkedin",
        Instagram: "Follow me on Instagram",
      },
    },
    fa: {
      translation: {
        Home: "خانه",
        "New Task": "وظیفه جدید",
        Quotes: "نقل قول ها",
        Statistics: "آمار",
        Archives: "آرشیو",
        Settings: "تنظیمات",
        Language: "زبان",
        Default: "English",
        Persian: "فارسی",
        Connect: "ارتباط",
        Github: "من را در گیت هاب پیدا کنید",
        Linkedin: "لینکدین من را ببینید",
        Instagram: "در اینستاگرام دنبال کنید",
        "Sign out": "خروج از حساب کاربری",
        Login: "ورود",
        "Sign Up": "عضویت",
        Detail: "جزییات",
        Mark: "نشان کردن",
        Completed: "تکمیل شده",
        "In Progress": "در حال انجام",
        Starred: "مورد علاقه",
        Tasks: "وظایف",
        "No archived tasks available": "هیچ وظیفه‌ای در آرشیو موجود نیست.",
      },
    },
  },
  lng: localStorage.getItem("language") || "en", // Set default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
