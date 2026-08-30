export default function CleanupOptions({ groups, selectedKeys, onRecommended, onCategory, onAll, onClear }) {
  if (!groups.length) return null

  return (
    <div className="border-t border-gray-200 p-5 dark:border-white/10 sm:p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white">Cleanup Options</h3>
      <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-slate-400">Recommended cleanup is conservative. Typography, joiners and directional controls stay unselected unless you choose them.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <OptionButton onClick={onRecommended}>Recommended</OptionButton>
        <OptionButton onClick={() => onCategory("hidden")}>Hidden / Invisible</OptionButton>
        <OptionButton onClick={() => onCategory("space")}>Unusual Spaces</OptionButton>
        <OptionButton onClick={() => onCategory("directional")}>Directional</OptionButton>
        <OptionButton onClick={() => onCategory("typography")}>Typography</OptionButton>
        <OptionButton onClick={onAll}>Select All</OptionButton>
        <OptionButton onClick={onClear}>Clear</OptionButton>
      </div>

      <p className="mt-3 text-xs text-gray-400 dark:text-slate-500">{selectedKeys.size} of {groups.length} character types selected for cleanup.</p>
    </div>
  )
}

function OptionButton({ children, onClick }) {
  return <button type="button" onClick={onClick} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30">{children}</button>
}