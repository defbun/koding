import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  Info,
  Lightbulb,
  Lock,
  PlayCircle,
  TriangleAlert,
} from "lucide-react";
import { cn } from "../utils/cn";
import type { PageId, Tone } from "../lib/content";

export const toneStyles: Record<
  Tone,
  { dot: string; soft: string; icon: string; text: string; border: string }
> = {
  html: {
    dot: "bg-coral",
    soft: "bg-coral-soft",
    icon: "text-[#a84b27]",
    text: "text-[#a84b27]",
    border: "border-[#efc3b0]",
  },
  css: {
    dot: "bg-sky",
    soft: "bg-sky-soft",
    icon: "text-[#2f6784]",
    text: "text-[#2f6784]",
    border: "border-[#bcd9e6]",
  },
  js: {
    dot: "bg-sand",
    soft: "bg-sand-soft",
    icon: "text-[#876713]",
    text: "text-[#876713]",
    border: "border-[#e6d49d]",
  },
  practice: {
    dot: "bg-lime",
    soft: "bg-lime-soft",
    icon: "text-forest",
    text: "text-forest",
    border: "border-[#d4e5a1]",
  },
  neutral: {
    dot: "bg-forest",
    soft: "bg-paper-deep",
    icon: "text-forest",
    text: "text-forest",
    border: "border-line",
  },
};

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-line bg-paper-soft px-1.5 font-mono text-[10px] font-medium text-ink-soft">
      {children}
    </kbd>
  );
}

export function Callout({
  variant = "tip",
  title,
  children,
}: {
  variant?: "tip" | "note" | "warn";
  title: string;
  children: ReactNode;
}) {
  const styles = {
    tip: {
      wrap: "bg-lime-soft/70 border-[#d6e5ac]",
      badge: "bg-lime text-forest",
      Icon: Lightbulb,
    },
    note: {
      wrap: "bg-sky-soft/60 border-[#c6dde8]",
      badge: "bg-sky text-[#173f52]",
      Icon: Info,
    },
    warn: {
      wrap: "bg-coral-soft/60 border-[#edc7b7]",
      badge: "bg-coral text-[#572515]",
      Icon: TriangleAlert,
    },
  }[variant];

  return (
    <div className={cn("flex min-w-0 max-w-full gap-3 rounded-2xl border p-4 sm:gap-4 sm:p-5", styles.wrap)}>
      <span
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          styles.badge,
        )}
      >
        <styles.Icon size={16} strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold leading-snug text-ink">{title}</p>
        <div className="mt-1 text-sm leading-relaxed text-ink/75 [&_code]:rounded [&_code]:bg-white/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8em] [&_code]:text-ink">
          {children}
        </div>
      </div>
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  className,
}: {
  kicker?: string;
  title: string;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 sm:mb-6", className)}>
      {kicker && (
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-soft">
            {kicker}
          </span>
          <span className="h-px w-8 bg-line" />
        </div>
      )}
      <h2 className="text-balance font-display text-[1.45rem] font-semibold leading-[1.2] tracking-[-0.025em] text-ink sm:text-[1.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 max-w-2xl text-pretty text-sm leading-relaxed text-ink-soft sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export function LessonHeader({
  chapter,
  title,
  lead,
  minutes,
  examples,
  tone,
  learn,
}: {
  chapter: string;
  title: string;
  lead: string;
  minutes: number;
  examples: number;
  tone: Tone;
  learn?: string[];
}) {
  const accent = toneStyles[tone];

  return (
    <header className="relative pt-4 sm:pt-7">
      <div
        className={cn(
          "pointer-events-none absolute -top-4 right-0 h-40 w-40 rounded-full opacity-50 blur-3xl",
          accent.soft,
        )}
        aria-hidden="true"
      />
      <div className="relative flex items-center gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border bg-paper-soft px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink/75",
            accent.border,
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", accent.dot)} />
          {chapter}
        </span>
        <span className="h-px flex-1 bg-line" />
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft sm:block">
          кодбаза / документация
        </span>
      </div>

      <h1 className="relative mt-5 max-w-3xl text-balance font-display text-[clamp(2rem,5.4vw,3.3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg sm:leading-relaxed">
        {lead}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-soft px-3 py-1.5 text-xs font-semibold text-ink/75">
          <Clock size={13} strokeWidth={2} />
          {minutes} минут
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-soft px-3 py-1.5 text-xs font-semibold text-ink/75">
          <PlayCircle size={13} strokeWidth={2} />
          {examples} живых примеров
        </span>
        <span className="rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-lime">
          для новичков
        </span>
      </div>

      {learn && learn.length > 0 && (
        <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-paper-soft/80">
          <p className="border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            после этой главы
          </p>
          <div className="divide-y divide-line sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {learn.map((item) => (
              <div key={item} className="flex items-start gap-2.5 px-4 py-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lime text-forest">
                  <Check size={11} strokeWidth={3} />
                </span>
                <span className="text-xs font-medium leading-relaxed text-ink/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr className="mt-8 border-line" />
    </header>
  );
}

export function DemoFrame({
  children,
  url = "твой-сайт.html",
  label,
  className,
  bodyClassName,
}: {
  children: ReactNode;
  url?: string;
  label?: string;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_45px_-32px_rgba(21,42,32,0.55)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-paper-soft px-3 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-coral" />
          <span className="h-2 w-2 rounded-full bg-sand" />
          <span className="h-2 w-2 rounded-full bg-sky" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-[240px] items-center justify-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1">
          <Lock size={9} className="shrink-0 text-ink-soft" />
          <span className="truncate font-mono text-[9px] text-ink-soft sm:text-[10px]">{url}</span>
        </div>
        <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-wider text-ink-soft sm:block">
          {label ?? "превью"}
        </span>
        {!label && <span className="w-6 sm:block" />}
      </div>
      <div className={cn("bg-white", bodyClassName)}>{children}</div>
    </div>
  );
}

export function LessonFooter({
  done,
  onToggle,
  next,
  onNavigate,
  prev,
  nextLabel,
}: {
  done: boolean;
  onToggle: () => void;
  next?: PageId;
  prev?: PageId;
  nextLabel?: string;
  onNavigate: (page: PageId) => void;
}) {
  return (
    <div className="mt-12 border-t border-line pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors",
              done
                ? "border-[#c7da92] bg-lime-soft text-forest"
                : "border-line bg-paper-soft text-ink hover:border-forest/30 hover:bg-white",
            )}
            aria-pressed={done}
          >
            {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            {done ? "Глава пройдена" : "Отметить пройденной"}
          </button>
          {prev && (
            <button
              type="button"
              onClick={() => onNavigate(prev)}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft size={15} />
              Назад
            </button>
          )}
        </div>

        {next && (
          <button
            type="button"
            onClick={() => onNavigate(next)}
            className="group inline-flex items-center justify-between gap-4 rounded-xl bg-forest px-4 py-3 text-left text-sm font-bold text-paper transition-colors hover:bg-forest-light"
          >
            <span>
              <span className="block font-mono text-[9px] font-normal uppercase tracking-[0.14em] text-lime/80">
                {nextLabel ?? "следующая глава"}
              </span>
              {next === "css"
                ? "CSS: одеваем страницу"
                : next === "js"
                  ? "JavaScript: добавляем жизнь"
                  : next === "practice"
                    ? "Мини-проект"
                    : "Шпаргалка"}
            </span>
            <ArrowRight
              size={17}
              className="shrink-0 transition-transform group-hover:translate-x-1"
            />
          </button>
        )}
      </div>
    </div>
  );
}
