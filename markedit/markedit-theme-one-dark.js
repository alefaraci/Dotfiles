"use strict";
const nt = require("@codemirror/state"),
  t = require("@lezer/highlight"),
  f = require("markedit-api"),
  D = require("@codemirror/view"),
  x = require("@codemirror/language"),
  F = window,
  st = F.__extractStyleRules__ ?? ((o) => o.value?.rules),
  it = F.__extractHighlightSpecs__ ?? ((o) => o.value?.specs);
function lt(o) {
  const n = document.createElement("style");
  return ((n.textContent = o), document.head.appendChild(n), n);
}
function gt(o) {
  if (o.length === 0) return [{}, []];
  const n = T(o);
  return [
    Object.fromEntries(
      n.flatMap((a) => {
        const r =
          st(a)?.join(`
`) ?? "";
        return Object.entries(dt(r));
      }),
    ),
    n.flatMap((a) => it(a) ?? []),
  ];
}
function h(o, n, c) {
  return (
    o.find(
      (a) => !!(a.tag.toString().includes(n.toString()) && a.color !== void 0),
    )?.color ?? c
  );
}
function $(o, n, c) {
  for (const [a, r] of Object.entries(o))
    if (a.includes(n) && (c === void 0 || !a.includes(c))) {
      const e = r.background ?? r.backgroundColor;
      if (e !== void 0) return e;
    }
}
function y(o, n = 0.6) {
  const c = o.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
  if (c === null) return;
  const [a, r, e] = c.slice(1, 4).map(Number);
  return `rgba(${a}, ${r}, ${e}, ${n})`;
}
function G(o) {
  const n = (r) => r !== null && typeof r == "object";
  if (!n(o)) return !0;
  const c = Object.entries(o),
    a = (r) => r != null;
  for (const [, r] of c)
    if (n(r)) {
      if (!G(r)) return !1;
    } else if (a(r)) return !1;
  return !0;
}
function T(o) {
  return Array.isArray(o)
    ? o.flatMap(T)
    : "extension" in o
      ? T(o.extension)
      : [o];
}
function dt(o) {
  const n = {},
    c = new CSSStyleSheet();
  c.replaceSync(o);
  for (const a of c.cssRules) {
    const { style: r, selectorText: e } = a,
      { background: i, backgroundColor: d } = r;
    ((n[e] = {}),
      i.length > 0 && (n[e].background = i),
      d.length > 0 && (n[e].backgroundColor = d));
  }
  return n;
}
const M = (o, n = {}) => o ?? n,
  ut = M(f.MarkEdit.userSettings),
  E = K("extension.markeditTheming"),
  mt = B(!1) ? M(E.lightTheme) : void 0,
  ht = B(!0) ? M(E.darkTheme) : void 0;
