import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowUpRight, CornerDownLeft, Search, X } from "lucide-react";
import { PAGES, SEARCH_INDEX, type PageId } from "../lib/content";
import { cn } from "../utils/cn";
import { toneStyles } from "./ui";

export function SearchDialog({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return SEARCH_INDEX.slice(0, 7);
    return SEARCH_INDEX.filter((entry) =>
      `${entry.title} ${entry.hint} ${entry.chapter}`.toLowerCase().includes(needle),
    ).slice(0, 9);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const choose = (page: PageId) => {
    onNavigate(page);
    onClose();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => Math.min(value + 1, Math.max(results.length - 1, 0)));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    }
    if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      choose(results[active].page);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-forest/45 px-4 pb-4 pt-[8vh] backdrop-blur-sm sm:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Поиск по документации"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_80px_-20px_rgba(18,53,41,0.6)] animate-soft-pop">
        <div className="flex items-center gap-2.5 border-b border-line bg-white/70 px-3.5 py-3">
          <Search size={16} className="shrink-0 text-ink-soft" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Найди тему, тег или команду…"
            aria-label="Поисковый запрос"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink-soft/60"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Очистить поиск"
              className="rounded-md p-1 text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
            >
              <X size={13} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-line bg-paper px-1.5 py-1 font-mono text-[9px] text-ink-soft transition-colors hover:text-ink"
            >
              esc
            </button>
          )}
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2" role="listbox" aria-label="Результаты поиска">
          <p className="px-2.5 pb-1.5 pt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
            {query ? `результаты · ${results.length}` : "начни отсюда"}
          </p>
          {results.length === 0 ? (
            <div className="flex flex-col items-center px-5 py-8 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-deep text-ink-soft">
                <Search size={17} />
              </span>
              <p className="mt-3 text-sm font-bold text-ink">Ничего не нашлось</p>
              <p className="mt-1 max-w-[250px] text-[11px] leading-relaxed text-ink-soft">
                Попробуй «отступы», «тег», «кнопка» или «переменные».
              </p>
            </div>
          ) : (
            results.map((entry, index) => {
              const tone = toneStyles[PAGES[entry.page].tone];
              return (
                <button
                  key={`${entry.page}-${entry.title}`}
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(entry.page)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-colors",
                    index === active ? "bg-lime-soft" : "hover:bg-paper-soft",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                      tone.soft,
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", tone.dot)} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-bold text-ink">
                      {entry.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[10px] text-ink-soft">
                      {entry.hint}
                    </span>
                  </span>
                  <span className="hidden shrink-0 font-mono text-[8px] uppercase tracking-wider text-ink-soft sm:block">
                    {entry.chapter.split("·")[0]}
                  </span>
                  <ArrowUpRight size={13} className="shrink-0 text-ink-soft/50" />
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-line bg-paper-soft px-3.5 py-2.5">
          <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-ink-soft">
            <CornerDownLeft size={10} />
            enter — открыть
          </span>
          <span className="font-mono text-[8px] uppercase tracking-wider text-ink-soft/60">
            документация целиком
          </span>
        </div>
      </div>
    </div>
  );
}
