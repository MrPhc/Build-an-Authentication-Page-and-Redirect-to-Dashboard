import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, ...props }, ref) => (
  <div className={styles.inputWrapper}>
    {label && <label>{label}</label>}
    <input ref={ref} {...props} />
    {error && <span className={styles.error}>{error}</span>}
  </div>
));
Input.displayName = 'Input';
export default Input;