import { useState } from "react";
import { ArrowRight, BookOpen, Check, Filter, RotateCcw, Sparkles } from "lucide-react";
import type { PageId } from "../lib/content";
import { cn } from "../utils/cn";
import { LessonHeader } from "../components/ui";
import { CodeBlock } from "../components/CodeBlock";

type Category = "html" | "css" | "js";
type FilterValue = "all" | Category;

const categoryMeta: Record<Category, { label: string; dot: string; soft: string; text: string }> = {
  html: { label: "HTML", dot: "bg-coral", soft: "bg-coral-soft", text: "text-[#a84b27]" },
  css: { label: "CSS", dot: "bg-sky", soft: "bg-sky-soft", text: "text-[#2f6784]" },
  js: { label: "JavaScript", dot: "bg-sand", soft: "bg-sand-soft", text: "text-[#876713]" },
};

const snippets: {
  category: Category;
  title: string;
  code: string;
  note: string;
}[] = [
  {
    category: "html",
    title: "Главный заголовок",
    code: "<h1>Привет, мир!</h1>",
    note: "Один h1 на страницу. Для подзаголовков используй h2, h3 и так далее.",
  },
  {
    category: "html",
    title: "Абзац текста",
    code: "<p>Мой первый абзац.</p>",
    note: "Каждый абзац оборачивай в отдельный p. Браузер сам добавит отступы.",
  },
  {
    category: "html",
    title: "Ссылка",
    code: '<a href="https://example.com">Открыть сайт</a>',
    note: "В href — адрес, по которому перейдёт человек. Текст между тегами виден на странице.",
  },
  {
    category: "html",
    title: "Картинка",
    code: '<img src="photo.jpg" alt="Мой кот">',
    note: "src — путь к файлу, alt — описание. Если картинка не загрузится, alt покажет текст.",
  },
  {
    category: "html",
    title: "Список",
    code: "<ul>\n  <li>Первый пункт</li>\n  <li>Второй пункт</li>\n</ul>",
    note: "ul — весь список, li — один пункт. Вместо ul можно взять ol для нумерации.",
  },
  {
    category: "html",
    title: "Кнопка",
    code: '<button id="hello">Нажми</button>',
    note: "id нужен, чтобы JavaScript мог найти именно эту кнопку на странице.",
  },
  {
    category: "css",
    title: "Цвет текста",
    code: "h1 {\n  color: #152a20;\n}",
    note: "Селектор h1 выбирает заголовки, color меняет цвет их текста.",
  },
  {
    category: "css",
    title: "Фон и текст",
    code: ".card {\n  background: #d9f27e;\n  color: #123529;\n}",
    note: "Точка перед именем означает класс. Не забудь добавить class=\"card\" в HTML.",
  },
  {
    category: "css",
    title: "Отступы",
    code: ".card {\n  padding: 16px;\n  margin: 24px;\n}",
    note: "padding — пространство внутри, margin — расстояние до соседних элементов.",
  },
  {
    category: "css",
    title: "Рамка и скругление",
    code: ".card {\n  border: 1px solid #dfdacb;\n  border-radius: 16px;\n}",
    note: "solid — сплошная линия. 16px задаёт мягкое скругление углов.",
  },
  {
    category: "css",
    title: "Элементы в ряд",
    code: ".row {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}",
    note: "display: flex включает Flexbox, gap добавляет промежутки, align-items выравнивает.",
  },
  {
    category: "css",
    title: "Шрифт",
    code: "p {\n  font-size: 18px;\n  font-weight: 700;\n  font-family: sans-serif;\n}",
    note: "font-weight работает со значениями от 400 до 800, если шрифт их поддерживает.",
  },
  {
    category: "js",
    title: "Переменные",
    code: 'const name = "Кира";\nlet score = 0;\nscore = score + 1;',
    note: "const объявляем один раз, let можно менять. Знак = не сравнивает, а записывает.",
  },
  {
    category: "js",
    title: "Найти элемент",
    code: 'const button = document.querySelector("button");',
    note: "querySelector ищет первый элемент по CSS-селектору: тегу, классу или id.",
  },
  {
    category: "js",
    title: "Реакция на клик",
    code: 'button.addEventListener("click", () => {\n  button.textContent = "Привет!";\n});',
    note: "Первое — какое событие слушаем. Второе — функция, которая сработает.",
  },
  {
    category: "js",
    title: "Условие",
    code: 'if (score > 0) {\n  console.log("Уже есть результат!");\n}',
    note: "Код внутри скобок выполнится, только если условие score > 0 верное.",
  },
  {
    category: "js",
    title: "Функция",
    code: 'function greet(name) {\n  return "Привет, " + name + "!";\n}',
    note: "Функция — многоразовый рецепт. name здесь параметр, который передают при вызове.",
  },
  {
    category: "js",
    title: "Изменить текст",
    code: 'document.getElementById("score").textContent = 5;',
    note: "textContent заменяет содержимое элемента. Удобно для счётчиков и сообщений.",
  },
];

const debugSteps = [
  {
    title: "Проверь написание",
    text: "Имена классов, id и переменных чувствительны к регистру: hello и Hello — разные.",
  },
  {
    title: "Закрой всё",
    text: "Кавычки, скобки и теги должны иметь пару. Это самая частая причина поломки.",
  },
  {
    title: "Посмотри в консоль",
    text: "F12 → Console. Первая красная строка обычно указывает на настоящую причину.",
  },
  {
    title: "Упрости до минимума",
    text: "Убери подозрительный код и возвращай по частям. Так проблема становится заметной.",
  },
];

