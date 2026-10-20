import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../utils/cn";

export type CodeLanguage = "html" | "css" | "js" | "text";

const tokenColors = {
  plain: "text-[#e7eee5]",
  comment: "text-[#86a595] italic",
  tag: "text-[#f2b07b]",
  attr: "text-[#d9f27e]",
  string: "text-[#a9d9be]",
  keyword: "text-[#f3a98f]",
  builtin: "text-[#a9cde0]",
  number: "text-[#e9d7a8]",
  punct: "text-[#8eab9b]",
};

function withKeyedSpans(parts: ReactNode[]) {
  return parts.map((part, index) => <span key={index}>{part}</span>);
}

function highlightHtml(code: string): ReactNode {
  const pattern =
    /(<!--[\s\S]*?-->)|(<\/?[a-zA-Z][\w-]*)|(\/?>)|([a-zA-Z-]+)(?=\s*=)|(=)|("[^"\n]*"|'[^'\n]*')/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > lastIndex) parts.push(code.slice(lastIndex, match.index));
    const [full, comment, tag, bracket, attribute, equals, string] = match;
    let color = tokenColors.plain;
    if (comment) color = tokenColors.comment;
    else if (tag || bracket) color = tokenColors.tag;
    else if (attribute) color = tokenColors.attr;
    else if (equals) color = tokenColors.punct;
    else if (string) color = tokenColors.string;
    parts.push(
      <span key={`t-${match.index}`} className={color}>
        {full}
      </span>,
    );
    lastIndex = match.index + full.length;
  }
  if (lastIndex < code.length) parts.push(code.slice(lastIndex));
  return withKeyedSpans(parts);
}

function highlightCss(code: string): ReactNode {
  const pattern =
    /(\/\*[\s\S]*?\*\/)|(:)(\s*)([^;{}\n]+)|([a-zA-Z-]+)(?=\s*:)|([{}])|(\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|deg)?\b)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > lastIndex) parts.push(code.slice(lastIndex, match.index));
    const [full, comment, colon, space, value, property, brace, number] = match;
    if (colon) {
      parts.push(
        <span key={`t-${match.index}`} className={tokenColors.punct}>
          {colon}
          {space}
        </span>,
        <span key={`v-${match.index}`} className={tokenColors.string}>
          {value}
        </span>,
      );
    } else {
      let color = tokenColors.plain;
      if (comment) color = tokenColors.comment;
      else if (property) color = tokenColors.attr;
      else if (brace) color = tokenColors.tag;
      else if (number) color = tokenColors.number;
      parts.push(
        <span key={`t-${match.index}`} className={color}>
          {full}
        </span>,
      );
    }
    lastIndex = match.index + full.length;
  }
  if (lastIndex < code.length) parts.push(code.slice(lastIndex));
  return withKeyedSpans(parts);
}

function highlightJs(code: string): ReactNode {
  const pattern =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`[^`]*`|"[^"\n]*"|'[^'\n]*')|\b(const|let|var|function|return|if|else|for|while|new|true|false|null)\b|\b(document|console|alert|window)\b|(\b\d+\b)|([{}()[\];,:.=+><-])/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > lastIndex) parts.push(code.slice(lastIndex, match.index));
    const [full, comment, string, keyword, builtin, number, punct] = match;
    let color = tokenColors.plain;
    if (comment) color = tokenColors.comment;
    else if (string) color = tokenColors.string;
    else if (keyword) color = tokenColors.keyword;
    else if (builtin) color = tokenColors.builtin;
    else if (number) color = tokenColors.number;
    else if (punct) color = tokenColors.punct;
    parts.push(
      <span key={`t-${match.index}`} className={color}>
        {full}
      </span>,
    );
    lastIndex = match.index + full.length;
  }
  if (lastIndex < code.length) parts.push(code.slice(lastIndex));
  return withKeyedSpans(parts);
}

function highlight(code: string, language: CodeLanguage): ReactNode {
  if (language === "html") return highlightHtml(code);
  if (language === "css") return highlightCss(code);
  if (language === "js") return highlightJs(code);
  return code;
}

export function CodeBlock({
  code,
  language = "html",
  label,
  className,
  compact = false,
}: {
  code: string;
  language?: CodeLanguage;
  label?: string;
  className?: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Буфер обмена может быть недоступен — код всё равно видно на экране.
    }
  };

  return (
    <div className={cn("min-w-0 max-w-full overflow-hidden rounded-2xl bg-forest text-paper", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-3.5 py-2.5">
        <div className="flex min-w-0 shrink items-center gap-2">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#f0a487]" />
            <span className="h-2 w-2 rounded-full bg-[#e9d7a8]" />
            <span className="h-2 w-2 rounded-full bg-[#a9cde0]" />
          </div>
          <span className="ml-1 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-paper/55">
            {label ?? language}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] text-paper/65 transition-colors hover:bg-white/10 hover:text-paper"
          aria-label="Скопировать код"
        >
          {copied ? <Check size={12} className="text-lime" /> : <Copy size={12} />}
          {copied ? "скопировано" : "копировать"}
        </button>
      </div>
      <pre
        className={cn(
          "code-scroll overflow-x-auto font-mono leading-[1.8]",
          compact ? "px-3.5 py-2.5 text-[11px]" : "px-4 py-3.5 text-[11.5px] sm:text-xs",
        )}
      >
        <code className="whitespace-pre">{highlight(code.trim(), language)}</code>
      </pre>
    </div>
  );
}
