import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  Code2,
  Compass,
  Layers,
  Palette,
  Rocket,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { cn } from "../utils/cn";
import type { PageId } from "../lib/content";
import { SectionHeading, toneStyles } from "../components/ui";

const technologies = [
  {
    id: "html" as PageId,
    number: "01",
    name: "HTML",
    role: "скелет",
    description: "Расставляет заголовки, тексты, картинки и кнопки по своим местам.",
    example: "<h1>Привет!</h1>",
    minutes: "6 минут",
    Icon: Code2,
    tone: "html" as const,
  },
  {
    id: "css" as PageId,
    number: "02",
    name: "CSS",
    role: "внешность",
    description: "Выбирает цвет и шрифт, добавляет отступы, рамки и аккуратную сетку.",
    example: "color: #123529;",
    minutes: "7 минут",
    Icon: Palette,
    tone: "css" as const,
  },
  {
    id: "js" as PageId,
    number: "03",
    name: "JavaScript",
    role: "характер",
    description: "Оживляет страницу: реагирует на клики и меняет содержимое на лету.",
    example: "button.onclick = …",
    minutes: "8 минут",
    Icon: Zap,
    tone: "js" as const,
  },
];

const route: {
  id: PageId;
  title: string;
  hint: string;
  time: string;
  Icon: typeof Code2;
}[] = [
  { id: "html", title: "Скелет страницы", hint: "HTML: теги и структура", time: "6 мин", Icon: Code2 },
  { id: "css", title: "Оформление", hint: "CSS: цвета и отступы", time: "7 мин", Icon: Palette },
  { id: "js", title: "Движение", hint: "JavaScript: клики и реакции", time: "8 мин", Icon: Zap },
  { id: "practice", title: "Свой первый сайт", hint: "Собираем страницу о себе", time: "15 мин", Icon: Rocket },
  { id: "cheatsheet", title: "Команды под рукой", hint: "Шпаргалка на каждый день", time: "3 мин", Icon: BookOpen },
];

const rules = [
  "Ошибка — не провал, а подсказка. Браузер просто ждёт исправления.",
  "Маленький работающий результат лучше большой теории без практики.",
  "Копируй, но обязательно меняй. Так появляется собственное понимание.",
];

