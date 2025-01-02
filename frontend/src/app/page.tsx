"use client";

import { useState } from "react";
import Datagrid from "../components/Datagrid";
import { sampleData } from "../data/sampleData";
import styles from "@/app/page.module.css";

export default function Home() {
  const [data] = useState(sampleData);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Datagrid</h1>
        <Datagrid data={data} />
      </div>
    </main>
  );
}
