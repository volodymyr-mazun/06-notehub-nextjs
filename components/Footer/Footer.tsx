
// ----------КОМПОНЕНТ, FOOTER----------

import css from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                
                <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>

                <div className={css.wrap}>
                    <p>Developer: Mazun Volodymyr</p>
                    <p>Contact us:
                        <a href="mailto:mebelmv1990@gmail.com"> mebelmv1990@gmail.com</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;