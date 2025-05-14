import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Mail, Lock, LogIn, UserPlus, XCircle } from 'lucide-react';

export default function AuthPage({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user && onClose) {
      onClose();
    }
  }, [user, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-2 text-primary">Welcome, {user.email}!</h2>
        <button onClick={handleLogout} className="mt-4 bg-muted text-foreground px-4 py-2 rounded hover:bg-red-100 hover:text-red-600 transition-colors flex items-center gap-2">
          <LogIn className="h-4 w-4" /> Logout
        </button>
        {onClose && (
          <button onClick={onClose} className="mt-4 text-muted-foreground hover:text-primary text-sm">Close</button>
        )}
      </div>
    );
  }

  return (
    <div className="relative max-w-md w-full mx-auto bg-white rounded-xl shadow-xl p-8 border border-border">
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" aria-label="Close">
          <XCircle className="h-6 w-6" />
        </button>
      )}
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-2">
          {isLogin ? <LogIn className="h-8 w-8 text-primary" /> : <UserPlus className="h-8 w-8 text-medical-green" />}
        </div>
        <h2 className="text-2xl font-bold mb-1 text-primary">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <p className="text-muted-foreground text-sm">{isLogin ? 'Access your CareWill account' : 'Create a new CareWill account'}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-3 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base bg-muted/30"
            autoComplete="email"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-3 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base bg-muted/30"
            autoComplete="current-password"
          />
        </div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 rounded bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          disabled={loading}
        >
          {isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
          {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>
      <div className="mt-6 text-center text-sm">
        {isLogin ? (
          <span>Don&apos;t have an account?{' '}
            <button onClick={() => setIsLogin(false)} className="text-medical-green font-semibold hover:underline transition-colors">Sign Up</button>
          </span>
        ) : (
          <span>Already have an account?{' '}
            <button onClick={() => setIsLogin(true)} className="text-primary font-semibold hover:underline transition-colors">Login</button>
          </span>
        )}
      </div>
    </div>
  );
} 