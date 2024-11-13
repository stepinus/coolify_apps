'use client';

import { SyntheticEvent, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const { status } = useSession();

  if (status === 'authenticated') {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await signIn('credentials', {
      username: userData.username,
      password: userData.password,
      redirect: false
    });

    if (result?.error) {
      setError('Неверные учетные данные');
    } else if (result?.ok) {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="text"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          placeholder="Имя пользователя"
          className="w-full p-2 border mb-4"
        />
        <input
          type="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Пароль"
          className="w-full p-2 border mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
