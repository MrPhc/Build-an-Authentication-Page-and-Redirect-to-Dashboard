'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import styles from './auth.module.scss';
import Input from '@/components/Input';
import Button from '@/components/Button';

const phoneSchema = z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست');

export default function AuthPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) return setError(result.error.issues[0].message);
    setError('');

    const res = await fetch('/api/fake-user');
    const data = await res.json();

    localStorage.setItem('user', JSON.stringify(data.results[0]));
    router.push('/dashboard');
  };

  return (
   <div className={styles.wrapper}>
  <div className={styles.card}>
    <h1 className={styles.title}>ورود</h1>
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <input
        type="tel"
        placeholder="شماره موبایل"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={styles.input}
      />
      {error && <div style={{ color: 'red', fontSize: '0.9rem' }}>{error}</div>}
      <button type="submit" className={styles.button}>ورود</button>
    </form>
  </div>
</div>

  );
}
