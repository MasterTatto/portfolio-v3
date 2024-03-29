import React from 'react';
import styles from './styles.module.scss'
import {NavLink} from "react-router-dom";
import {dataHeader} from "./data";
import {combineCss} from "../../helpers/combineCss";
import myself4 from '../../assets/img/mev4.png'


const Header = ({setCurrentUrl, currentUrl, showMenu, setShowMenu, setBackMode, backMode}) => {


    return (
        <div className={combineCss(styles.header, showMenu && styles.showMenu)}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h1>Alexander Hramyka</h1>
                    <div className={styles.images}>
                        <img
                            src={myself4}
                            alt=""/>
                    </div>
                    <p className={styles.intro}>Hi, my name Alexander and i`m a front-end developer. Welcome to my
                        personal website! </p>

                </div>
                <ul className={styles.ul}>
                    {dataHeader(styles.componentIcon).map((el, i) => {
                        return <NavLink
                            className={combineCss(el.link === currentUrl && styles.active, styles.li)}
                            to={el.link}
                            key={el.title}
                            onClick={() => {
                                setCurrentUrl(el.link)
                                setShowMenu(false)
                            }}>{el.component}<span className={styles.spanTitle}>{el.title}</span></NavLink>
                    })}

                </ul>

                <button className={styles.button}
                        onClick={() => setBackMode(backMode === 'particles' ? 'bubbles' : 'particles')}>Change
                    background
                </button>

            </div>
        </div>
    );
};

export default Header;
