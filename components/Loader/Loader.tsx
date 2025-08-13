
// ----------КОМПОНЕНТ, ІНДИКАТОР ЗАВАНТАЖЕННЯ----------

import React from 'react';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loading} role="status" aria-live="polite">
      <span className={css.spinner} />
      <span className={css.loadingText}>Loading...</span>
    </div>
  );
}