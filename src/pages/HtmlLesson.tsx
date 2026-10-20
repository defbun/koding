import {
  ArrowRight,
  Box,
  Check,
  Code2,
  FileText,
  Image,
  Link2,
  List,
  MousePointerClick,
  Tag,
} from "lucide-react";
import type { PageId } from "../lib/content";
import { Callout, DemoFrame, LessonFooter, LessonHeader, SectionHeading } from "../components/ui";
import { CodeBlock } from "../components/CodeBlock";
import { Playground } from "../components/Playground";
import { Quiz } from "../components/Quiz";

const firstPage = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Мой первый сайт</title>
  </head>
  <body>
    <h1>Привет, мир!</h1>
    <p>Это моя первая страница.</p>
    <button>Нажми на меня</button>
  </body>
</html>`;

const linkExample = `<a href="https://example.com">Открыть сайт</a>`;

const tags = [
  {
    tag: "<h1>",
    name: "Заголовок",
    description: "Главная мысль страницы. Есть ещё h2–h6 для заголовков поменьше.",
    example: "<h1>Мой сайт</h1>",
    Icon: FileText,
  },
  {
    tag: "<p>",
    name: "Абзац",
    description: "Обычный текст. Один тег — один абзац, как в книге.",
    example: "<p>Немного текста</p>",
    Icon: FileText,
  },
  {
    tag: "<a>",
    name: "Ссылка",
    description: "Ведёт на другую страницу. Куда именно — подсказывает атрибут href.",
    example: '<a href="https://ya.ru">Яндекс</a>',
    Icon: Link2,
  },
  {
    tag: "<img>",
    name: "Картинка",
    description: "Показывает изображение. В src — путь к файлу, в alt — описание.",
    example: '<img src="photo.jpg" alt="Мой кот">',
    Icon: Image,
  },
  {
    tag: "<ul> + <li>",
    name: "Список",
    description: "ul — весь список, li — один пункт внутри него.",
    example: "<ul><li>Первый пункт</li></ul>",
    Icon: List,
  },
  {
    tag: "<button>",
    name: "Кнопка",
    description: "Кликабельный элемент. Позже JavaScript научит её реагировать.",
    example: "<button>Нажми</button>",
    Icon: MousePointerClick,
  },
  {
    tag: "<div>",
    name: "Контейнер",
    description: "Невидимая коробка, чтобы сгруппировать всё нужное вместе.",
    example: '<div class="card">...</div>',
    Icon: Box,
  },
];

const playgroundHtml = `<main class="card">
  <p class="label">мой первый сайт</p>
  <h1>Привет, я Кира</h1>
  <p>Учусь кодить и собираю страницу о себе.</p>
  <button>Поздороваться</button>
</main>`;

const playgroundCss = `body {
  display: grid;
  place-items: center;
  min-height: 80vh;
  background: #f5f2e9;
}

.card {
  max-width: 330px;
  padding: 26px;
  border: 1px solid #dfdacb;
  border-radius: 18px;
  background: #ffffff;
}

.label {
  font-family: monospace;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #5b6a61;
}

h1 {
  margin: 10px 0 8px;
  font-size: 26px;
  line-height: 1.2;
}

p {
  color: #5b6a61;
  line-height: 1.6;
}

button {
  margin-top: 8px;
  padding: 10px 16px;
  border: 0;
  border-radius: 8px;
  background: #123529;
  color: #f5f2e9;
  font-weight: 700;
}`;

const playgroundJs = `const button = document.querySelector("button");

