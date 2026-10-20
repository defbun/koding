import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  ChevronRight,
  Code2,
  Compass,
  Palette,
  Rocket,
  Search,
  Sparkles,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { LESSONS, NAV_GROUPS, PAGES, type PageId } from "../lib/content";
import { cn } from "../utils/cn";

const navIcons: Record<PageId, LucideIcon> = {
  start: Compass,
  html: Code2,
  css: Palette,
  js: Zap,
  practice: Rocket,
  cheatsheet: BookMarked,
};

const pageOrder: PageId[] = ["start", "html", "css", "js", "practice", "cheatsheet"];

export function Sidebar({
  current,
  completed,
  onNavigate,
  onSearch,
  onClose,
}: {
  current: PageId;
  completed: PageId[];
  onNavigate: (page: PageId) => void;
  onSearch: () => void;
  onClose?: () => void;
}) {
  const completedLessons = LESSONS.filter((lesson) => completed.includes(lesson));
  const nextLesson = LESSONS.find((lesson) => !completed.includes(lesson)) ?? "practice";

  return (
    <div className="flex h-full flex-col bg-forest text-paper">
      <div className="px-4 pb-4 pt-5 sm:px-5">
        <div className="flex items-start justify-between">
          <button
            type="button"
            onClick={() => {
              onNavigate("start");
              onClose?.();
            }}
            className="group flex items-center gap-2.5 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime font-mono text-[11px] font-bold tracking-tighter text-forest shadow-[inset_0_-2px_0_rgba(18,53,41,0.15)] transition-transform group-hover:-rotate-3">
              {"</>"}
            </span>
            <span>
              <span className="block font-display text-[15px] font-semibold leading-none tracking-[-0.03em] text-paper">
                кодбаза
              </span>
              <span className="mt-1.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-paper/40">
                основы кода · для своих
              </span>
            </span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть меню"
              className="rounded-lg p-2 text-paper/60 transition-colors hover:bg-white/10 hover:text-paper"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            onClose?.();
            onSearch();
          }}
          className="mt-5 flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-left text-paper/60 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-paper"
        >
          <Search size={14} className="shrink-0" />
          <span className="flex-1 text-[11px] font-medium">Найти в документации</span>
          <span className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[8px] text-paper/45">
            ⌘K
          </span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4" aria-label="Разделы документации">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4 last:mb-0">
            <p className="mb-1.5 px-2 font-mono text-[8px] uppercase tracking-[0.18em] text-paper/30">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const page = PAGES[item];
                const Icon = navIcons[item];
                const active = item === current;
                const isDone = completed.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      onNavigate(item);
                      onClose?.();
                    }}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors",
                      active
                        ? "bg-lime text-forest shadow-[0_6px_18px_-12px_rgba(0,0,0,0.5)]"
                        : "text-paper/70 hover:bg-white/[0.06] hover:text-paper",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                        active
                          ? "bg-forest/10 text-forest"
                          : "bg-white/[0.05] text-paper/45 group-hover:text-paper/75",
                      )}
                    >
                      <Icon size={14} strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-semibold">
                        {page.navTitle}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block truncate text-[9.5px] leading-tight",
                          active ? "text-forest/60" : "text-paper/35",
                        )}
                      >
                        {page.description}
                      </span>
                    </span>
                    {isDone ? (
                      <CheckCircle2
                        size={13}
                        className={cn("shrink-0", active ? "text-forest" : "text-lime/70")}
                      />
                    ) : (
                      <span
                        className={cn(
                          "shrink-0 font-mono text-[8px]",
                          active ? "text-forest/35" : "text-paper/20",
                        )}
                      >
                        {String(pageOrder.indexOf(item) + 1).padStart(2, "0")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3 sm:p-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-paper/40">
              <Sparkles size={10} className="text-lime/70" />
              твой прогресс
            </span>
            <span className="font-display text-[11px] font-semibold text-lime">
              {completedLessons.length}/{LESSONS.length}
            </span>
          </div>
          <div className="mt-2.5 flex gap-1" aria-hidden="true">
            {LESSONS.map((lesson) => (
              <span
                key={lesson}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  completed.includes(lesson) ? "bg-lime" : "bg-white/10",
                )}
              />
            ))}
          </div>
          <p className="mt-2.5 text-[10px] leading-relaxed text-paper/45">
            {completedLessons.length === LESSONS.length
              ? "Все главы пройдены. Можно повторять и экспериментировать."
              : completedLessons.length === 0
                ? "Начни с HTML — это проще, чем кажется."
                : `Осталось ${LESSONS.length - completedLessons.length} ${LESSONS.length - completedLessons.length === 1 ? "глава" : "главы"}. Продолжай в своём темпе.`}
          </p>
          <button
            type="button"
            onClick={() => {
              onNavigate(nextLesson);
              onClose?.();
            }}
            className="mt-3 flex w-full items-center justify-between rounded-lg bg-lime px-3 py-2 text-[10px] font-bold text-forest transition-colors hover:bg-lime/85"
          >
            {completedLessons.length === LESSONS.length ? "Повторить практику" : "Продолжить"}
            <ArrowRight size={12} />
          </button>
        </div>
        <p className="mt-3 px-1 font-mono text-[8px] uppercase tracking-[0.1em] text-paper/25">
          маленькая документация · 2026
        </p>
      </div>
    </div>
  );
}

export function SidebarBreadcrumb({ page, onNavigate }: { page: PageId; onNavigate: (page: PageId) => void }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-[11px]">
      <button
        type="button"
        onClick={() => onNavigate("start")}
        className="hidden items-center gap-1.5 text-ink-soft transition-colors hover:text-ink sm:flex"
      >
        <BookMarked size={12} />
        Документация
      </button>
      <ChevronRight size={11} className="hidden shrink-0 text-ink-soft/40 sm:block" />
      <span className="truncate font-semibold text-ink">{PAGES[page].navTitle}</span>
    </div>
  );
}
