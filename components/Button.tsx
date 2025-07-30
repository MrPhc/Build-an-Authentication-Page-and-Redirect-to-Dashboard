import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={styles.btn} {...props} />;
}
