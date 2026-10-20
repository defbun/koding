import { useMemo, useState } from "react";
import { Check, RefreshCw, X } from "lucide-react";
import { cn } from "../utils/cn";

export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export function Quiz({ questions, title = "Проверь себя" }: { questions: QuizQuestion[]; title?: string }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const progress = useMemo(() => ((index + (selected !== null ? 1 : 0)) / questions.length) * 100, [index, selected, questions.length]);

  const choose = (option: number) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === current.correct) setScore((value) => value + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper-soft">
      <div className="flex items-center justify-between gap-3 bg-forest px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime font-mono text-[10px] font-bold text-forest">
            ?
          </span>
          <span className="text-sm font-bold text-paper">{title}</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-paper/55">
          {finished ? "результат" : `${index + 1} / ${questions.length}`}
        </span>
      </div>
      <div className="h-1 bg-paper-deep">
        <div
          className="h-full rounded-r-full bg-lime transition-all duration-500"
          style={{ width: `${finished ? 100 : progress}%` }}
        />
      </div>

      {finished ? (
        <div className="p-5 text-center sm:p-7">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-forest animate-soft-pop">
            <span className="font-display text-xl font-semibold">
              {score}/{questions.length}
            </span>
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold text-ink">
            {score === questions.length
              ? "Всё верно. База усвоена!"
              : score >= questions.length / 2
                ? "Хороший старт. Уже понятно!"
                : "Нормально: новички так и учатся."}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
            {score === questions.length
              ? "Возвращайся к этой главе, когда понадобится освежить память."
              : "Перечитай примеры выше и попробуй ещё раз — без спешки всё получится."}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-forest/30"
          >
            <RefreshCw size={14} />
            Пройти ещё раз
          </button>
        </div>
      ) : (
        <div className="p-4 sm:p-5">
          <h3 className="text-base font-bold leading-snug text-ink sm:text-lg">{current.question}</h3>
          <div className="mt-4 space-y-2">
            {current.options.map((option, optionIndex) => {
              const isCorrect = optionIndex === current.correct;
              const isSelected = optionIndex === selected;
              const answered = selected !== null;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(optionIndex)}
                  disabled={answered}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition-colors",
                    !answered && "border-line bg-white text-ink hover:border-forest/30 hover:bg-lime-soft/30",
                    answered && isCorrect && "border-[#aac76a] bg-lime-soft text-forest",
                    answered && isSelected && !isCorrect && "border-[#e2ae9a] bg-coral-soft text-[#572515]",
                    answered && !isCorrect && !isSelected && "border-line bg-white text-ink/40",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border font-mono text-[10px]",
                      answered && isCorrect
                        ? "border-[#aac76a] bg-lime text-forest"
                        : answered && isSelected
                          ? "border-[#e2ae9a] bg-coral text-[#572515]"
                          : "border-line bg-paper-soft text-ink-soft",
                    )}
                  >
                    {answered && isCorrect ? (
                      <Check size={13} strokeWidth={3} />
                    ) : answered && isSelected ? (
                      <X size={13} strokeWidth={3} />
                    ) : (
                      String.fromCharCode(65 + optionIndex)
                    )}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div
              className={cn(
                "mt-3 rounded-xl border px-3.5 py-3 text-xs leading-relaxed animate-rise",
                selected === current.correct
                  ? "border-[#d1e3a0] bg-white/60 text-forest"
                  : "border-[#e8c4b5] bg-white/60 text-ink",
              )}
            >
              <span className="font-bold">
                {selected === current.correct ? "Точно в цель. " : "Почти. "}
              </span>
              {current.explanation}
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={next}
              disabled={selected === null}
              className="inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-sm font-bold text-paper transition-all hover:bg-forest-light disabled:cursor-not-allowed disabled:opacity-30"
            >
              {index + 1 === questions.length ? "Показать результат" : "Дальше"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
