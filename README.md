# Кодбаза

Маленькая документация по HTML, CSS и JavaScript для новичков.

## Как запустить у себя

```bash
npm install
npm run dev
```

Открой адрес из терминала — обычно `http://localhost:5173`.

## Как выложить на Vercel

Нужен **весь проект**, не один `index.html`.

В репозитории обязательно должны быть:

- `package.json`
- `index.html`
- `vite.config.ts`
- `tsconfig.json`
- `vercel.json`
- папка `src/` со всеми файлами внутри

### 1. GitHub

Если репозиторий уже есть, залей все файлы проекта в корень (не в подпапку).

Проверь, что в корне GitHub виден `package.json`. Если он лежит внутри другой папки — Vercel не соберёт сайт.

### 2. Vercel

1. Зайди на [vercel.com](https://vercel.com) и войди через GitHub.
2. **Add New… → Project**.
3. Выбери этот репозиторий.
4. Настройки оставь такими:

   - **Framework Preset:** Vite
   - **Root Directory:** пусто (корень репозитория)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. Нажми **Deploy**.

Готовый адрес будет вида `https://твой-проект.vercel.app`.

## Если снова ошибка

Самые частые причины:

1. **No Output Directory named "build"**  
   В настройках проекта Vercel поставь **Output Directory = `dist`**, не `build` и не `public`. Потом **Redeploy**.

2. **Command "vite" not found**  
   Значит, на GitHub нет `package.json` или файлы лежат во вложенной папке. Root Directory должен быть корнем проекта.

3. **Build failed / Type error**  
   В Vercel открой **Building** у упавшего деплоя — там красная строка с настоящей причиной. Скрин этой строки проще всего искать.

4. Залит только `index.html`  
   Один HTML-файл Vercel не соберёт: это React + Vite, нужен весь проект.
