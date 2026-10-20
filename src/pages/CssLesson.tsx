import { useState } from "react";
import { Check, Move, Palette, Sparkles } from "lucide-react";
import type { PageId } from "../lib/content";
import { cn } from "../utils/cn";
import { Callout, DemoFrame, LessonFooter, LessonHeader, SectionHeading } from "../components/ui";
import { CodeBlock } from "../components/CodeBlock";
import { Quiz } from "../components/Quiz";

const ruleExample = `h1 {
  color: #152a20;
  font-size: 38px;
}

.card {
  background: #d9f27e;
  padding: 24px;
  border-radius: 16px;
}`;

const headExample = `<head>
  <style>
    h1 {
      color: #123529;
    }
  </style>
</head>`;

const cardCss = `.card {
  background: #123529;
  color: #f5f2e9;
  padding: 24px;
  border-radius: 18px;
}

.card h2 {
  margin: 0;
  font-size: 24px;
}

.card button {
  margin-top: 16px;
  padding: 10px 16px;
  border: 0;
  border-radius: 8px;
  background: #d9f27e;
  color: #123529;
  font-weight: 700;
}`;

const properties = [
  { name: "color", text: "цвет текста", value: "#152a20" },
  { name: "background", text: "фон элемента", value: "#d9f27e" },
  { name: "font-size", text: "размер шрифта", value: "20px" },
  { name: "padding", text: "внутренний отступ", value: "16px" },
  { name: "border-radius", text: "скругление углов", value: "12px" },
  { name: "display: flex", text: "элементы в ряд", value: "flex" },
];

const palette = [
  { name: "Чернила", hex: "#152A20", bg: "bg-ink", text: "text-paper", note: "основной текст" },
  { name: "Лес", hex: "#123529", bg: "bg-forest", text: "text-paper", note: "кнопки, фон" },
  { name: "Лайм", hex: "#D9F27E", bg: "bg-lime", text: "text-forest", note: "акценты" },
  { name: "Коралл", hex: "#F0A487", bg: "bg-coral", text: "text-[#572515]", note: "подсветка" },
  { name: "Небо", hex: "#A9CDE0", bg: "bg-sky", text: "text-[#173f52]", note: "спокойствие" },
  { name: "Бумага", hex: "#F5F2E9", bg: "bg-paper", text: "text-ink", note: "фон страницы" },
];

const flexOptions = [
  { value: "flex-start", label: "всё слева" },
  { value: "center", label: "по центру" },
  { value: "flex-end", label: "всё справа" },
  { value: "space-between", label: "по краям" },
  { value: "space-around", label: "с отступами" },
];

function StyleComparison() {
  const [styled, setStyled] = useState(true);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper-soft p-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-2.5 pt-1">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky text-[#173f52]">
            <Palette size={12} />
          </span>
          <span className="text-xs font-bold text-ink">Один и тот же HTML</span>
        </div>
        <div className="flex rounded-lg border border-line bg-white p-0.5">
          <button
            type="button"
            onClick={() => setStyled(false)}
            className={cn(
              "rounded-md px-2.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-wide transition-colors",
              !styled ? "bg-forest text-paper" : "text-ink-soft hover:text-ink",
            )}
            aria-pressed={!styled}
          >
            без CSS
          </button>
          <button
            type="button"
            onClick={() => setStyled(true)}
            className={cn(
              "rounded-md px-2.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-wide transition-colors",
              styled ? "bg-forest text-paper" : "text-ink-soft hover:text-ink",
            )}
            aria-pressed={styled}
          >
            с CSS
          </button>
        </div>
      </div>
      <DemoFrame url="карточка.html" label="до / после">
        <div
          className={cn(
            "flex min-h-[230px] items-center justify-center p-6 transition-colors duration-300",
            styled ? "bg-paper" : "bg-white",
          )}
        >
          <div
            className={cn(
              "w-full max-w-[290px] transition-all duration-300",
              styled
                ? "rounded-[18px] bg-forest p-6 text-paper shadow-[0_18px_35px_-20px_rgba(18,53,41,0.6)]"
                : "p-0 text-ink",
            )}
          >
            <p
              className={cn(
                "font-mono text-[9px] uppercase tracking-[0.14em]",
                styled ? "text-lime/80" : "text-ink-soft",
              )}
            >
              начинающий разработчик
            </p>
            <h2
              className={cn(
                "mt-2 font-bold",
                styled ? "font-display text-xl" : "text-2xl font-bold",
              )}
            >
              Привет, я Кира
            </h2>
            <p className={cn("mt-1.5 text-xs", styled ? "text-paper/65" : "text-ink-soft")}>
              Учусь собирать сайты с нуля.
            </p>
            <button
              type="button"
              className={cn(
                "mt-4 text-xs font-bold transition-colors",
                styled
                  ? "rounded-lg border-0 bg-lime px-3.5 py-2 text-forest"
                  : "mt-4 border-0 bg-transparent p-0 text-ink underline",
              )}
            >
              Написать мне
            </button>
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}

