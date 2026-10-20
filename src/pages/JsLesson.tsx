import { useState } from "react";
import {
  Blocks,
  Check,
  GitBranch,
  MousePointerClick,
  Plus,
  RotateCcw,
  Sparkles,
  Terminal,
  Variable,
} from "lucide-react";
import type { PageId } from "../lib/content";
import { Callout, LessonFooter, LessonHeader, SectionHeading } from "../components/ui";
import { CodeBlock } from "../components/CodeBlock";
import { Playground } from "../components/Playground";
import { Quiz } from "../components/Quiz";

const clickCode = `const button = document.querySelector("button");

button.addEventListener("click", () => {
  button.textContent = "Привет! 👋";
});`;

const counterCode = `let score = 0;
const scoreElement = document.getElementById("score");
const plusButton = document.getElementById("plus");

plusButton.onclick = () => {
  score = score + 1;
  scoreElement.textContent = score;
};`;

const playgroundHtml = `<main class="card">
  <p class="label">javascript</p>
  <h1 id="title">Привет!</h1>
  <p>Нажми на кнопку — текст изменится.</p>
  <button id="magic">Что произойдёт?</button>
</main>`;

const playgroundCss = `body {
  display: grid;
  place-items: center;
  min-height: 80vh;
  background: #f5f2e9;
}

.card {
  width: 300px;
  padding: 24px;
  border: 1px solid #dfdacb;
  border-radius: 18px;
  background: #ffffff;
}

.label {
  margin: 0;
  font-family: monospace;
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #5b6a61;
}

h1 {
  margin: 10px 0 8px;
  font-size: 25px;
  line-height: 1.2;
}

p {
  color: #5b6a61;
  font-size: 13px;
  line-height: 1.6;
}

button {
  margin-top: 8px;
  padding: 10px 14px;
  border: 0;
  border-radius: 8px;
  background: #123529;
  color: #d9f27e;
  font-size: 12px;
  font-weight: 700;
}`;

const playgroundJs = `const title = document.getElementById("title");
const button = document.getElementById("magic");

button.addEventListener("click", () => {
  title.textContent = "JavaScript работает!";
  button.textContent = "Ещё раз!";
});`;

function ClickDemo() {
  const [clicks, setClicks] = useState(0);
  const [greeted, setGreeted] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper-soft">
      <div className="flex items-center justify-between gap-2 border-b border-line px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8fae3e]" />
          пример работает
        </span>
        <button
          type="button"
          onClick={() => {
            setClicks(0);
            setGreeted(false);
          }}
          className="inline-flex items-center gap-1 font-mono text-[9px] text-ink-soft transition-colors hover:text-ink"
        >
          <RotateCcw size={10} />
          сначала
        </button>
      </div>
      <div className="flex min-h-[210px] flex-col items-center justify-center gap-4 bg-gradient-to-br from-paper to-sky-soft/50 p-6">
        <div className="rounded-full border border-line bg-white/80 px-2.5 py-1 font-mono text-[9px] text-ink-soft">
          карточка с острова «твой браузер»
        </div>
        <button
          type="button"
          onClick={() => {
            setClicks((value) => value + 1);
            setGreeted(true);
          }}
          className="group relative rounded-xl bg-forest px-5 py-3 text-sm font-bold text-paper shadow-[0_10px_25px_-15px_rgba(18,53,41,0.8)] transition-transform active:scale-95"
        >
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-lime text-forest">
            <MousePointerClick size={11} />
          </span>
          Нажми на меня
        </button>
        <p
          className="min-h-[20px] text-center text-xs font-semibold text-ink"
          aria-live="polite"
        >
          {greeted ? (
            <span className="animate-soft-pop inline-block rounded-md bg-lime-soft px-2.5 py-1 text-forest">
              {clicks === 1
                ? "Привет! Ты только что запустил JavaScript."
                : `Привет ещё раз! Кликов: ${clicks}.`}
            </span>
          ) : (
            <span className="text-ink-soft">Пока ничего не произошло…</span>
          )}
        </p>
      </div>
    </div>
  );
}

