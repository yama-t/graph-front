import React from "react";
import "./PageHeader.css";

interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  return (
    <header className="header">
      <h1 className="header-inner">{title}</h1>
    </header>
  );
}
