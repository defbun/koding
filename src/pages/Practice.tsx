import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Eye,
  PartyPopper,
  Rocket,
  Sparkles,
} from "lucide-react";
import type { PageId } from "../lib/content";
import { cn } from "../utils/cn";
import { Callout, DemoFrame, LessonFooter, LessonHeader, SectionHeading } from "../components/ui";
import { CodeBlock } from "../components/CodeBlock";
import { Playground } from "../components/Playground";

const projectHtml = `<main class="card">
  <p class="label">привет, мир</p>
  <div class="avatar">К</div>
  <h1>Я Кира</h1>
  <p>Учусь кодить и собираю свой первый сайт.</p>
  <button id="hello">Поздороваться</button>
</main>`;

const projectCss = `* { box-sizing: border-box; }

body {
  display: grid;
  place-items: center;
  min-height: 80vh;
  margin: 0;
  background: #f5f2e9;
  font-family: system-ui, sans-serif;
  color: #152a20;
}

.card {
  width: 300px;
  padding: 24px;
  border: 1px solid #dfdacb;
  border-radius: 20px;
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

.avatar {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-top: 16px;
  border-radius: 50%;
  background: #d9f27e;
  font-size: 20px;
  font-weight: 800;
  color: #123529;
}

h1 {
  margin: 12px 0 6px;
  font-size: 24px;
}

p {
  color: #5b6a61;
  font-size: 13px;
  line-height: 1.6;
}

button {
  width: 100%;
  margin-top: 12px;
  padding: 11px;
  border: 0;
  border-radius: 10px;
  background: #123529;
  color: #d9f27e;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}`;

const projectJs = `const button = document.getElementById("hello");

button.addEventListener("click", () => {
  button.textContent = "Привет! 👋";
  button.style.background = "#d9f27e";
  button.style.color = "#123529";
});`;

type Step = {
  title: string;
  subtitle: string;
  duration: string;
  intro: string;
  code?: string;
  language?: "html" | "css" | "js";
  label?: string;
  tip: string;
};

const steps: Step[] = [
  {
    title: "Собери структуру",
    subtitle: "HTML",
    duration: "4 мин",
    intro:
      "Начнём со скелета. Создай файл index.html и вставь этот код. Внутри есть карточка, аватар, заголовок, текст и кнопка.",
    language: "html",
    label: "index.html",
    code: `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Страница о себе</title>
  </head>
  <body>
    <main class="card">
      <p class="label">привет, мир</p>
      <div class="avatar">К</div>
      <h1>Я Кира</h1>
      <p>Учусь кодить и собираю свой первый сайт.</p>
      <button id="hello">Поздороваться</button>
    </main>
  </body>
</html>`,
    tip: "Пока страница выглядит скромно — это нормально. Стили появятся на следующем шаге.",
  },
  {
    title: "Добавь стиль",
    subtitle: "CSS",
    duration: "5 мин",
    intro:
      "Вставь эти правила в <style> внутри <head>. Цвет фона, отступы, скругления и шрифт — каждая строка меняет одну деталь.",
    language: "css",
    label: "style.css",
    code: projectCss,
    tip: "Меняй цвета на свои: например, background у .card или цвет у .avatar. Страница обновится сразу.",
  },
  {
    title: "Оживи кнопку",
    subtitle: "JavaScript",
    duration: "4 мин",
    intro:
      "Перед закрывающим </body> добавь тег <script> с этим кодом. Кнопка найдётся по id, начнёт слушать клик и поменяет текст.",
    language: "js",
    label: "script.js",
    code: projectJs,
    tip: 'id="hello" в HTML и getElementById("hello") в JS должны совпадать. Это главное совпадение проекта.',
  },
  {
    title: "Проверь и покажи",
    subtitle: "Финал",
    duration: "2 мин",
    intro:
      "Открой файл в браузере и пройди по странице глазами. Вот короткий список проверок, которые делают разработчики.",
    tip: "Если хочешь отправить сайт другу ссылкой, файл нужно опубликовать на хостинге. Например, бесплатно подойдёт GitHub Pages.",
  },
];