button.addEventListener("click", () => {
  button.textContent = "Привет! 👋";
});`;

export function HtmlLesson({
  done,
  onToggle,
  onNavigate,
}: {
  done: boolean;
  onToggle: () => void;
  onNavigate: (page: PageId) => void;
}) {
  return (
    <div className="animate-rise">
      <LessonHeader
        chapter="Глава 01 · HTML"
        title="HTML: скелет любой страницы"
        lead="HTML говорит браузеру, что здесь заголовок, тут текст, а вот кнопка. Это не программирование, а разметка — как подписать коробки перед переездом."
        minutes={6}
        examples={5}
        tone="html"
        learn={[
          "Поймёшь, как устроен тег и атрибут",
          "Соберёшь полноценную HTML-страницу",
          "Запомнишь семь базовых тегов",
        ]}
      />

      <div className="mt-8 space-y-12 sm:mt-10 sm:space-y-16">
        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div>
            <SectionHeading
              kicker="01 · главная идея"
              title="Размечаем, а не программируем"
              className="mb-3"
            />
            <div className="space-y-3 text-sm leading-relaxed text-ink-soft sm:text-[15px]">
              <p>
                Когда ты открываешь сайт, браузер читает текстовый файл с командами. Эти команды
                называются <strong className="font-semibold text-ink">тегами</strong>. Они ничего
                не считают — они объясняют, что находится на странице.
              </p>
              <p>
                HTML — это <strong className="font-semibold text-ink">язык разметки</strong>.
                Сравни его со скелетом: он задаёт основу, но пока не решает, какого цвета будут
                стены.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white/60 p-4 sm:p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">
              один сайт — три слоя
            </p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3 rounded-xl border border-[#efc3b0] bg-coral-soft px-3 py-2.5">
                <Code2 size={16} className="text-[#a84b27]" />
                <div>
                  <p className="text-xs font-bold text-ink">HTML — стены</p>
                  <p className="text-[10px] text-ink-soft">что здесь находится</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#bcd9e6] bg-sky-soft px-3 py-2.5">
                <span className="h-4 w-4 rounded-full border-2 border-[#2f6784]" />
                <div>
                  <p className="text-xs font-bold text-ink">CSS — обои</p>
                  <p className="text-[10px] text-ink-soft">как это выглядит</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#e6d49d] bg-sand-soft px-3 py-2.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sand text-forest">
                  <span className="text-[8px] font-bold">JS</span>
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">JavaScript — свет</p>
                  <p className="text-[10px] text-ink-soft">как это реагирует</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="02 · устройство"
            title="Тег — это команда в угловых скобках"
            description="У большинства тегов есть открытие и закрытие. Внутри стоит содержимое — текст или другие теги."
          />

          <div className="rounded-3xl border border-line bg-paper-soft p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <span className="rounded-lg border border-[#efc3b0] bg-coral-soft px-2.5 py-2 font-mono text-sm font-medium text-[#a84b27] sm:px-3 sm:text-lg">
                &lt;h1&gt;
              </span>
              <span className="rounded-lg border border-[#d6e5ac] bg-lime-soft px-2.5 py-2 font-mono text-sm text-forest sm:px-3 sm:text-lg">
                Привет, мир!
              </span>
              <span className="rounded-lg border border-[#efc3b0] bg-coral-soft px-2.5 py-2 font-mono text-sm font-medium text-[#a84b27] sm:px-3 sm:text-lg">
                &lt;/h1&gt;
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#a84b27] sm:text-[10px]">
                открывающий
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#65772a] sm:text-[10px]">
                содержимое
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#a84b27] sm:text-[10px]">
                закрывающий
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-ink-soft">
                Браузер не покажет сами теги — он покажет результат:
              </p>
              <div className="rounded-lg border border-line bg-white px-4 py-2">
                <span className="font-display text-base font-semibold text-ink">Привет, мир!</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white/60 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <Tag size={15} className="text-[#a84b27]" />
                <h3 className="text-sm font-bold text-ink">Атрибуты дают подробности</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                Это дополнительная настройка внутри открывающего тега. Например, ссылке нужно
                знать, куда вести:
              </p>
              <div className="mt-3">
                <CodeBlock code={linkExample} language="html" label="html" compact />
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-ink-soft">
                <code className="rounded bg-paper-deep px-1.5 py-0.5 font-mono text-[10px] text-ink">
                  href
                </code>{" "}
                — адрес. Без него ссылка будет никуда не вести.
              </p>
            </div>

            <div className="flex min-w-0 flex-col gap-3">
              <Callout variant="warn" title="Не забудь закрыть тег">
                Если открыл <code>&lt;p&gt;</code>, не забудь про <code>&lt;/p&gt;</code>. Браузер
                может догадаться, но лучше не проверять его терпение.
              </Callout>
              <Callout variant="note" title="Не все теги закрываются">
                У картинки <code>&lt;img&gt;</code> нет пары: она просто показывает файл. Такие
                теги называют одиночными.
              </Callout>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="03 · первая страница"
            title="Страница изнутри"
            description="Вот минимальный набор, с которого начинается почти любой сайт. Пока не нужно запоминать всё — просто посмотри на три части."
          />

          <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <CodeBlock code={firstPage} language="html" label="index.html" />
            <div className="space-y-3">
              <DemoFrame url="первый-сайт.html" label="результат">
                <div className="p-4 sm:p-5">
                  <h1 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    Привет, мир!
                  </h1>
                  <p className="mt-2 text-sm text-ink-soft">Это моя первая страница.</p>
                  <button
                    type="button"
                    className="mt-4 rounded-lg bg-forest px-3.5 py-2 text-xs font-bold text-paper"
                  >
                    Нажми на меня
                  </button>
                </div>
              </DemoFrame>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-line bg-white/60 p-3">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">
                    &lt;head&gt;
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-ink">Для браузера</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-ink-soft">
                    кодировка, имя вкладки, подключение стилей
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-white/60 p-3">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">
                    &lt;body&gt;
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-ink">Для человека</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-ink-soft">
                    всё, что видно в окне страницы
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="04 · словарь"
            title="Семь тегов, которых хватит на старт"
            description="Не учи список наизусть. Просто попробуй каждый в песочнице ниже — руки запоминают лучше головы."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {tags.map((item) => (
              <div
                key={item.tag}
                className="rounded-2xl border border-line bg-paper-soft p-4 transition-colors hover:bg-white/70"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-coral-soft text-[#a84b27]">
                      <item.Icon size={14} />
                    </span>
                    <code className="font-mono text-[11px] font-medium text-[#a84b27]">
                      {item.tag}
                    </code>
                  </div>
                  <span className="text-[11px] font-bold text-ink">{item.name}</span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">{item.description}</p>
                <div className="mt-2.5 overflow-x-auto rounded-lg border border-line bg-white/70 px-2.5 py-1.5">
                  <code className="whitespace-nowrap font-mono text-[10px] text-ink/75">
                    {item.example}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="05 · правила"
            title="Три привычки, которые спасут"
            description="Ошибки в HTML почти всегда простые. Проверяй эти три вещи — и страница не развалится."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Закрывай теги",
                text: "Открыл — закрой. Особенно внимательно с вложенными блоками.",
                example: "<p>Привет</p>",
              },
              {
                title: "Соблюдай порядок",
                text: "Тег, открытый последним, закрывается первым.",
                example: "<div><p>ok</p></div>",
              },
              {
                title: "Подписывай картинки",
                text: "Атрибут alt покажет текст, если изображение не загрузилось.",
                example: 'alt="Мой кот"',
              },
            ].map((rule, index) => (
              <div key={rule.title} className="rounded-2xl border border-line bg-white/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-medium text-ink-soft">
                    0{index + 1}
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime text-forest">
                    <Check size={11} strokeWidth={3} />
                  </span>
                </div>
                <p className="mt-2.5 text-sm font-bold text-ink">{rule.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">{rule.text}</p>
                <code className="mt-3 block overflow-x-auto rounded-md bg-forest px-2.5 py-1.5 font-mono text-[10px] text-lime/85">
                  {rule.example}
                </code>
              </div>
            ))}
          </div>
          <div className="mt-3.5">
            <Callout variant="warn" title="Классическая ошибка новичка">
              Заголовок открыли как <code>&lt;h1&gt;</code>, а закрыли как{" "}
              <code>&lt;/h2&gt;</code>. Теги должны совпадать — и по названию, и по косой черте.
            </Callout>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="06 · практика"
            title="Попробуй сам — прямо здесь"
            description="Поменяй имя в заголовке, добавь абзац или кнопку. Результат справа обновится через мгновение."
          />
          <Playground initialHtml={playgroundHtml} initialCss={playgroundCss} initialJs={playgroundJs} />
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-dashed border-line bg-paper-soft px-3.5 py-2.5">
            <span className="mt-0.5">
              <ArrowRight size={13} className="text-[#65772a]" />
            </span>
            <p className="text-[11px] leading-relaxed text-ink-soft">
              <strong className="text-ink">Мини-задание:</strong> замени «Кира» на своё имя,
              поменяй цвет фона у <code className="font-mono text-ink">.card</code> и добавь второй
              абзац с любимым занятием.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="07 · самопроверка"
            title="Закрепим без занудства"
            description="Три коротких вопроса. Если ошибёшься — это просто повод вернуться к примеру."
          />
          <Quiz
            questions={[
              {
                question: "Какой тег делает главный заголовок страницы?",
                options: ["<title>", "<h1>", "<p>"],
                correct: 1,
                explanation:
                  "<h1> — главный заголовок. <title> задаёт имя вкладки, а <p> создаёт обычный абзац.",
              },
              {
                question: "Где находится текст, который видит пользователь?",
                options: ["В <head>", "В <body>", "В <meta>"],
                correct: 1,
                explanation:
                  "<body> — видимая часть страницы. <head> хранит служебную информацию для браузера.",
              },
              {
                question: "Что делает атрибут href у ссылки?",
                options: ["Указывает адрес перехода", "Меняет цвет ссылки", "Добавляет картинку"],
                correct: 0,
                explanation:
                  "href подсказывает браузеру, куда вести пользователя. Цвет меняет уже CSS.",
              },
            ]}
          />
        </section>
      </div>

      <LessonFooter
        done={done}
        onToggle={onToggle}
        onNavigate={onNavigate}
        prev="start"
        next="css"
      />
    </div>
  );
}
