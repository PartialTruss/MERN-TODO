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
        Email: "ایمیل",
        Password: "رمز عبور",
        Login: "ورود",
        "Logging...": "...ورود",
        "Enter your password": "رمز عبور خود را وارد کنید",
        "Enter your Email": "ایمیل خود را وارد کنید",
        "No Account?": "حساب ندارید؟",
        "Create one!": "ایجاد کنید!",
        Home: "خانه",
        "New Task": "وظیفه جدید",
        All: "همه",
        Completed: "تکمیل شده",
        "Not Completed": "تکمیل نشده",
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
        "Daily quotes are here!": "نقل قول های روزانه !",
        Mark: "نشان کردن",
        "In Progress": "در حال انجام",
        Starred: "مورد علاقه",
        Tasks: "وظایف",
        Delete: "حذف",
        Archive: "آرشیو",
        "Add new task": "اضافه کردن تسک جدید",
        "Task Title": "عنوان",
        "Task Detail": "جزییات تسک",
        Save: "ذخیره",
        Cancel: "لغو",
        "Select Date": "",
        "Due Time": "",
        Description: "توضیحات ",
        "No archived tasks available": "داده ای در آرشیو موجود نیست.",
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
