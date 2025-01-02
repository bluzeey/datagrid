import styles from "./TableRow.module.css";

interface TableRowProps {
  item: {
    id: string;
    name: string;
    device: string;
    path: string;
    status: string;
  };
  isSelected: boolean;
  onSelectItem: (id: string, checked: boolean) => void;
}

export default function TableRow({
  item,
  isSelected,
  onSelectItem,
}: TableRowProps) {
  const isAvailable = item.status === "Available";

  return (
    <tr className={styles.tableRow}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectItem(item.id, e.target.checked)}
          disabled={!isAvailable}
        />
      </td>
      <td>{item.name}</td>
      <td>{item.device}</td>
      <td>{item.path}</td>
      <td>
        {isAvailable && <span className={styles.statusDot}></span>}
        {item.status}
      </td>
    </tr>
  );
}
