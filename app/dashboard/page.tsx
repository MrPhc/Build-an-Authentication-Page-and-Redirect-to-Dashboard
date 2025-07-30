'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: { first?: string } }>({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.replace('/auth');
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        router.replace('/auth');
      }
    }
  }, []);

  return (
   <div className={styles.wrapper}>
  <div className={styles.card}>
    <h1 className={styles.title}>
      <span className={styles.wavingHand}>👋</span>
      سلام {user.name?.first || 'کاربر'} عزیز
    </h1>
    <p className={styles.subtitle}>
      به داشبورد شخصی خودت خوش اومدی. از اینجا می‌تونی همه چیز رو مدیریت کنی.
    </p>
    
    <div className={styles.userStats}>
      <div className={styles.statItem}>
        <div className={styles.statLabel}>پروژه‌های فعال</div>
        <div className={styles.statValue}>۱۲</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statLabel}>اعلان‌ها</div>
        <div className={styles.statValue}>۳</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statLabel}>پیام‌های خوانده نشده</div>
        <div className={styles.statValue}>۵</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statLabel}>وظایف امروز</div>
        <div className={styles.statValue}>۷</div>
      </div>
    </div>
  </div>
</div>
  );
}