function CounterDemo() {
  const [score, setScore] = useState(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line bg-paper-soft px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
          <Terminal size={10} />
          живой счётчик
        </span>
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
          <span className="h-1.5 w-1.5 rounded-full bg-sand" />
          <span className="h-1.5 w-1.5 rounded-full bg-sky" />
        </span>
      </div>
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 bg-sand-soft/35 p-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">
          твои клики
        </p>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-white shadow-sm">
          <span className="font-display text-2xl font-semibold text-forest" aria-live="polite">
            {score}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScore((value) => value + 1)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-forest px-4 py-2.5 text-xs font-bold text-paper transition-transform active:scale-95"
          >
            <Plus size={13} strokeWidth={3} />
            Прибавить
          </button>
          <button
            type="button"
            onClick={() => setScore(0)}
            className="rounded-lg border border-line bg-white px-3 py-2.5 text-xs font-bold text-ink-soft transition-colors hover:text-ink"
          >
            Сброс
          </button>
        </div>
        <p className="max-w-[220px] text-center text-[10px] leading-relaxed text-ink-soft">
          {score === 0
            ? "Нажми «Прибавить» — число изменится без перезагрузки страницы."
            : score < 5
              ? "Работает! JavaScript пересчитал значение и обновил текст."
              : "Ты уже освоился. Поменяй цвет кнопки в песочнице ниже."}
        </p>
      </div>
    </div>
  );
}

