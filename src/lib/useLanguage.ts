"use client";

import { useEffect, useState } from "react";
import { Lang, translations } from "./translations";

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>("ro");

  useEffect(() => {
    const savedLang = localStorage.getItem("luxfans_lang") as Lang | null;

    if (savedLang === "ro" || savedLang === "en" || savedLang === "es") {
      setLangState(savedLang);
    }
  }, []);

  function setLang(newLang: Lang) {
    localStorage.setItem("luxfans_lang", newLang);
    setLangState(newLang);
    window.dispatchEvent(new Event("language-change"));
  }

  useEffect(() => {
    function updateLang() {
      const savedLang = localStorage.getItem("luxfans_lang") as Lang | null;
      if (savedLang === "ro" || savedLang === "en" || savedLang === "es") {
        setLangState(savedLang);
      }
    }

    window.addEventListener("language-change", updateLang);
    return () => window.removeEventListener("language-change", updateLang);
  }, []);

  return {
    lang,
    setLang,
    t: translations[lang],
  };
}