export function Home({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <div className="animate-rise">
      <section className="relative pt-3 sm:pt-5">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid gap-11 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-8">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-3 py-1.5">
              <Sparkles size={12} className="text-[#7b8c2d]" />
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-ink/70 sm:text-[10px]">
                понятный старт для новичка
              </span>
            </div>

            <h1 className="mt-5 max-w-[15ch] font-display text-[clamp(2.15rem,5.6vw,3.05rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-ink text-balance">
              Сайты начинаются
              <span className="relative mt-1 block w-fit">
                <span
                  className="absolute inset-x-0 bottom-1 h-[0.32em] -rotate-1 rounded-sm bg-lime"
                  aria-hidden="true"
                />
                <span className="relative">с малого.</span>
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-soft sm:text-[17px] sm:leading-relaxed">
              Короткая документация для тех, кто никогда не писал код. Разберём HTML, CSS и
              JavaScript — простыми словами, на живых примерах и без лишней теории.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onNavigate("html")}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-forest px-5 py-3.5 text-sm font-bold text-paper transition-colors hover:bg-forest-light"
              >
                Начать с нуля
                <ArrowRight
                  size={17}
                  className="text-lime transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("route")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-paper-soft px-5 py-3.5 text-sm font-bold text-ink transition-colors hover:border-forest/25 hover:bg-white"
              >
                <Compass size={16} className="text-ink-soft" />
                Мой маршрут
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              {["≈ 45 минут", "ничего не устанавливать", "0 опыта — это нормально"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-soft">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-lime text-forest">
                      <Check size={9} strokeWidth={3.5} />
                    </span>
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-[370px] pb-5 lg:mx-0 lg:ml-auto">
            <div
              className="absolute inset-x-3 bottom-8 top-10 rotate-2 rounded-[28px] border border-line bg-paper-deep grid-paper"
              aria-hidden="true"
            />
            <div className="absolute -top-3 left-0 z-20 rotate-[-5deg] rounded-lg border border-forest/15 bg-lime px-3 py-2 font-mono text-[10px] font-medium text-forest shadow-md animate-float sm:-left-5">
              0 опыта — это нормально
            </div>
            <div className="absolute right-0 top-24 z-20 hidden rotate-[3deg] rounded-lg bg-forest px-3 py-2 font-mono text-[10px] text-lime shadow-md sm:block">
              &lt;div class="card"&gt;
            </div>

            <div className="relative z-10 overflow-hidden rounded-[22px] border border-line bg-white p-2.5 shadow-[0_30px_70px_-35px_rgba(21,42,32,0.55)]">
              <div className="overflow-hidden rounded-[15px] border border-line bg-paper-soft">
                <div className="flex items-center gap-2 border-b border-line bg-white px-3 py-2.5">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-coral" />
                    <span className="h-2 w-2 rounded-full bg-sand" />
                    <span className="h-2 w-2 rounded-full bg-sky" />
                  </div>
                  <div className="mx-auto rounded-md border border-line bg-paper-soft px-2.5 py-0.5 font-mono text-[9px] text-ink-soft">
                    первый-сайт.ru
                  </div>
                  <Sparkles size={11} className="text-ink-soft" />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-line bg-white px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-soft">
                      личная страница
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-ink-soft">
                      html · css · js
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime font-display text-sm font-semibold text-forest">
                      К
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-paper-soft bg-forest" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold leading-tight text-ink">Привет, я Кира.</p>
                      <p className="mt-0.5 text-[10px] text-ink-soft">учусь кодить с нуля</p>
                    </div>
                  </div>

                  <h2 className="mt-4 font-display text-[17px] font-semibold leading-snug tracking-[-0.02em] text-ink">
                    Собираю свой первый сайт.
                  </h2>
                  <p className="mt-1.5 text-[10.5px] leading-relaxed text-ink-soft">
                    Начала со структуры, добавила стили. Теперь очередь JavaScript.
                  </p>

                  <div className="mt-3.5 flex gap-2">
                    <span className="rounded-md bg-forest px-2.5 py-1.5 text-[9px] font-bold text-paper">
                      мой проект ↗
                    </span>
                    <span className="rounded-md border border-line bg-white px-2.5 py-1.5 text-[9px] font-bold text-ink">
                      написать
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-1.5">
                    {[
                      { label: "HTML", dot: "bg-coral" },
                      { label: "CSS", dot: "bg-sky" },
                      { label: "JS", dot: "bg-sand" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2 py-1.5"
                      >
                        <span className={cn("h-1.5 w-1.5 rounded-full", item.dot)} />
                        <span className="font-mono text-[8px] font-medium text-ink-soft">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
                    <div>
                      <p className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-ink-soft">
                        сегодня
                      </p>
                      <p className="mt-0.5 text-[10px] font-bold text-ink">Первый шаг сделан</p>
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime text-forest">
                      <Check size={13} strokeWidth={3} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-20 -mt-2 ml-auto mr-3 flex w-fit items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 shadow-sm">
              <MouseArrow />
              <span className="text-[9px] font-semibold text-ink-soft">
                макет из главы «Практика»
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10 grid grid-cols-2 gap-y-5 border-y border-line py-5 sm:grid-cols-4 sm:divide-x sm:divide-line">
        {[
          { value: "3", label: "технологии" },
          { value: "6", label: "маленьких глав" },
          { value: "45", label: "минут на всё" },
          { value: "0", label: "установок" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={cn("px-1 sm:px-4", index === 0 && "sm:pl-0", index === 3 && "sm:pr-0")}
          >
            <p className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-ink-soft">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-14 sm:mt-20">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <SectionHeading
            kicker="три языка — один сайт"
            title="С чего начать"
            description="Учимся по порядку: сначала структура, затем красота и в конце — движение. Вместе эти три языка и создают обычную веб-страницу."
            className="mb-0 max-w-2xl"
          />
          <button
            type="button"
            onClick={() => onNavigate("html")}
            className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-forest"
          >
            С первой главы
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="mt-6 grid gap-3.5 md:grid-cols-3">
          {technologies.map((tech) => {
            const tone = toneStyles[tech.tone];
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => onNavigate(tech.id)}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper-soft p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-[0_20px_40px_-28px_rgba(21,42,32,0.45)]"
              >
                <span className={cn("absolute inset-x-0 top-0 h-1", tone.dot)} aria-hidden="true" />
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      tone.soft,
                      tone.icon,
                    )}
                  >
                    <tech.Icon size={19} strokeWidth={2} />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink-soft/60">
                    язык {tech.number}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                  {tech.name}
                  <span className="ml-1.5 font-sans text-xs font-medium text-ink-soft">
                    — {tech.role}
                  </span>
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{tech.description}</p>
                <div className="mt-auto pt-5">
                  <div className="overflow-hidden rounded-lg bg-forest px-3 py-2">
                    <code className="block truncate font-mono text-[10px] text-lime/90">
                      {tech.example}
                    </code>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-ink-soft">
                      <Terminal size={11} />
                      {tech.minutes}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-forest">
                      открыть
                      <ArrowUpRight
                        size={12}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section id="route" className="relative mt-14 scroll-mt-24 overflow-hidden rounded-3xl bg-forest p-6 text-paper sm:mt-20 sm:p-8">
        <div className="grid-paper pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lime/15 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime/80">
                маршрут без паники
              </span>
            </div>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-[2rem]">
              Пять небольших шагов
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/65">
              Не нужно учить всё сразу. Проходи главы по порядку, пробуй код в песочнице и
              возвращайся, когда что-то забылось.
            </p>
            <div className="mt-6 hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:block">
              <p className="font-display text-base leading-snug text-lime">
                «Не обязательно знать всё, чтобы начать.»
              </p>
              <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-paper/40">
                <Braces size={12} />
                главное — первый шаг
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {route.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => onNavigate(step.id)}
                className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-2.5 py-3 text-left transition-colors hover:border-white/10 hover:bg-white/[0.05] sm:px-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-[10px] text-paper/60 transition-colors group-hover:border-lime group-hover:bg-lime group-hover:text-forest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-bold text-paper">{step.title}</span>
                  <span className="mt-0.5 block truncate text-[11px] text-paper/45">{step.hint}</span>
                </span>
                <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-wider text-paper/35 sm:block">
                  {step.time}
                </span>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-paper/30 transition-colors group-hover:text-lime"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-3.5 sm:mt-20 md:grid-cols-2">
        <div className="rounded-3xl border border-[#c6dde8] bg-sky-soft/60 p-5 sm:p-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky text-[#173f52]">
            <Layers size={17} />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
            Java и JavaScript — не одно и то же
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">
            Похожи только названием. В этом курсе речь про JavaScript: он работает прямо в
            браузере и делает сайты интерактивными.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[#c6dde8] bg-white/70 p-3">
              <p className="font-mono text-[10px] font-medium text-ink">Java</p>
              <p className="mt-1 text-[10px] leading-relaxed text-ink-soft">
                приложения, Android и серверы
              </p>
            </div>
            <div className="rounded-xl border border-forest/15 bg-forest p-3 text-paper">
              <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium text-lime">
                JavaScript <Check size={10} strokeWidth={3} />
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-paper/65">
                сайты и интерактив — наш выбор
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#d6e5ac] bg-lime-soft/70 p-5 sm:p-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime text-forest">
            <Sparkles size={17} />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
            Три правила новичка
          </h2>
          <ul className="mt-3 space-y-2.5">
            {rules.map((rule, index) => (
              <li key={rule} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#c7da92] bg-white/60 font-mono text-[9px] font-semibold text-forest">
                  0{index + 1}
                </span>
                <span className="text-[11.5px] leading-relaxed text-ink/75">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative mt-14 overflow-hidden rounded-3xl bg-lime p-6 sm:mt-20 sm:p-9">
        <span
          className="pointer-events-none absolute -bottom-10 -right-3 select-none font-display text-[140px] font-bold leading-none text-forest/[0.07] sm:text-[190px]"
          aria-hidden="true"
        >
          &lt;/&gt;
        </span>
        <div className="relative max-w-xl">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-forest/60">
            финальная глава
          </span>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-forest sm:text-[2rem]">
            Хватит читать. Давай соберём первый сайт.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-forest/70">
            Страница о себе из HTML, CSS и одной живой кнопки. Её можно сохранить и показать
            друзьям — это уже настоящий проект.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate("practice")}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3.5 text-sm font-bold text-paper transition-colors hover:bg-forest-light"
            >
              Собрать проект
              <ArrowRight size={16} className="text-lime transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("cheatsheet")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-forest/20 bg-lime px-5 py-3.5 text-sm font-bold text-forest transition-colors hover:bg-lime/70"
            >
              <BookOpen size={15} />
              Открыть шпаргалку
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function MouseArrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 2.5 12 7l-4 1.2L6.5 12 3 2.5Z"
        fill="#d9f27e"
        stroke="#152a20"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