function BoxModel() {
  return (
    <div className="rounded-2xl border border-dashed border-[#c6a95a] bg-sand-soft/70 p-3 sm:p-4">
      <p className="font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-[#876713]">
        margin · отступ снаружи
      </p>
      <div className="mt-2 rounded-xl border-2 border-forest bg-white p-3 sm:p-4">
        <p className="font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-forest">
          border · рамка
        </p>
        <div className="mt-2 rounded-lg bg-sky-soft p-3 sm:p-4">
          <p className="font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-[#2f6784]">
            padding · отступ внутри
          </p>
          <div className="mt-2 rounded-md bg-lime px-4 py-5 text-center">
            <p className="text-xs font-bold text-forest">Твой текст</p>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-forest/60">
              content · содержимое
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlexPlayground() {
  const [justify, setJustify] = useState("flex-start");
  const hint = flexOptions.find((item) => item.value === justify)?.label ?? "";

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-forest">
            <Move size={12} />
          </span>
          <span className="text-xs font-bold text-ink">Flexbox-конструктор</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">
          нажми на значение
        </span>
      </div>

      <div className="grid gap-2.5 p-3 sm:p-4 md:grid-cols-[190px_1fr]">
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-1">
          {flexOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setJustify(option.value)}
              aria-pressed={justify === option.value}
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors",
                justify === option.value
                  ? "border-forest bg-forest text-lime"
                  : "border-line bg-white text-ink-soft hover:border-forest/25 hover:text-ink",
              )}
            >
              <span className="min-w-0">
                <span className="block truncate font-mono text-[10px] leading-tight">
                  {option.value}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block truncate text-[9px] leading-tight",
                    justify === option.value ? "text-paper/60" : "text-ink-soft/70",
                  )}
                >
                  {option.label}
                </span>
              </span>
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  justify === option.value ? "bg-lime" : "bg-line",
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex min-h-[190px] flex-col rounded-xl border border-line bg-white p-3">
          <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-ink-soft">
            <span>контейнер</span>
            <span>{hint}</span>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-dashed border-line bg-paper-soft p-2"
            style={{ justifyContent: justify }}
          >
            {[
              { label: "1", style: "bg-coral-soft text-[#a84b27]" },
              { label: "2", style: "bg-sky-soft text-[#2f6784]" },
              { label: "3", style: "bg-sand-soft text-[#876713]" },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/60 font-mono text-xs font-semibold",
                  item.style,
                )}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-forest px-4 py-3">
        <pre className="overflow-x-auto font-mono text-[10px] leading-relaxed text-paper/80">
          <span className="text-[#f2b07b]">.container</span>
          {" {\n  "}
          <span className="text-[#d9f27e]">display</span>: <span className="text-[#a9d9be]">flex</span>;
          {"\n  "}
          <span className="text-[#d9f27e]">justify-content</span>:{" "}
          <span className="text-[#a9d9be]">{justify}</span>;{"\n}"}
        </pre>
      </div>
    </div>
  );
}

