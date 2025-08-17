
// ----------КОМПОНЕНТ, ІНДИКАТОР ЗАВАНТАЖЕННЯ----------

import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loading} role="status" aria-live="polite">
      <span className={css.spinner} />
      <span className={css.loadingText}>Loading...</span>
    </div>
  );
}

export default Loader;