const filters: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Всё" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "js", label: "JavaScript" },
];

export function Cheatsheet({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const visible = filter === "all" ? snippets : snippets.filter((item) => item.category === filter);

  return (
    <div className="animate-rise">
      <LessonHeader
        chapter="Памятка · без домашки"
        title="Шпаргалка на каждый день"
        lead="Самые нужные команды в одном месте. Не учи наизусть: возвращайся, когда забудешь, находи нужное и копируй в свой проект."
        minutes={3}
        examples={snippets.length}
        tone="neutral"
        learn={[
          "Найдёшь команду за пару секунд",
          "Вспомнишь синтаксис без учебника",
          "Получишь план действий при ошибке",
        ]}
      />

      <div className="mt-8 sm:mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#d6e5ac] bg-lime-soft/70 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime text-forest">
              <Sparkles size={13} />
            </span>
            <p className="text-xs font-semibold text-forest">
              Главное правило: знать всё не обязательно.
            </p>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-wider text-[#65772a]">
            найди · пойми · примени
          </p>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-ink-soft" />
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
              фильтр
            </span>
          </div>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {filters.map((item) => {
              const active = filter === item.value;
              const count =
                item.value === "all"
                  ? snippets.length
                  : snippets.filter((snippet) => snippet.category === item.value).length;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] font-bold transition-colors",
                    active
                      ? "border-forest bg-forest text-paper"
                      : "border-line bg-paper-soft text-ink-soft hover:border-forest/25 hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "rounded px-1 font-mono text-[8px]",
                      active ? "bg-white/15 text-lime" : "bg-paper-deep text-ink-soft",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {visible.map((snippet) => {
            const meta = categoryMeta[snippet.category];
            return (
              <div
                key={snippet.title}
                className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-paper-soft p-3"
              >
                <div className="flex min-w-0 items-center justify-between gap-2 px-0.5 pb-2.5">
                  <h2 className="min-w-0 truncate text-xs font-bold text-ink">{snippet.title}</h2>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[8px] font-medium uppercase tracking-wider",
                      meta.soft,
                      meta.text,
                    )}
                  >
                    <span className={cn("h-1 w-1 rounded-full", meta.dot)} />
                    {meta.label}
                  </span>
                </div>
                <CodeBlock
                  code={snippet.code}
                  language={snippet.category}
                  label={
                    snippet.category === "js" ? "script.js" : `${snippet.category} · пример`
                  }
                  compact
                />
                <p className="mt-2.5 px-0.5 text-[10.5px] leading-relaxed text-ink-soft">
                  {snippet.note}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-dashed border-line bg-white/50 px-3.5 py-3">
          <BookOpen size={14} className="mt-0.5 shrink-0 text-ink-soft" />
          <p className="text-[11px] leading-relaxed text-ink-soft">
            <strong className="text-ink">Как читать примеры:</strong> HTML-код вставляй в{" "}
            <code className="font-mono text-ink">&lt;body&gt;</code>, CSS — в{" "}
            <code className="font-mono text-ink">&lt;style&gt;</code> внутри{" "}
            <code className="font-mono text-ink">&lt;head&gt;</code>, JavaScript — перед закрывающим{" "}
            <code className="font-mono text-ink">&lt;/body&gt;</code>. Кнопка «копировать» сохранит
            фрагмент целиком.
          </p>
        </div>

        <section className="mt-12 sm:mt-16">
          <div className="mb-5 flex items-center gap-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
              план спасения
            </span>
            <span className="h-px w-8 bg-line" />
          </div>
          <h2 className="font-display text-[1.45rem] font-semibold leading-[1.2] tracking-[-0.025em] text-ink sm:text-[1.75rem]">
            Если что-то сломалось
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Сломанная страница — нормальный этап. Сделай небольшую паузу и пройди по списку.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {debugSteps.map((step, index) => (
              <div key={step.title} className="flex gap-3 rounded-xl border border-line bg-paper-soft p-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper-deep font-mono text-[9px] font-bold text-ink-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">{step.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mt-12 overflow-hidden rounded-3xl bg-forest p-6 text-paper sm:mt-16 sm:p-8">
          <div
            className="grid-paper pointer-events-none absolute inset-0 opacity-20"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[120px] font-bold leading-none text-white/5 sm:text-[160px]"
            aria-hidden="true"
          >
            {"{}"}
          </span>
          <div className="relative max-w-lg">
            <div className="flex items-center gap-2">
              <Check size={12} className="text-lime" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-lime/80">
                база уже есть
              </span>
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.025em] sm:text-2xl">
              Теперь не идеально, а регулярно.
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-paper/65">
              Вернись к практике, поменяй одну деталь в проекте и попробуй объяснить её своими
              словами. Это и есть обучение.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate("practice")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-4 py-2.5 text-xs font-bold text-forest transition-colors hover:bg-lime/80"
              >
                К мини-проекту
                <ArrowRight size={13} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("start")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-bold text-paper transition-colors hover:bg-white/5"
              >
                <RotateCcw size={13} />
                В начало
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
