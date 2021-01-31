import { ImSpinner9 } from 'react-icons/im';
import s from './Spinner.module.css'

export default function Spinner({classNames=""}) {
    return <ImSpinner9 className={`${s.iconSpin} ${classNames}`}/>;
}