import React from "react";
import KhatmahTable from "../assets/components/KhatmahPage/KhatmahTable";
import { useParams } from "react-router-dom";

function KhatmahPage() {
  const { khatmaId } = useParams();

  return (
    <section className="khatmahpage" id={`${khatmaId}`}>
      <div className="main-container">
        <KhatmahTable khatmaId={khatmaId} />
      </div>
    </section>
  );
}

export default KhatmahPage;