export function JsLesson({
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
        chapter="Глава 03 · JavaScript"
        title="JavaScript: добавляем жизнь"
        lead="HTML и CSS создают страницу, но она остаётся неподвижной. JavaScript заставляет её реагировать: считать, менять текст, открывать меню и запускать игры."
        minutes={8}
        examples={4}
        tone="js"
        learn={[
          "Поймёшь переменные и функции",
          "Оживишь кнопку за несколько строк",
          "Соберёшь настоящий счётчик",
        ]}
      />

      <div className="mt-8 space-y-12 sm:mt-10 sm:space-y-16">
        <section>
          <div className="mb-4">
            <Callout variant="note" title="Сначала важное различие">
              Java и JavaScript — разные языки. Java чаще используют для приложений и серверов, а
              JavaScript работает в браузере и отвечает за поведение сайта. Дальше речь только о
              JavaScript.
            </Callout>
          </div>

          <SectionHeading
            kicker="01 · первая реакция"
            title="Кнопка, которая слушает"
            description="JavaScript не рисует страницу. Он находит нужный элемент и описывает, что делать при событии — например, при клике."
          />

          <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <CodeBlock code={clickCode} language="js" label="script.js" />
              <div className="mt-3 space-y-2">
                {[
                  { code: 'querySelector("button")', text: "найди кнопку на странице" },
                  { code: 'addEventListener("click")', text: "слушай, когда по ней нажмут" },
                  { code: "() => { ... }", text: "выполни вот эти действия" },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="flex flex-col gap-0.5 rounded-lg border border-line bg-white/60 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                  >
                    <code className="font-mono text-[10px] font-medium text-[#876713]">
                      {item.code}
                    </code>
                    <p className="text-[10px] text-ink-soft">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <ClickDemo />
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="02 · три кита"
            title="Переменные, условия и функции"
            description="Это не весь JavaScript, но уже рабочая база. Каждый блок — маленькая идея с примером."
          />
          <div className="grid gap-3.5 md:grid-cols-3">
            {[
              {
                Icon: Variable,
                title: "Переменные",
                text: "Коробки с данными. const кладём один раз, let можно менять.",
                code: `const name = "Кира";\nlet score = 0;\nscore = score + 1;`,
              },
              {
                Icon: GitBranch,
                title: "Условия",
                text: "Развилка: если условие верное — один сценарий, иначе другой.",
                code: `if (score > 0) {\n  console.log("Уже не ноль!");\n}`,
              },
              {
                Icon: Blocks,
                title: "Функции",
                text: "Рецепт с названием. Написал один раз — вызываешь, когда нужно.",
                code: `function greet() {\n  return "Привет!";\n}\ngreet();`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-2xl border border-line bg-paper-soft p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sand-soft text-[#876713]">
                    <item.Icon size={15} />
                  </span>
                  <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">{item.text}</p>
                <div className="mt-auto pt-3">
                  <CodeBlock code={item.code} language="js" label={item.title} compact />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3.5">
            <Callout variant="tip" title="Как читать код новичку">
              Не пытайся понять всё сразу. Прочитай название, затем действия внутри фигурных
              скобок. Если встретил незнакомое слово — не страшно, просто вернись к нему позже.
            </Callout>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="03 · мини-проект"
            title="Живой счётчик"
            description="Десять строк кода — и у страницы появилась память. Число хранится в переменной, а на экране обновляется его отображение."
          />
          <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <CodeBlock code={counterCode} language="js" label="script.js" />
            <CounterDemo />
          </div>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {[
              "score хранит число",
              "plusButton ловит клик",
              "scoreElement показывает результат",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-2 rounded-lg border border-line bg-paper-soft px-3 py-2"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lime text-forest">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span className="text-[10px] leading-relaxed text-ink-soft">{item}</span>
                <span className="ml-auto font-mono text-[8px] text-ink-soft/50">0{index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="04 · песочница"
            title="Самый короткий путь к пониманию"
            description="Измени текст в HTML, перекрась кнопку в CSS и поменяй сообщение в JS. Смотри, что происходит после каждого изменения."
          />
          <Playground initialHtml={playgroundHtml} initialCss={playgroundCss} initialJs={playgroundJs} />
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2.5 rounded-xl border border-dashed border-line bg-paper-soft px-3.5 py-3">
              <Sparkles size={14} className="mt-0.5 shrink-0 text-[#876713]" />
              <p className="text-[11px] leading-relaxed text-ink-soft">
                <strong className="text-ink">Задание:</strong> сделай так, чтобы при третьем клике
                появился другой текст. Подсказка — условие <code className="font-mono">if</code>.
              </p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl border border-line bg-sky-soft/50 px-3.5 py-3">
              <Check size={14} className="mt-0.5 shrink-0 text-[#2f6784]" />
              <p className="text-[11px] leading-relaxed text-ink-soft">
                <strong className="text-ink">Хорошая привычка:</strong> после изменений проверяй
                страницу и консоль браузера. Там появляются подсказки об ошибках.
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="05 · ошибки"
            title="Если что-то не работает"
            description="Это не конец света, а обычная часть работы разработчика. Начни с трёх шагов."
          />
          <div className="overflow-hidden rounded-2xl border border-line">
            {[
              {
                title: "Проверь, что элемент найден",
                text: "Ошибка «button is null» означает, что элемента с таким id или тегом нет. Проверь написание.",
              },
              {
                title: "Смотри на кавычки и скобки",
                text: "Забытая закрывающая скобка или кавычка ломает весь следующий код. В редакторе они подсвечиваются.",
              },
              {
                title: "Открой консоль браузера",
                text: "F12 или правая кнопка → Inspect → Console. Там видно, в какой строке браузер остановился.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex gap-3 border-b border-line bg-paper-soft px-4 py-3.5 last:border-b-0"
              >
                <span className="font-mono text-[10px] font-bold text-ink-soft/50">
                  0{index + 1}
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="06 · самопроверка"
            title="Три вопроса о JavaScript"
            description="Не оценка, а способ заметить, что уже понятно, а что стоит перечитать."
          />
          <Quiz
            questions={[
              {
                question: "За что отвечает JavaScript на странице?",
                options: ["За структуру текста", "За цвета и отступы", "За поведение и реакции"],
                correct: 2,
                explanation:
                  "JavaScript описывает поведение: что происходит при клике, вводе текста или загрузке страницы.",
              },
              {
                question: "Как объявить значение, которое не нужно переприсваивать?",
                options: ["const name = 'Кира';", "let name = 'Кира';", "if name = 'Кира';"],
                correct: 0,
                explanation:
                  "const используют для постоянного значения. let подойдёт, если переменную планируется менять.",
              },
              {
                question: "Что делает document.querySelector('button')?",
                options: [
                  "Находит первый элемент button",
                  "Создаёт новую кнопку",
                  "Меняет цвет всех кнопок",
                ],
                correct: 0,
                explanation:
                  "querySelector возвращает первый элемент, подходящий под CSS-селектор. С ним дальше можно работать из кода.",
              },
            ]}
          />
        </section>
      </div>

      <LessonFooter
        done={done}
        onToggle={onToggle}
        onNavigate={onNavigate}
        prev="css"
        next="practice"
      />
    </div>
  );
}
