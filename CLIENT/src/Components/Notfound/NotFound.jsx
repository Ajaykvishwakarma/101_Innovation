import style from './NotFound.module.css';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
export const NotFound = () => {
    return  (
      <>
      <Navbar />
      
    <div className={style.notfound}>
      
      <Link to="/">
      <img className={style.notfoundImage} src="https://i.stack.imgur.com/6M513.png" alt="" />
      </Link>
    </div>
    </>
    )
  };
  