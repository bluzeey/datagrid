import { useState, useCallback } from "react";
import CheckboxHeader from "./CheckboxHeader";
import TableRow from "./TableRow";
import styles from "./Datagrid.module.css";

interface DataItem {
  id: string;
  name: string;
  device: string;
  path: string;
  status: string;
}

interface DatagridProps {
  data: DataItem[];
}

export default function Datagrid({ data }: DatagridProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedItems(new Set(data.map((item) => item.id)));
      } else {
        setSelectedItems(new Set());
      }
    },
    [data]
  );

  const handleSelectItem = useCallback((id: string, checked: boolean) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (checked) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      return newSelected;
    });
  }, []);

  const handleDownloadSelected = useCallback(() => {
    const selectedData = data.filter((item) => selectedItems.has(item.id));
    alert(JSON.stringify(selectedData, null, 2));
  }, [data, selectedItems]);

  const isAllSelected = selectedItems.size === data.length;
  const isSomeSelected =
    selectedItems.size > 0 && selectedItems.size < data.length;
  const isDownloadEnabled = Array.from(selectedItems).every(
    (id) => data.find((item) => item.id === id)?.status === "Available"
  );

  return (
    <div className={styles.datagrid}>
      <CheckboxHeader
        isAllSelected={isAllSelected}
        isSomeSelected={isSomeSelected}
        onSelectAll={handleSelectAll}
        selectedCount={selectedItems.size}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              isSelected={selectedItems.has(item.id)}
              onSelectItem={handleSelectItem}
            />
          ))}
        </tbody>
      </table>
      <button
        className={styles.downloadButton}
        onClick={handleDownloadSelected}
        disabled={!isDownloadEnabled || selectedItems.size === 0}
      >
        Download Selected
      </button>
    </div>
  );
}
