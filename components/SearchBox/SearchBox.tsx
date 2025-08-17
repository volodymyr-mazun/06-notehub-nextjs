
// ----------КОМПОНЕНТ, ФОРМА ДЛЯ ПОШУКУ НОТАТКИ----------

import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
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

export default SearchBox;