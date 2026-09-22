import { useRef } from 'react';
import { buildLinkInsert, selectionOf } from './insertLink';

// ---------------------------------------------------------------------------
// TableField — a grid editor for an article table with ANY number of columns.
//
// Stored shape:
//   { columns: ['Feature', 'Basic', 'Pro'],
//     rows: [{ cells: ['Dry-run protection', 'No', 'Yes'] }, ...] }
//
// Adding a column appends a cell to every row and removing one takes that cell
// back out, so the grid can never go ragged — what you edit here is exactly the
// table the article renders.
//
// Schema options: maxColumns, maxRows, headingMaxLength, cellMaxLength.
// ---------------------------------------------------------------------------

// Pad or trim a row's cells to the current column count.
const sized = (cells, n) => {
  const list = Array.isArray(cells) ? cells : [];
  return Array.from({ length: n }, (_, i) => list[i] ?? '');
};

/**
 * Read the stored value into { columns, rows }.
 *
 * Tables written before this editor existed are stored as col1Label/col2Label
 * plus rows of { label, value }. They are converted here so those articles open
 * with their content in the grid rather than blank. The original keys are left
 * on the record when saving, so a site build that predates the new shape keeps
 * rendering them.
 */
const readTable = (value) => {
  const base = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const rows = Array.isArray(base.rows) ? base.rows : [];
  const columns = Array.isArray(base.columns) ? base.columns : [];

  if (columns.length || rows.some((r) => Array.isArray(r?.cells))) {
    return {
      base,
      columns,
      rows: rows.map((r) => ({ ...r, cells: Array.isArray(r?.cells) ? r.cells : [] })),
    };
  }

  const legacy = [base.col1Label, base.col2Label];
  const hasLegacy = legacy.some((c) => typeof c === 'string') || rows.length > 0;
  return {
    base,
    columns: hasLegacy ? legacy.map((c) => c ?? '') : [],
    rows: rows.map((r) => ({ ...r, cells: [r?.label ?? '', r?.value ?? ''] })),
  };
};

export default function TableField({ field, value, onChange }) {
  const {
    label,
    help,
    maxColumns = 6,
    maxRows = 20,
    headingMaxLength = 60,
    cellMaxLength = 500,
  } = field;

  const { base, columns, rows } = readTable(value);
  const width = columns.length;
  const atMaxColumns = width >= maxColumns;
  const atMaxRows = rows.length >= maxRows;

  // Legacy keys are carried through untouched — see readTable.
  const commit = (nextColumns, nextRows) =>
    onChange({ ...base, columns: nextColumns, rows: nextRows });

  const setHeading = (ci, text) =>
    commit(
      columns.map((c, i) => (i === ci ? text : c)),
      rows
    );

  const setCell = (ri, ci, text) =>
    commit(
      columns,
      rows.map((r, i) =>
        i === ri
          ? { ...r, cells: sized(r.cells, width).map((c, j) => (j === ci ? text : c)) }
          : r
      )
    );

  const addColumn = () => {
    if (atMaxColumns) return;
    commit(
      [...columns, ''],
      rows.map((r) => ({ ...r, cells: [...sized(r.cells, width), ''] }))
    );
  };

  const removeColumn = (ci) =>
    commit(
      columns.filter((_, i) => i !== ci),
      rows.map((r) => ({ ...r, cells: sized(r.cells, width).filter((_, i) => i !== ci) }))
    );

  const addRow = () => {
    if (atMaxRows) return;
    commit(columns, [...rows, { cells: Array.from({ length: width }, () => '') }]);
  };

  const removeRow = (ri) => commit(columns, rows.filter((_, i) => i !== ri));

  // One Link button for the whole grid, acting on whichever cell was last
  // focused — a button in every cell would drown the table in chrome.
  const focused = useRef(null);
  const addLinkToCell = () => {
    const at = focused.current;
    if (!at || !rows[at.ri]) {
      window.alert('Click into the cell you want to add a link to first, then press Link.');
      return;
    }
    const cell = sized(rows[at.ri].cells, width)[at.ci] ?? '';
    // Read the selection before the prompts steal focus.
    const { start, end } = selectionOf(at.el, cell);
    const result = buildLinkInsert(cell, start, end, cellMaxLength);
    if (!result) return;
    setCell(at.ri, at.ci, result.text);
  };

  const moveRow = (ri, dir) => {
    const j = ri + dir;
    if (j < 0 || j >= rows.length) return;
    const copy = [...rows];
    [copy[ri], copy[j]] = [copy[j], copy[ri]];
    commit(columns, copy);
  };

  return (
    <div className="field table-field">
      <label>
        {label}
        {help && <span className="muted"> — {help}</span>}
        <span className="muted">
          {` (${width} column${width === 1 ? '' : 's'} × ${rows.length} row${rows.length === 1 ? '' : 's'})`}
        </span>
      </label>

      {width === 0 ? (
        <p className="table-field-empty muted">
          No columns yet. Add one for each column the table needs — two for a simple
          comparison, more for a spec table. Leave this empty and no table appears on
          the article.
        </p>
      ) : (
        <div className="table-field-scroll">
          <table className="table-field-grid">
            <thead>
              <tr>
                <th className="table-field-gutter" aria-label="Row" />
                {columns.map((col, ci) => (
                  <th key={ci}>
                    <div className="table-field-head">
                      <input
                        type="text"
                        value={col ?? ''}
                        maxLength={headingMaxLength}
                        placeholder={`Column ${ci + 1} heading`}
                        onChange={(e) => setHeading(ci, e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-xs"
                        title="Remove this column"
                        onClick={() => removeColumn(ci)}
                      >
                        ×
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  <td className="table-field-gutter">
                    <span className="table-field-rownum">{ri + 1}</span>
                    <div className="list-item-actions">
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs"
                        title="Move up"
                        onClick={() => moveRow(ri, -1)}
                        disabled={ri === 0}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs"
                        title="Move down"
                        onClick={() => moveRow(ri, 1)}
                        disabled={ri === rows.length - 1}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-xs"
                        title="Remove this row"
                        onClick={() => removeRow(ri)}
                      >
                        ×
                      </button>
                    </div>
                  </td>
                  {sized(row.cells, width).map((cell, ci) => (
                    <td key={ci}>
                      <textarea
                        rows={2}
                        value={cell}
                        maxLength={cellMaxLength}
                        onFocus={(e) => { focused.current = { el: e.target, ri, ci }; }}
                        onChange={(e) => setCell(ri, ci, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="table-field-actions">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={addColumn}
          disabled={atMaxColumns}
        >
          + Add column
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={addRow}
          disabled={atMaxRows || width === 0}
        >
          + Add row
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={addLinkToCell}
          disabled={rows.length === 0}
          title="Select words inside a cell, then press this"
        >
          <i className="bi bi-link-45deg"></i> Link
        </button>
        {atMaxColumns && <span className="limit-note">Maximum {maxColumns} columns.</span>}
        {atMaxRows && <span className="limit-note">Maximum {maxRows} rows.</span>}
      </div>
    </div>
  );
}
