export type PageId = "start" | "html" | "css" | "js" | "practice" | "cheatsheet";

export type Tone = "html" | "css" | "js" | "practice" | "neutral";

export type PageMeta = {
  id: PageId;
  chapter: string;
  title: string;
  navTitle: string;
  description: string;
  tone: Tone;
  minutes: number;
  examples: number;
};

export const LESSONS: PageId[] = ["html", "css", "js", "practice"];

export const PAGES: Record<PageId, PageMeta> = {
  start: {
    id: "start",
    chapter: "Старт",
    title: "С нуля: как устроен сайт",
    navTitle: "Старт",
    description: "Короткий маршрут без сложных слов",
    tone: "neutral",
    minutes: 4,
    examples: 0,
  },
  html: {
    id: "html",
    chapter: "Глава 01",
    title: "HTML: скелет любой страницы",
    navTitle: "HTML",
    description: "Структура, теги и первый текст",
    tone: "html",
    minutes: 6,
    examples: 5,
  },
  css: {
    id: "css",
    chapter: "Глава 02",
    title: "CSS: одеваем страницу",
    navTitle: "CSS",
    description: "Цвета, отступы и оформление",
    tone: "css",
    minutes: 7,
    examples: 4,
  },
  js: {
    id: "js",
    chapter: "Глава 03",
    title: "JavaScript: добавляем жизнь",
    navTitle: "JavaScript",
    description: "Переменные, клики и реакции",
    tone: "js",
    minutes: 8,
    examples: 4,
  },
  practice: {
    id: "practice",
    chapter: "Практика",
    title: "Мини-проект: страница о себе",
    navTitle: "Мини-проект",
    description: "Собираем всё в один сайт",
    tone: "practice",
    minutes: 15,
    examples: 4,
  },
  cheatsheet: {
    id: "cheatsheet",
    chapter: "Памятка",
    title: "Шпаргалка на каждый день",
    navTitle: "Шпаргалка",
    description: "Готовые команды под рукой",
    tone: "neutral",
    minutes: 3,
    examples: 18,
  },
};

export const NAV_GROUPS: { label: string; items: PageId[] }[] = [
  { label: "Начало", items: ["start"] },
  { label: "Основы", items: ["html", "css", "js"] },
  { label: "Дальше", items: ["practice", "cheatsheet"] },
];

export type SearchEntry = {
  page: PageId;
  title: string;
  hint: string;
  chapter: string;
};

export const SEARCH_INDEX: SearchEntry[] = [
  {
    page: "start",
    title: "С чего начать",
    hint: "Маршрут обучения и три главных технологии",
    chapter: "Старт",
  },
  {
    page: "start",
    title: "Java и JavaScript — не одно и то же",
    hint: "Чем отличаются два языка и что учить для сайтов",
    chapter: "Старт",
  },
  {
    page: "html",
    title: "Как устроен тег",
    hint: "Открывающий тег, содержимое, атрибуты и закрывающий тег",
    chapter: "Глава 01 · HTML",
  },
  {
    page: "html",
    title: "Страница изнутри",
    hint: "doctype, head, body и готовая html-страница",
    chapter: "Глава 01 · HTML",
  },
  {
    page: "html",
    title: "Семь базовых тегов",
    hint: "h1, p, a, img, ul, button и div простыми словами",
    chapter: "Глава 01 · HTML",
  },
  {
    page: "css",
    title: "Правило CSS: селектор, свойство, значение",
    hint: "Как устроен и куда вставляется CSS",
    chapter: "Глава 02 · CSS",
  },
  {
    page: "css",
    title: "Цвета и отступы",
    hint: "HEX-коды, коробочная модель, padding и margin",
    chapter: "Глава 02 · CSS",
  },
  {
    page: "css",
    title: "Flexbox в двух словах",
    hint: "Как поставить элементы в ряд и выровнять их",
    chapter: "Глава 02 · CSS",
  },
  {
    page: "js",
    title: "Первая реакция на клик",
    hint: "querySelector, addEventListener и живая кнопка",
    chapter: "Глава 03 · JavaScript",
  },
  {
    page: "js",
    title: "Переменные, условия и функции",
    hint: "Три кита JavaScript для новичка",
    chapter: "Глава 03 · JavaScript",
  },
  {
    page: "js",
    title: "Живой счётчик",
    hint: "Простой JS-проект и разбор каждой строки",
    chapter: "Глава 03 · JavaScript",
  },
  {
    page: "practice",
    title: "Собери страницу о себе",
    hint: "Пошаговый мини-проект из HTML, CSS и JavaScript",
    chapter: "Практика",
  },
  {
    page: "cheatsheet",
    title: "Шпаргалка по HTML, CSS и JS",
    hint: "Готовые команды с копированием",
    chapter: "Памятка",
  },
];
