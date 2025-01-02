import styles from "./CheckboxHeader.module.css";

interface CheckboxHeaderProps {
  isAllSelected: boolean;
  isSomeSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  selectedCount: number;
}

export default function CheckboxHeader({
  isAllSelected,
  isSomeSelected,
  onSelectAll,
  selectedCount,
}: CheckboxHeaderProps) {
  return (
    <div className={styles.checkboxHeader}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isAllSelected}
          ref={(input) => {
            if (input) {
              input.indeterminate = isSomeSelected;
            }
          }}
          onChange={(e) => onSelectAll(e.target.checked)}
        />
        Select All
      </label>
      <span className={styles.selectedCount}>
        {selectedCount === 0 ? "None Selected" : `${selectedCount} Selected`}
      </span>
    </div>
  );
}
