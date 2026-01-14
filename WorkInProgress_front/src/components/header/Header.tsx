import { useState } from 'react'
import Style from './Header.module.css'
import LogoWip from './../../assets/img/WIP_Logo.png'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () =>{
    setMenuOpen(!menuOpen);
  }



  return (
    <header className={Style.navbar_container}>
      <div className={Style.navbar_main}>
          <nav>
              <ul className={Style.nav_list}>
                  <li>
                    <Link to="/"><img src={LogoWip} alt="Logotipo WIP" className={Style.WIP_button} /></Link>
                  </li>
                  <li><a href="">FUNCIONES</a></li>
                  <li><a href="">RECURSOS</a></li>
                  <li><a href="">CONTACTO</a></li>
              </ul>
          </nav>

          <div className={Style.actions}>
              <div className={Style.desktop_buttons}>
                  <div className={Style.primary_button}><Link to="/login">LOG IN</Link></div>
                  <div className={Style.secondary_button}><Link to="/signup">SIGN UP</Link></div>
              </div>

              <div className={Style.menu_icon} onClick={toggleMenu}>
                  {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </div>
          </div>
      </div>

      <div className={`${Style.mobile_menu} ${menuOpen ? Style.show_menu : ''}`}>
          <div className={Style.primary_button}><Link to="/login">LOG IN</Link></div>
          <div className={Style.secondary_button}><Link to="/signup">SIGN UP</Link></div>
      </div>
    </header>
  )
}