export function CssLesson({
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
        chapter="Глава 02 · CSS"
        title="CSS: одеваем страницу"
        lead="Если HTML — это скелет, то CSS — стиль. Он решает, какого размера заголовок, какого цвета кнопка и где стоит карточка."
        minutes={7}
        examples={4}
        tone="css"
        learn={[
          "Поймёшь правило селектор + свойство",
          "Разберёшься с цветами и отступами",
          "Научишься ставить элементы в ряд",
        ]}
      />

      <div className="mt-8 space-y-12 sm:mt-10 sm:space-y-16">
        <section>
          <SectionHeading
            kicker="01 · главная идея"
            title="Один элемент — одно правило"
            description="CSS расшифровывается как Cascading Style Sheets, но запоминать это не обязательно. Главное: CSS меняет внешний вид уже готовых элементов."
          />

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-3xl border border-line bg-paper-soft p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs sm:text-sm">
                <span className="rounded-md border border-[#bcd9e6] bg-sky-soft px-2 py-1.5 font-medium text-[#2f6784]">
                  h1
                </span>
                <span className="px-0.5 text-ink-soft">{"{"}</span>
                <span className="rounded-md border border-[#d6e5ac] bg-lime-soft px-2 py-1.5 font-medium text-forest">
                  color
                </span>
                <span className="text-ink-soft">:</span>
                <span className="rounded-md border border-[#e6d49d] bg-sand-soft px-2 py-1.5 text-[#876713]">
                  #152a20
                </span>
                <span className="text-ink-soft">;</span>
                <span className="px-0.5 text-ink-soft">{"}"}</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4">
                <div className="text-center">
                  <p className="font-mono text-[9px] uppercase tracking-wide text-[#2f6784]">
                    селектор
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-ink-soft">кого выбираем</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-[9px] uppercase tracking-wide text-[#65772a]">
                    свойство
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-ink-soft">что меняем</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-[9px] uppercase tracking-wide text-[#876713]">
                    значение
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-ink-soft">на что меняем</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-ink-soft">
                Прочитай правило вслух: «Заголовок h1 — цвет текста — тёмный». Звучит как обычное
                указание. Именно так CSS и работает.
              </p>
              <CodeBlock code={ruleExample} language="css" label="style.css" />
            </div>
          </div>

          <div className="mt-4">
            <StyleComparison />
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="02 · подключение"
            title="Куда вставлять CSS"
            description="Для первого эксперимента достаточно тега <style> внутри <head>. Позже стили можно вынести в отдельный файл style.css."
          />
          <div className="grid gap-4 sm:grid-cols-[1fr_0.9fr] sm:items-start">
            <CodeBlock code={headExample} language="html" label="index.html" />
            <div className="space-y-3">
              <Callout variant="note" title="Браузер читает сверху вниз">
                Стили работают и внутри HTML. Порядок важен: правило ниже может переопределить
                правило выше.
              </Callout>
              <Callout variant="tip" title="Не повторяйся">
                Если оформление одинаковое у трёх карточек, лучше дать им один класс{" "}
                <code>class="card"</code>, чем писать три одинаковых правила.
              </Callout>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="03 · цвет"
            title="Немного цвета ещё никому не навредило"
            description="Цвет в CSS записывают HEX-кодом: решётка и шесть символов. Вот палитра, на которой построен этот учебник — можешь брать её в свои проекты."
          />
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {palette.map((color) => (
              <div
                key={color.hex}
                className="overflow-hidden rounded-xl border border-line bg-white/60 p-1.5"
              >
                <div
                  className={cn(
                  "flex h-[72px] items-end justify-between rounded-lg p-2.5",
                  color.bg,
                )}
                >
                  <span className={cn("font-mono text-[9px] font-medium", color.text)}>
                    {color.hex}
                  </span>
                  <Check size={11} className={color.text} />
                </div>
                <div className="flex items-center justify-between gap-1 px-1 pb-1 pt-2">
                  <p className="text-[11px] font-bold text-ink">{color.name}</p>
                  <p className="font-mono text-[8px] uppercase tracking-wide text-ink-soft">
                    {color.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <CodeBlock
              code={`h1 {\n  color: #152a20;\n  background: #d9f27e;\n  padding: 8px 12px;\n}`}
              language="css"
              label="пример"
              compact
            />
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="04 · отступы"
            title="Каждый элемент — это коробка"
            description="CSS видит любую кнопку или заголовок как прямоугольник. Чтобы управлять пространством, нужно понять четыре части этой коробки."
          />
          <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <BoxModel />
            <div className="space-y-2.5">
              {[
                {
                  name: "content",
                  text: "сам текст или картинка внутри",
                  code: "width: 200px;",
                },
                {
                  name: "padding",
                  text: "пространство между содержимым и рамкой",
                  code: "padding: 16px;",
                },
                {
                  name: "border",
                  text: "рамка по краю элемента",
                  code: "border: 2px solid #123529;",
                },
                {
                  name: "margin",
                  text: "расстояние до соседних элементов",
                  code: "margin: 24px;",
                },
              ].map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white/60 px-3 py-2.5"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-paper-deep font-mono text-[9px] font-bold text-ink-soft">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] font-semibold text-ink">{item.name}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-ink-soft">{item.text}</p>
                    <code className="mt-1 block truncate font-mono text-[9px] text-[#65772a]">
                      {item.code}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="05 · выравнивание"
            title="Flexbox в двух словах"
            description="display: flex ставит элементы в ряд. justify-content решает, как этот ряд расположить внутри контейнера. Попробуй все варианты."
          />
          <FlexPlayground />
          <div className="mt-3">
            <Callout variant="tip" title="Запомни одну связку">
              <code>display: flex</code> + <code>gap: 12px</code> — самый быстрый способ аккуратно
              поставить карточки в ряд с ровными промежутками.
            </Callout>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="06 · пример"
            title="Собираем красивую карточку"
            description="Слева — только CSS. HTML здесь простой: блок с классом card, внутри заголовок, текст и кнопка. Справа — что получается."
          />
          <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <CodeBlock code={cardCss} language="css" label="style.css" />
            <DemoFrame url="карточка.html" label="результат">
              <div className="flex min-h-[260px] items-center justify-center bg-paper p-5">
                <div className="w-full max-w-[280px] rounded-[18px] bg-forest p-6 text-paper shadow-[0_18px_35px_-20px_rgba(18,53,41,0.6)]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-lime/80">
                    начинающий разработчик
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold">Привет, я Кира</h2>
                  <p className="mt-1.5 text-xs text-paper/65">Учусь собирать сайты с нуля.</p>
                  <button
                    type="button"
                    className="mt-4 rounded-lg bg-lime px-3.5 py-2 text-xs font-bold text-forest"
                  >
                    Написать мне
                  </button>
                </div>
              </div>
            </DemoFrame>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Обрати внимание: цвет фона, внутренний отступ, скругление и стиль кнопки — это всё
            отдельные CSS-свойства. Меняешь одно значение — меняется один эффект.
          </p>
        </section>

        <section>
          <SectionHeading
            kicker="07 · словарь"
            title="Шесть свойств на каждый день"
            description="Этого уже достаточно, чтобы страница перестала выглядеть как документ из 1998 года."
          />
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {properties.map((property) => (
              <div key={property.name} className="rounded-xl border border-line bg-paper-soft p-3">
                <code className="font-mono text-[10px] font-semibold text-[#2f6784]">
                  {property.name}
                </code>
                <p className="mt-1 text-[11px] font-medium text-ink">{property.text}</p>
                <p className="mt-1.5 truncate font-mono text-[9px] text-ink-soft">
                  {property.value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-dashed border-line bg-paper-soft px-3.5 py-2.5">
            <Sparkles size={14} className="mt-0.5 shrink-0 text-[#876713]" />
            <p className="text-[11px] leading-relaxed text-ink-soft">
              Не бойся экспериментировать со значениями: CSS невозможно «сломать навсегда».
              Изменил — посмотрел — вернул, как было.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading
            kicker="08 · самопроверка"
            title="Проверь, что осталось в голове"
            description="Небольшая проверка. Подсказки встроены — читай их даже если ответил верно."
          />
          <Quiz
            questions={[
              {
                question: "Что выбирает селектор в CSS-правиле?",
                options: [
                  "Элемент, который мы оформляем",
                  "Цвет фона",
                  "Размер шрифта",
                ],
                correct: 0,
                explanation:
                  "Селектор указывает, к каким элементам применить правило. Например, h1 выберет все заголовки первого уровня.",
              },
              {
                question: "Какой отступ находится внутри элемента, между текстом и рамкой?",
                options: ["margin", "padding", "gap"],
                correct: 1,
                explanation:
                  "padding — внутренний отступ. margin отодвигает элемент от соседей, а gap задаёт промежутки во flex-контейнере.",
              },
              {
                question: "Что делает display: flex?",
                options: [
                  "Ставит элементы в ряд и позволяет их выравнивать",
                  "Делает текст жирным",
                  "Меняет цвет страницы",
                ],
                correct: 0,
                explanation:
                  "display: flex превращает контейнер во flex-контейнер. Дальше justify-content выравнивает элементы по горизонтали.",
              },
            ]}
          />
        </section>
      </div>

      <LessonFooter done={done} onToggle={onToggle} onNavigate={onNavigate} prev="html" next="js" />
    </div>
  );
}
