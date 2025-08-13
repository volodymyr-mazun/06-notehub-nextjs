
// ----------КОМПОНЕНТ, ФОРМА ДЛЯ ПОШУКУ----------

import css from './SearchBox.module.css';
import React from 'react';


interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox ({ value, onChange }: SearchBoxProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      onChange={handleInputChange}
      type="text"
      name="search"
      placeholder="Search notes"
      value={value}
      className={css.input}
    />
  );
};