function K(o) {
  return o === void 0 ? {} : M(ut[o]);
}
function U(o) {
  return o.enabledMode ?? "both";
}
function B(o, n = U(E)) {
  return ["both", o ? "dark" : "light"].includes(n);
}
function ft(o, n, c) {
  const a = pt({ lhs: c, rhs: o ? ht : mt });
  return (
    T(n ?? []).forEach((e) => {
      const i = e;
      i.value &&
        Array.isArray(i.value?.rules) &&
        (i.value.rules = i.value?.rules.filter(
          (d) => !`${d}`.includes(".cm-tooltip"),
        ));
    }),
    {
      extensions: [...(o ? j(a, { dark: !0 }) : j(a)), n].filter(
        (e) => e !== void 0,
      ),
      colors: a,
    }
  );
}
function j(o, n) {
  const c = {},
    a = [],
    r = o.editor,
    e = o.highlight;
  (r?.textColor &&
    ((c["&"] ??= {}),
    (c["&"].color = r?.textColor),
    (c[".cm-activeLineGutter"] = { backgroundColor: r?.textColor })),
    r?.backgroundColor &&
      ((c["&"] ??= {}), (c["&"].backgroundColor = r?.backgroundColor)),
    r?.activeLineBackground &&
      (c[".cm-activeLine"] = { backgroundColor: r?.activeLineBackground }),
    r?.caretColor &&
      ((c[".cm-content"] = { caretColor: r?.caretColor }),
      (c[".cm-cursor, .cm-dropCursor"] = { borderLeftColor: r?.caretColor })),
    r?.selectionBackground &&
      (c[
        "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection"
      ] = { backgroundColor: r?.selectionBackground }),
    r?.matchingBracketBackground &&
      (c[
        "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket"
      ] = { backgroundColor: r?.matchingBracketBackground }),
    r?.gutterText &&
      ((c[".cm-gutters"] ??= {}), (c[".cm-gutters"].color = r?.gutterText)),
    r?.gutterBackground &&
      ((c[".cm-gutters"] ??= {}),
      (c[".cm-gutters"].backgroundColor = r?.gutterBackground),
      (c[".cm-gutters"].border = "none")),
    r?.foldPlaceholderText &&
      ((c[".cm-foldPlaceholder"] ??= {}),
      (c[".cm-foldPlaceholder"].color = r?.foldPlaceholderText)),
    r?.foldPlaceholderBackground &&
      ((c[".cm-foldPlaceholder"] ??= {}),
      (c[".cm-foldPlaceholder"].backgroundColor = r?.foldPlaceholderBackground),
      (c[".cm-foldPlaceholder"].border = "none")),
    r?.searchMatchBackground &&
      (c[".cm-searchMatch"] = { backgroundColor: r?.searchMatchBackground }),
    r?.selectionMatchBackground &&
      (c[".cm-selectionMatch"] = {
        backgroundColor: r?.selectionMatchBackground,
      }),
    e?.heading && a.push({ tag: t.tags.heading, color: e?.heading }),
    e?.bold && a.push({ tag: t.tags.strong, color: e?.bold }),
    e?.italic && a.push({ tag: t.tags.emphasis, color: e?.italic }),
    e?.strikethrough &&
      a.push({ tag: t.tags.strikethrough, color: e?.strikethrough }),
    e?.quote && a.push({ tag: t.tags.quote, color: e?.quote }),
    e?.link && a.push({ tag: [t.tags.url, t.tags.link], color: e?.link }),
    e?.divider && a.push({ tag: t.tags.contentSeparator, color: e?.divider }),
    e?.comment && a.push({ tag: t.tags.comment, color: e?.comment }),
    e?.meta && a.push({ tag: t.tags.meta, color: e?.meta }),
    e?.keyword && a.push({ tag: t.tags.keyword, color: e?.keyword }),
    e?.atom && a.push({ tag: [t.tags.atom, t.tags.bool], color: e?.atom }),
    e?.literal &&
      a.push({ tag: [t.tags.literal, t.tags.inserted], color: e?.literal }),
    e?.string &&
      a.push({ tag: [t.tags.string, t.tags.deleted], color: e?.string }),
    e?.special &&
      a.push({
        tag: [t.tags.regexp, t.tags.escape, t.tags.special(t.tags.string)],
        color: e?.special,
      }),
    e?.variable &&
      a.push({
        tag: t.tags.definition(t.tags.variableName),
        color: e?.variable,
      }),
    e?.local &&
      a.push({ tag: t.tags.local(t.tags.variableName), color: e?.local }),
    e?.type &&
      a.push({ tag: [t.tags.typeName, t.tags.namespace], color: e?.type }),
    e?.class && a.push({ tag: t.tags.className, color: e?.class }),
    e?.macro &&
      a.push({
        tag: [t.tags.special(t.tags.variableName), t.tags.macroName],
        color: e?.macro,
      }),
    e?.property &&
      a.push({
        tag: t.tags.definition(t.tags.propertyName),
        color: e?.property,
      }),
    e?.label && a.push({ tag: t.tags.labelName, color: e?.label }),
    e?.operator &&
      a.push({
        tag: [t.tags.operator, t.tags.operatorKeyword],
        color: e?.operator,
      }),
    e?.constant &&
      a.push({
        tag: [
          t.tags.color,
          t.tags.constant(t.tags.name),
          t.tags.standard(t.tags.name),
        ],
        color: e?.constant,
      }),
    e?.instruction &&
      a.push({
        tag: [
          t.tags.separator,
          t.tags.processingInstruction,
          t.tags.definition(t.tags.name),
        ],
        color: e?.instruction,
      }),
    e?.invalid && a.push({ tag: t.tags.invalid, color: e?.invalid }));
  const i = [];
  return (
    Object.keys(c).length > 0 && i.push(D.EditorView.theme(c, n)),
    a.length > 0 && i.push(x.syntaxHighlighting(x.HighlightStyle.define(a))),
    i
  );
}
function pt(o) {
  return {
    editor: { ...o.lhs?.editor, ...o.rhs?.editor },
    highlight: { ...o.lhs?.highlight, ...o.rhs?.highlight },
    allowsFallback: o.rhs?.allowsFallback ?? o.lhs?.allowsFallback,
  };
}
const s = {
    selectionBackground: ".cm-selectionBackground",
    primaryText:
      ".cm-lineNumbers > .cm-activeLineGutter, .cm-tooltip-autocomplete ul li, .cm-tooltip-autocomplete ul li[aria-selected]",
    secondaryText:
      ".cm-foldGutter, .cm-foldPlaceholder, .cm-visibleSpace, .cm-visibleSpace::before, .cm-visibleLineBreak, .cm-visibleLineBreak::before",
    matchingBracket: ".cm-matchingBracket",
    activeIndicator: ".cm-md-activeIndicator",
    accentColor:
      ".cm-md-header:not(.tok-meta):not(.cm-md-quote), .cm-md-codeInfo, .cm-completionMatchedText",
    syntaxMarker:
      ".cm-md-header.tok-meta:not(.cm-md-quote), .cm-md-codeMark, .cm-md-linkMark, .cm-md-listMark, .cm-md-quoteMark, .cm-md-bold.tok-meta, .cm-md-italic.tok-meta, .cm-md-strikethrough.tok-meta",
    boldText: ".cm-md-bold:not(.tok-meta)",
    italicText: ".cm-md-italic:not(.tok-meta)",
    quoteText: ".cm-md-quote:not(.cm-md-quoteMark)",
    dividerColor: ".cm-md-horizontalRule",
    autocomplete: ".cm-tooltip-autocomplete",
    autocompleteHighlight: ".cm-tooltip-autocomplete ul li[aria-selected]",
  },
  kt = `
.cm-activeLineGutter { background: inherit !important }
.cm-searchMatch.cm-searchMatch-selected { outline: inherit !important }
${s.primaryText} {}
${s.secondaryText} {}
${s.matchingBracket} {}
${s.activeIndicator} {}
${s.accentColor} {}
${s.syntaxMarker} {}
${s.boldText} {}
${s.italicText} {}
${s.quoteText} {}
${s.dividerColor} {}
${s.autocomplete} {}
${s.autocompleteHighlight} {}
`;
function bt(o) {
  const n = o.options?.settingsKey,
    c = U(K(n));
  (o.light !== void 0 && B(!1, c) && (l().customThemes.light = o.light),
    o.dark !== void 0 && B(!0, c) && (l().customThemes.dark = o.dark),
    typeof f.MarkEdit.editorView == "object" && N(f.MarkEdit.editorView));
}
const C = window,
  l = () => C.__markeditTheming__,
  W = matchMedia("(prefers-color-scheme: dark)");
