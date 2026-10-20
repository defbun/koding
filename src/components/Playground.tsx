import { useEffect, useState } from "react";
import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "../utils/cn";

type Tab = "html" | "css" | "js";

const tabInfo: Record<Tab, { label: string; dot: string; filename: string }> = {
  html: { label: "HTML", dot: "bg-coral", filename: "index.html" },
  css: { label: "CSS", dot: "bg-sky", filename: "style.css" },
  js: { label: "JS", dot: "bg-sand", filename: "script.js" },
};

export type PlaygroundProps = {
  initialHtml: string;
  initialCss: string;
  initialJs: string;
};

function buildDocument(html: string, css: string, js: string) {
  const safeJs = js.replace(/<\/script/gi, "<\\/script");
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 22px; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; color: #152a20; background: #ffffff; }
  ${css}
</style>
</head>
<body>
${html}
<script>${safeJs}</script>
</body>
</html>`;
}

export function Playground({
  initialHtml,
  initialCss,
  initialJs,
  title = "Живая песочница",
}: PlaygroundProps & { title?: string }) {
  const initial = { html: initialHtml, css: initialCss, js: initialJs };
  const [tab, setTab] = useState<Tab>("html");
  const [code, setCode] = useState<Record<Tab, string>>(initial);
  const [doc, setDoc] = useState(() => buildDocument(initialHtml, initialCss, initialJs));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDoc(buildDocument(code.html, code.css, code.js));
    }, 260);
    return () => window.clearTimeout(timer);
  }, [code]);

  const updateCode = (value: string) => {
    setCode((previous) => ({ ...previous, [tab]: value }));
  };

  const reset = () => {
    setCode(initial);
    setDoc(buildDocument(initialHtml, initialCss, initialJs));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code[tab]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ничего страшного: можно выделить код вручную.
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper-soft p-2 sm:p-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-2.5 pt-1">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-lime">
            <Sparkles size={12} />
          </span>
          <span className="text-sm font-bold text-ink">{title}</span>
          <span className="hidden rounded-full border border-line bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-soft sm:block">
            online
          </span>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
          меняй код — результат обновится
        </p>
      </div>

      <div className="grid gap-2 sm:gap-2.5 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-forest shadow-lg shadow-forest/10">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-white/[0.03] pr-2">
            <div className="no-scrollbar flex overflow-x-auto" role="tablist" aria-label="Файлы кода">
              {(Object.keys(tabInfo) as Tab[]).map((item) => {
                const info = tabInfo[item];
                const active = item === tab;
                return (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(item)}
                    className={cn(
                      "relative flex shrink-0 items-center gap-1.5 px-3 py-3 font-mono text-[10px] font-medium uppercase tracking-wide transition-colors",
                      active ? "text-paper" : "text-paper/45 hover:text-paper/75",
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", info.dot)} />
                    {info.label}
                    {active && (
                      <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-lime" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              <button
                type="button"
                onClick={copy}
                aria-label="Скопировать активный файл"
                className="rounded-md p-1.5 text-paper/55 transition-colors hover:bg-white/10 hover:text-paper"
              >
                {copied ? <Check size={13} className="text-lime" /> : <Copy size={13} />}
              </button>
              <button
                type="button"
                onClick={reset}
                aria-label="Сбросить код"
                className="rounded-md p-1.5 text-paper/55 transition-colors hover:bg-white/10 hover:text-paper"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>
          <textarea
            value={code[tab]}
            onChange={(event) => updateCode(event.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-label={`Код: ${tabInfo[tab].filename}`}
            className="code-scroll h-[250px] w-full resize-none bg-transparent p-3.5 font-mono text-[11.5px] leading-[1.75] text-[#e7eee5] outline-none placeholder:text-paper/30 sm:h-[286px] sm:p-4 sm:text-xs"
          />
          <div className="flex items-center justify-between border-t border-white/10 px-3.5 py-2 font-mono text-[9px] text-paper/40">
            <span>{tabInfo[tab].filename}</span>
            <span>utf-8 · только твой браузер</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex items-center gap-2 border-b border-line bg-paper-soft px-3 py-2.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-coral" />
              <span className="h-2 w-2 rounded-full bg-sand" />
              <span className="h-2 w-2 rounded-full bg-sky" />
            </div>
            <div className="mx-auto flex min-w-0 max-w-[220px] items-center justify-center rounded-md border border-line bg-white px-2 py-1">
              <span className="truncate font-mono text-[9px] text-ink-soft">
                твой-сайт.html
              </span>
            </div>
            <span className="w-6" aria-hidden="true" />
          </div>
          <iframe
            title="Живой результат кода"
            sandbox="allow-scripts"
            srcDoc={doc}
            className="h-[250px] w-full flex-1 bg-white sm:h-[286px]"
          />
        </div>
      </div>
      <p className="px-2 pb-1 pt-2.5 text-[11px] leading-relaxed text-ink-soft">
        Это безопасный черновик: всё работает только в твоём браузере. Смело ломай и пробуй снова.
      </p>
    </div>
  );
}
