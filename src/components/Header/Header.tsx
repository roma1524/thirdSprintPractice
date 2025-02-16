// @ts-ignore
import s from './Header.module.css'

export const Header = () => {
    return (
        <div className={s.Header}>
            <div className="menu">
                <button className="menu">burger</button>
            </div>
            <div className="btn_box">
                <button>Sign In</button>
                <button>Sign Up</button>
                <button>Faq</button>
            </div>
        </div>
    )
}