typeof l() != "object" && yt();
function yt() {
  ((C.__markeditTheming__ = {
    styleSheet: lt(kt),
    configurator: new nt.Compartment(),
    customThemes: {},
    lightOriginalRules: {},
    darkOriginalRules: {},
  }),
    f.MarkEdit.addExtension(l().configurator.of([])),
    f.MarkEdit.onEditorReady((n) => N(n)));
  const o = () => setTimeout(() => N(f.MarkEdit.editorView), 200);
  (W.addEventListener("change", o),
    (l().mainThemeName = C.config.theme),
    Object.defineProperty(C.config, "theme", {
      get() {
        return l().mainThemeName;
      },
      set(n) {
        ((l().mainThemeName = n), o());
      },
    }));
}
function N(o) {
  const n = W.matches,
    c = n ? l().customThemes.dark : l().customThemes.light,
    { extensions: a, colors: r } = ft(n, c?.extension, c?.colors);
  o.dispatch({ effects: l().configurator.reconfigure(a) });
  const [e, i] = gt(a),
    d = a.length === 0 && G(r),
    k = r.allowsFallback ?? c?.extension !== void 0;
  ((l().styleSheet.disabled = d), Ct(o, n, d, e, i, r, k));
}
function Ct(o, n, c, a, r, e, i) {
  const d = $(a, ".cm-activeLine", ".cm-activeLineGutter"),
    k = $(a, s.selectionBackground),
    z = $(a, s.matchingBracket),
    J = getComputedStyle(o.dom).backgroundColor,
    p = getComputedStyle(o.contentDOM).color,
    Q = e.editor?.visibleSpaceColor ?? y(p),
    m = i ? p : void 0,
    P = h(r, t.tags.heading, m),
    X = h(r, t.tags.processingInstruction, m),
    Y = h(r, t.tags.strong, m),
    Z = h(r, t.tags.emphasis, m),
    tt = h(r, t.tags.quote, m),
    et = h(r, t.tags.contentSeparator, m),
    ot = [
      [s.activeIndicator, d, "background"],
      [s.matchingBracket, z, "background"],
      [s.primaryText, p, "color"],
      [s.secondaryText, Q, "color"],
      [s.accentColor, P, "color"],
      [s.syntaxMarker, X, "color"],
      [s.boldText, Y, "color"],
      [s.italicText, Z, "color"],
      [s.quoteText, tt, "color"],
      [s.dividerColor, et, "color"],
      [s.autocomplete, y(J), "background"],
      [s.autocomplete, `1px solid ${y(p, 0.3)}`, "border"],
      [s.autocompleteHighlight, y(p, 0.1), "background"],
    ],
    rt = Array.from(document.querySelectorAll("style")),
    b = n ? l().darkOriginalRules : l().lightOriginalRules;
  for (const at of rt) {
    const w = at.sheet?.cssRules;
    if (w !== void 0)
      for (let S = 0; S < w.length; ++S) {
        const g = w[S],
          u = g.selectorText ?? "";
        (u.includes(".cm-focused") &&
          u.includes(s.selectionBackground) &&
          ((b.selectionBackground ??= g.cssText),
          c
            ? (g.cssText = b.selectionBackground)
            : k !== void 0 &&
              g.style.setProperty("background", k, "important")),
          P !== void 0 &&
            (u === ".cm-md-header" ||
              u === ".cm-md-header:not(.cm-md-quote)") &&
            ((b.markdownHeader ??= g.cssText),
            c
              ? (g.cssText = b.markdownHeader)
              : g.style.removeProperty("color")));
        for (const [ct, _, O] of ot)
          u === ct &&
            (_ === void 0
              ? g.style.removeProperty(O)
              : (g.style.setProperty(O, _, "important"),
                (u === s.matchingBracket || u === s.activeIndicator) &&
                  g.style.setProperty("box-shadow", "unset", "important")));
      }
  }
}
const vt = "#e5c07b",
  H = "#e06c75",
  xt = "#56b6c2",
  Tt = "#ffffff",
  v = "#abb2bf",
  L = "#7d8799",
  Bt = "#61afef",
  Mt = "#98c379",
  R = "#d19a66",
  wt = "#c678dd",
  St = "#21252b",
  I = "#2c313a",
  V = "#23272e",
  q = "#353a42",
  $t = "#3E4451",
  A = "#528bff",
  qt = D.EditorView.theme(
    {
      "&": { color: v, backgroundColor: V },
      ".cm-content": { caretColor: A },
      ".cm-cursor, .cm-dropCursor": { borderLeftColor: A },
      "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
        { backgroundColor: $t },
      ".cm-panels": { backgroundColor: St, color: v },
      ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
      ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
      ".cm-searchMatch": {
        backgroundColor: "#72a1ff59",
        outline: "1px solid #457dff",
      },
      ".cm-searchMatch.cm-searchMatch-selected": {
        backgroundColor: "#6199ff2f",
      },
      ".cm-activeLine": { backgroundColor: "#6699ff0b" },
      ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
      "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
        backgroundColor: "#bad0f847",
      },
      ".cm-gutters": { backgroundColor: V, color: L, border: "none" },
      ".cm-activeLineGutter": { backgroundColor: I },
      ".cm-foldPlaceholder": {
        backgroundColor: "transparent",
        border: "none",
        color: "#ddd",
      },
      ".cm-tooltip": { border: "none", backgroundColor: q },
      ".cm-tooltip .cm-tooltip-arrow:before": {
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
      },
      ".cm-tooltip .cm-tooltip-arrow:after": {
        borderTopColor: q,
        borderBottomColor: q,
      },
      ".cm-tooltip-autocomplete": {
        "& > ul > li[aria-selected]": { backgroundColor: I, color: v },
      },
    },
    { dark: !0 },
  ),
  Nt = x.HighlightStyle.define([
    { tag: t.tags.keyword, color: wt },
    {
      tag: [
        t.tags.name,
        t.tags.deleted,
        t.tags.character,
        t.tags.propertyName,
        t.tags.macroName,
      ],
      color: H,
    },
    {
      tag: [t.tags.function(t.tags.variableName), t.tags.labelName],
      color: Bt,
    },
    {
      tag: [
        t.tags.color,
        t.tags.constant(t.tags.name),
        t.tags.standard(t.tags.name),
      ],
      color: R,
    },
    { tag: [t.tags.definition(t.tags.name), t.tags.separator], color: v },
    {
      tag: [
        t.tags.typeName,
        t.tags.className,
        t.tags.number,
        t.tags.changed,
        t.tags.annotation,
        t.tags.modifier,
        t.tags.self,
        t.tags.namespace,
      ],
      color: vt,
    },
    {
      tag: [
        t.tags.operator,
        t.tags.operatorKeyword,
        t.tags.url,
        t.tags.escape,
        t.tags.regexp,
        t.tags.link,
        t.tags.special(t.tags.string),
      ],
      color: xt,
    },
    { tag: [t.tags.meta, t.tags.comment], color: L },
    { tag: t.tags.strong, fontWeight: "bold" },
    { tag: t.tags.emphasis, fontStyle: "italic" },
    { tag: t.tags.strikethrough, textDecoration: "line-through" },
    { tag: t.tags.link, color: L, textDecoration: "underline" },
    { tag: t.tags.heading, fontWeight: "bold", color: H },
    {
      tag: [t.tags.atom, t.tags.bool, t.tags.special(t.tags.variableName)],
      color: R,
    },
    {
      tag: [t.tags.processingInstruction, t.tags.string, t.tags.inserted],
      color: Mt,
    },
    { tag: t.tags.invalid, color: Tt },
  ]),
  Lt = [qt, x.syntaxHighlighting(Nt)];
bt({ dark: { extension: Lt } });
