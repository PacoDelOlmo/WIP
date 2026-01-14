
import { Header_logged } from '../../components/header_logged/Header_logged'
import { Aside } from '../../components/aside/Aside'
import styles from './Home.module.css'
import WIP_Logo from './../../assets/img/WIP_Logo.png'
import { LockIcon, UserIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Workspace } from '../../components/workspace/Workspace'

export function Home() {
  return (
    <>
        <Header_logged />
        <main className={styles.body}>
            <Aside />
            <Workspace />
        </main>
        
        
    </>
  )
}