function ProjectPreview() {
  const [greeted, setGreeted] = useState(false);

  return (
    <DemoFrame url="kira.html" label="твой результат">
      <div className="relative min-h-[330px] overflow-hidden bg-paper p-5 sm:p-6">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-lime/60 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[310px] rounded-[20px] border border-line bg-white p-5 shadow-[0_20px_35px_-28px_rgba(21,42,32,0.6)]">
          <div className="flex items-start justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
              привет, мир
            </p>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sand-soft text-[#876713]">
              <Sparkles size={10} />
            </span>
          </div>
          <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-lime font-display text-base font-semibold text-forest">
            К
          </div>
          <h2 className="mt-3 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
            Я Кира
          </h2>
          <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft">
            Учусь кодить и собираю свой первый сайт.
          </p>
          <button
            type="button"
            onClick={() => setGreeted(true)}
            className={cn(
              "mt-4 w-full rounded-lg px-3 py-2.5 text-[11px] font-bold transition-all active:scale-[0.98]",
              greeted ? "bg-lime text-forest" : "bg-forest text-paper",
            )}
          >
            {greeted ? "Привет! 👋" : "Поздороваться"}
          </button>
          <div className="mt-3 flex min-h-[20px] items-center justify-center">
            {greeted ? (
              <p className="animate-soft-pop rounded-md bg-lime-soft px-2 py-1 text-[9px] font-semibold text-forest">
                Сработало! Это JavaScript.
              </p>
            ) : (
              <p className="font-mono text-[8px] uppercase tracking-wider text-ink-soft/60">
                кнопка пока не нажата
              </p>
            )}
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}

export function Practice({
  done,
  onToggle,
  onNavigate,
}: {
  done: boolean;
  onToggle: () => void;
  onNavigate: (page: PageId) => void;
}) {
  const [stepsDone, setStepsDone] = useState<boolean[]>([false, false, false, false]);
  const [openStep, setOpenStep] = useState(0);

  const completedCount = useMemo(() => stepsDone.filter(Boolean).length, [stepsDone]);
  const percent = Math.round((completedCount / steps.length) * 100);
  const allDone = completedCount === steps.length;

  const completeStep = (index: number) => {
    setStepsDone((previous) => {
      const updated = [...previous];
      updated[index] = !updated[index];
      return updated;
    });
    if (!stepsDone[index] && index < steps.length - 1) {
      setOpenStep(index + 1);
    }
  };

  return (
    <div className="animate-rise">
      <LessonHeader
        chapter="Практика · мини-проект"
        title="Собери страницу о себе"
        lead="Хватит теории: сейчас соберём всё вместе. HTML даст структуру, CSS — настроение, а JavaScript оживит кнопку. Это уже настоящий сайт."
        minutes={15}
        examples={4}
        tone="practice"
        learn={[
          "Соединишь три языка в одном файле",
          "Сделаешь рабочую кнопку",
          "Проверишь проект и покажешь друзьям",
        ]}
      />

      <div className="mt-8 space-y-12 sm:mt-10 sm:space-y-16">
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              kicker="перед началом"
              title="Что у нас получится"
              description="Маленькая личная карточка — отличный первый проект. Здесь нет базы данных и сложных серверов, только ты и браузер."
              className="mb-3"
            />
            <p className="text-sm leading-relaxed text-ink-soft">
              Ты можешь менять имя, цвета и текст под себя. В конце получится файл, который
              открывается в любом браузере и работает без интернета.
            </p>
            <div className="mt-4 space-y-2">
              {[
                { Icon: Code2, text: "HTML отвечает за структуру" },
                { Icon: Sparkles, text: "CSS делает карточку аккуратной" },
                { Icon: Rocket, text: "JS добавляет реакцию на клик" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5 rounded-lg border border-line bg-white/60 px-3 py-2.5"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-lime-soft text-forest">
                    <item.Icon size={12} />
                  </span>
                  <span className="text-[11px] font-medium text-ink-soft">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <ProjectPreview />
        </section>

        <section>
          <SectionHeading
            kicker="пошаговая сборка"
            title="Четыре шага — и готово"
            description="Открывай шаг, вставляй код и отмечай выполненное. Открытых шагов может быть сколько угодно, темп — твой."
          />

          <div className="mb-4 rounded-2xl border border-line bg-paper-soft p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-ink">
                  {allDone ? "Проект собран. Отличная работа!" : "Прогресс проекта"}
                </p>
                <p className="mt-0.5 text-[10px] text-ink-soft">
                  {completedCount} из {steps.length} шагов готово
                </p>
              </div>
              <span className="font-display text-lg font-semibold text-forest">{percent}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper-deep">
              <div
                className="h-full rounded-full bg-lime transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            {allDone && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#d6e5ac] bg-lime-soft px-3 py-2">
                <PartyPopper size={14} className="shrink-0 text-forest" />
                <p className="text-[10px] font-semibold leading-relaxed text-forest">
                  Ты собрал первый сайт. Не забудь отметить главу пройденной внизу страницы.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            {steps.map((step, index) => {
              const isOpen = openStep === index;
              const stepComplete = stepsDone[index];
              return (
                <div
                  key={step.title}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-paper-soft transition-colors",
                    isOpen ? "border-forest/25" : "border-line",
                    stepComplete && !isOpen && "border-[#c7da92] bg-lime-soft/30",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenStep(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5"
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold transition-colors",
                        stepComplete
                          ? "border-[#c7da92] bg-lime text-forest"
                          : "border-line bg-white text-ink-soft",
                      )}
                    >
                      {stepComplete ? <Check size={14} strokeWidth={3} /> : `0${index + 1}`}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-bold text-ink sm:text-sm">
                        {step.title}
                        <span className="ml-1.5 font-mono text-[9px] font-normal uppercase tracking-wide text-ink-soft">
                          · {step.subtitle}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[10px] text-ink-soft">
                        {stepComplete ? "готово" : `≈ ${step.duration}`}
                      </span>
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "shrink-0 text-ink-soft transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-line px-4 pb-4 pt-4 sm:px-5">
                      <p className="text-xs leading-relaxed text-ink-soft sm:text-[13px]">
                        {step.intro}
                      </p>
                      {step.code && step.language && (
                        <div className="mt-3">
                          <CodeBlock
                            code={step.code}
                            language={step.language}
                            label={step.label}
                            compact
                          />
                        </div>
                      )}
                      {index === steps.length - 1 && (
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {[
                            "Заголовок вкладки изменился",
                            "Кнопка реагирует на клик",
                            "Текст читается на телефоне",
                            "В консоли нет красных ошибок",
                          ].map((check) => (
                            <div
                              key={check}
                              className="flex items-center gap-2 rounded-lg border border-line bg-white/60 px-3 py-2"
                            >
                              <CheckCircle2 size={12} className="shrink-0 text-[#65772a]" />
                              <span className="text-[10px] text-ink-soft">{check}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 flex flex-col gap-2.5 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="flex items-start gap-1.5 text-[10px] leading-relaxed text-ink-soft">
                          <Sparkles size={12} className="mt-0.5 shrink-0 text-[#876713]" />
                          {step.tip}
                        </p>
                        <button
                          type="button"
                          onClick={() => completeStep(index)}
                          className={cn(
                            "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors",
                            stepComplete
                              ? "border border-[#c7da92] bg-lime-soft text-forest"
                              : "bg-forest text-paper hover:bg-forest-light",
                          )}
                        >
                          {stepComplete ? (
                            <>
                              <CheckCircle2 size={13} />
                              Шаг готов
                            </>
                          ) : (
                            <>
                              Отметить шаг
                              <ArrowRight size={12} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="полный код"
            title="Песочница твоего проекта"
            description="Собери всё в одном месте и попробуй изменить дизайн. Здесь три вкладки — как три части настоящего сайта."
          />
          <Playground
            initialHtml={projectHtml}
            initialCss={projectCss}
            initialJs={projectJs}
            title="Страница о себе"
          />
          <div className="mt-3">
            <Callout variant="tip" title="Сделай проект своим">
              Замени имя, текст и цвета. Попробуй добавить вторую кнопку или ссылку на любимый
              фильм. Главное — не бояться экспериментировать.
            </Callout>
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-white/60 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime text-forest">
                <Eye size={18} />
              </span>
              <div>
                <h2 className="text-sm font-bold text-ink">Что показать друзьям</h2>
                <p className="mt-1 max-w-lg text-[11px] leading-relaxed text-ink-soft">
                  Сохрани файл и открой его двойным кликом. Хочешь настоящую ссылку — опубликуй
                  проект на GitHub Pages или Netlify. Это уже следующий, чуть более взрослый шаг.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("cheatsheet")}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-line bg-paper px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:border-forest/25 hover:bg-white"
            >
              Открыть шпаргалку
              <ArrowRight size={13} />
            </button>
          </div>
        </section>
      </div>

      <LessonFooter
        done={done}
        onToggle={onToggle}
        onNavigate={onNavigate}
        prev="js"
        next="cheatsheet"
        nextLabel="дальше"
      />
    </div>
  );
}
