<script setup lang="ts">
  import { authStore } from '@/features/authentication/store/authStore';

  const auth = authStore();

  const logout = () => {
    auth.clearAuthData();
  }
</script>

<template>
  <div className="navbar shadow-sm">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a href="/">Homepage</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/marketplace">Negociações</a></li>
          <li><a href="/cards">Cartas</a></li>
        </ul>
      </div>
    </div>

    <div className="navbar-end">
      <div v-if="auth.isAuthenticated" className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between" href="/card/me">
              Minha coleção
            </a>
          </li>
          <li><a @click="logout">Logout</a></li>
        </ul>
      </div>
      <div v-else>
        <a className="btn btn-accent text-white" href="/auth/login">Login</a>
      </div>
    </div>
  </div>
</template>