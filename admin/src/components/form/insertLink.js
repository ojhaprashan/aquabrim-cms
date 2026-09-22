// Shared "make this a link" behaviour for the article text fields and the
// table-cell editor.
//
// Links are stored in the copy itself as [label](target) — the site turns that
// into a real anchor when it renders the article. Authors never see or type
// HTML; they select some words and press Link, and this fills in the brackets.

/**
 * Build the new field text with the selection turned into a link.
 *
 * `start`/`end` must be read from the textarea BEFORE calling this — the
 * prompts below take focus, and the selection is gone by the time they return.
 *
 * Returns { text, caret } for the caller to apply, or null when the author
 * cancels or the link would not fit in the field.
 */
export function buildLinkInsert(value, start, end, maxLength) {
  const text = value ?? '';
  const selected = text.slice(start, end).trim();

  const label = selected || (window.prompt('Which words should the link show?', '') || '').trim();
  if (!label) return null;

  const url = (
    window.prompt(
      'Link to…\n\n' +
        'A page on this site:   /products/trigger-municipal-water-controller\n' +
        'Another article:       /blogs/why-every-home-needs-a-smart-water-level-controller\n' +
        'Another website:       https://example.com\n' +
        'An email address:      mailto:save.water@aquabrim.com',
      '/'
    ) || ''
  ).trim();
  if (!url || url === '/') return null;

  const markup = `[${label}](${url})`;
  // Replace the whole selection, not just the trimmed label, so surrounding
  // spaces the author highlighted by accident do not get duplicated.
  const next = `${text.slice(0, start)}${markup}${text.slice(end)}`;

  if (maxLength && next.length > maxLength) {
    window.alert(
      `That link would push this field past its ${maxLength}-character limit ` +
        `(it would be ${next.length}). Shorten the text first.`
    );
    return null;
  }

  return { text: next, caret: start + markup.length };
}

/** Read the current selection from a textarea, falling back to the caret. */
export function selectionOf(el, value) {
  const len = (value ?? '').length;
  const start = el?.selectionStart ?? len;
  const end = el?.selectionEnd ?? start;
  return { start, end };
}
