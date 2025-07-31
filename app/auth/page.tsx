'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import styles from './auth.module.scss';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { FiSun, FiMoon } from 'react-icons/fi';

const authSchema = z.object({
  phone: z.string()
    .min(11, 'شماره موبایل باید ۱۱ رقم باشد')
    .max(11, 'شماره موبایل باید ۱۱ رقم باشد')
    .regex(/^09/, 'شماره موبایل باید با ۰۹ شروع شود')
    .regex(/^\d+$/, 'فقط مجاز به استفاده از اعداد هستید')
});

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return { darkMode, toggleDarkMode };
};

export default function AuthPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const validation = authSchema.safeParse({ phone });
      if (!validation.success) {
        return setError(validation.error.issues[0].message);
      }
      
      const res = await fetch('https://randomuser.me/api/?results=1&nat=us');
      if (!res.ok) throw new Error('خطا در دریافت اطلاعات کاربر');
      
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data.results[0]));
      router.push('/dashboard');
    } catch (err) {
      setError('خطایی در ورود رخ داده است');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper} dir="rtl">
      <button 
        onClick={toggleDarkMode} 
        className={styles.themeToggle}
        aria-label={darkMode ? 'حالت روشن' : 'حالت تاریک'}
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>
      
      <div className={styles.card}>
        <h1 className={styles.loginTitle}>ورود</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input
            type="tel"
            placeholder="شماره موبایل"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError('');
            }}
            dir="ltr"
            maxLength={11}
          />
          {error && <div className={styles.error}>{error}</div>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </Button>
        </form>
      </div>
    </div>
  );
}