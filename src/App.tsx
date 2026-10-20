import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUp, Check, Menu, Search } from "lucide-react";
import { LESSONS, PAGES, type PageId } from "./lib/content";
import { Sidebar, SidebarBreadcrumb } from "./components/Sidebar";
import { SearchDialog } from "./components/SearchDialog";
import { Home } from "./pages/Home";
import { HtmlLesson } from "./pages/HtmlLesson";
import { CssLesson } from "./pages/CssLesson";
import { JsLesson } from "./pages/JsLesson";
import { Practice } from "./pages/Practice";
import { Cheatsheet } from "./pages/Cheatsheet";
import { cn } from "./utils/cn";

const PROGRESS_KEY = "kodbase-progress-v1";

function isPageId(value: string): value is PageId {
  return Object.prototype.hasOwnProperty.call(PAGES, value);
}

function pageFromHash(): PageId {
  if (typeof window === "undefined") return "start";
  const value = window.location.hash.replace(/^#\/?/, "");
  return isPageId(value) ? value : "start";
}

function readCompleted(): PageId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is PageId => typeof item === "string" && isPageId(item));
  } catch {
    return [];
  }
}

export default function App() {
  const [page, setPage] = useState<PageId>(() => pageFromHash());
  const [completed, setCompleted] = useState<PageId[]>(() => readCompleted());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const doneCount = useMemo(
    () => LESSONS.filter((lesson) => completed.includes(lesson)).length,
    [completed],
  );

  const navigate = useCallback(
    (next: PageId) => {
      setSearchOpen(false);
      setMobileOpen(false);
      if (next === page) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      window.location.hash = next;
      setPage(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [page],
  );

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const toggleCompleted = useCallback((target: PageId) => {
    setCompleted((previous) =>
      previous.includes(target)
        ? previous.filter((item) => item !== target)
        : [...previous, target],
    );
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
    } catch {
      // Приватный режим может блокировать localStorage — прогресс просто не сохранится.
    }
  }, [completed]);

  useEffect(() => {
    const onHashChange = () => {
      setPage(pageFromHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = `${PAGES[page].title} — Кодбаза`;
  }, [page]);

  useEffect(() => {
    const locked = mobileOpen || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable === true;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
        setMobileOpen(false);
        return;
      }
      if (event.key === "/" && !isTyping && !searchOpen) {
        event.preventDefault();
        setSearchOpen(true);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen]);

  const isDone = (lesson: PageId) => completed.includes(lesson);

  return (
    <div className="min-h-screen bg-paper">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-paper"
      >
        Перейти к содержанию
      </a>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[286px] shadow-[10px_0_40px_-35px_rgba(0,0,0,0.5)] lg:block">
        <Sidebar
          current={page}
          completed={completed}
          onNavigate={navigate}
          onSearch={() => setSearchOpen(true)}
        />
      </aside>

      <div className="lg:pl-[286px]">
        <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/85 backdrop-blur-md">
          <div className="mx-auto flex h-[58px] max-w-[1000px] items-center justify-between gap-3 px-4 sm:px-7 lg:px-9">
            <div className="flex min-w-0 items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Открыть меню"
                className="-ml-1 rounded-lg p-2 text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink lg:hidden"
              >
                <Menu size={19} />
              </button>

              <div className="hidden min-w-0 lg:block">
                <SidebarBreadcrumb page={page} onNavigate={navigate} />
              </div>

              <div className="flex min-w-0 items-center gap-2 lg:hidden">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-forest font-mono text-[7px] font-bold text-lime">
                  {"</>"}
                </span>
                <span className="font-display text-[12px] font-semibold tracking-[-0.03em] text-ink">
                  кодбаза
                </span>
                <span className="truncate font-mono text-[9px] uppercase tracking-wider text-ink-soft">
                  / {PAGES[page].navTitle}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Поиск по документации"
                aria-keyshortcuts="Control+K Meta+K"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper-soft px-2.5 py-2 text-ink-soft transition-colors hover:border-forest/20 hover:bg-white hover:text-ink"
              >
                <Search size={14} />
                <span className="hidden text-[11px] font-semibold sm:inline">Поиск</span>
                <span className="hidden items-center gap-0.5 md:flex">
                  <kbd className="rounded border border-line bg-white px-1 font-mono text-[8px]">
                    ⌘
                  </kbd>
                  <kbd className="rounded border border-line bg-white px-1 font-mono text-[8px]">
                    K
                  </kbd>
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate(LESSONS.find((lesson) => !completed.includes(lesson)) ?? "practice")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper-soft px-2.5 py-2 transition-colors hover:border-forest/20 hover:bg-white"
                aria-label={`Пройдено ${doneCount} из ${LESSONS.length} глав`}
              >
                <span className="flex items-center gap-0.5" aria-hidden="true">
                  {LESSONS.map((lesson) => (
                    <span
                      key={lesson}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        completed.includes(lesson) ? "bg-forest" : "bg-line",
                      )}
                    />
                  ))}
                </span>
                <span className="font-mono text-[9px] font-medium text-ink-soft">
                  {doneCount}/{LESSONS.length}
                </span>
              </button>
            </div>
          </div>
        </header>

        <main id="main-content" className="mx-auto max-w-[1000px] px-4 pb-14 pt-4 sm:px-7 sm:pt-6 lg:px-9 lg:pb-20">
          <div className="mx-auto max-w-[860px]">
            {page === "start" && <Home onNavigate={navigate} />}
            {page === "html" && (
              <HtmlLesson
                done={isDone("html")}
                onToggle={() => toggleCompleted("html")}
                onNavigate={navigate}
              />
            )}
            {page === "css" && (
              <CssLesson
                done={isDone("css")}
                onToggle={() => toggleCompleted("css")}
                onNavigate={navigate}
              />
            )}
            {page === "js" && (
              <JsLesson
                done={isDone("js")}
                onToggle={() => toggleCompleted("js")}
                onNavigate={navigate}
              />
            )}
            {page === "practice" && (
              <Practice
                done={isDone("practice")}
                onToggle={() => toggleCompleted("practice")}
                onNavigate={navigate}
              />
            )}
            {page === "cheatsheet" && <Cheatsheet onNavigate={navigate} />}
          </div>

          <footer className="mx-auto mt-16 max-w-[860px] border-t border-line pt-6 sm:mt-20">
            <div className="flex flex-col justify-between gap-6 sm:flex-row">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-forest font-mono text-[8px] font-bold text-lime">
                    {"</>"}
                  </span>
                  <span className="font-display text-sm font-semibold tracking-[-0.03em] text-ink">
                    кодбаза
                  </span>
                </div>
                <p className="mt-2.5 max-w-[260px] text-[11px] leading-relaxed text-ink-soft">
                  Маленькая документация для большого первого шага. HTML, CSS и JavaScript без
                  сложных слов.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-line bg-paper-soft px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-ink-soft">
                    <Check size={9} />
                    {doneCount} из {LESSONS.length} глав
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate("cheatsheet")}
                    className="font-mono text-[8px] uppercase tracking-wider text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink"
                  >
                    повторение
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
                    основы
                  </p>
                  <div className="mt-2 flex flex-col items-start gap-1.5">
                    {(["html", "css", "js"] as PageId[]).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => navigate(item)}
                        className="text-[11px] font-medium text-ink/70 transition-colors hover:text-ink"
                      >
                        {PAGES[item].navTitle}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
                    практика
                  </p>
                  <div className="mt-2 flex flex-col items-start gap-1.5">
                    <button
                      type="button"
                      onClick={() => navigate("practice")}
                      className="text-[11px] font-medium text-ink/70 transition-colors hover:text-ink"
                    >
                      Мини-проект
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("cheatsheet")}
                      className="text-[11px] font-medium text-ink/70 transition-colors hover:text-ink"
                    >
                      Шпаргалка
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("start")}
                      className="text-[11px] font-medium text-ink/70 transition-colors hover:text-ink"
                    >
                      Сначала
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-soft/70">
                © 2026 кодбаза · сделано для первого шага
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                Наверх
                <ArrowUp size={12} />
              </button>
            </div>
          </footer>
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default bg-forest/50 backdrop-blur-sm"
            onClick={closeMobile}
            aria-label="Закрыть меню"
          />
          <div
            className="absolute inset-y-0 left-0 w-[88%] max-w-[330px] shadow-2xl animate-rise"
            role="dialog"
            aria-modal="true"
            aria-label="Меню документации"
          >
            <Sidebar
              current={page}
              completed={completed}
              onNavigate={navigate}
              onSearch={() => setSearchOpen(true)}
              onClose={closeMobile}
            />
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={closeSearch} onNavigate={navigate} />
    </div>
  );
}
