'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return router.push('/auth');
    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) return null;

  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.state}, ${user.location.country}`;
  const birthday = new Date(user.dob.date).toLocaleDateString('fa-IR');
  const registered = new Date(user.registered.date).toLocaleDateString('fa-IR');

  return (
    <div className={styles.wrapper}>
     
      
      <div className={styles.card}>
        <h1 className={styles.title}>داشبورد کاربر</h1>
        
        <div className={styles.profile}>
          <img 
            src={user.picture.large} 
            alt={fullName} 
            className={styles.avatar}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/default-avatar.jpg';
            }}
          />
          
          <div className={styles.info}>
            <p><strong>نام:</strong> {fullName}</p>
            <p><strong>ایمیل:</strong> {user.email}</p>
            <p><strong>موبایل:</strong> {user.cell}</p>
            <p><strong>محل سکونت:</strong> {location}</p>
            <p><strong>سن:</strong> {user.dob.age} سال</p>
            <p><strong>تاریخ تولد:</strong> {birthday}</p>
            <p><strong>نام کاربری:</strong> {user.login.username}</p>
            <p><strong>تاریخ ثبت‌نام:</strong> {registered}</p>
            <p><strong>تابعیت:</strong> {user.nat}</p>
          </div>
        </div>
      </div>
    </div>
  );
}