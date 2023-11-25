'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useTheme } from 'next-themes';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<any>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    setTheme(savedTheme);
  }, [setTheme]);

  const renderThemeIcon = () => {
    if (!isMounted) return null;

    return theme === 'light' ? (
      <Image
        src="/icons/moon.svg"
        alt="moon"
        height={24}
        width={24}
        className="cursor-pointer"
        onClick={() => setTheme('dark')}
      />
    ) : (
      <Image
        src="/icons/sun.svg"
        alt="sun"
        height={24}
        width={24}
        className="cursor-pointer"
        onClick={() => setTheme('light')}
      />
    );
  };

  return (
    <nav className=" mb-16 flex w-full items-center justify-between px-10 pt-3">
      <Link href="/" className="flex-center flex gap-2">
        {/* <Image
          src="/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        /> */}
        <p className="logo_text tracking-widest">
          <span className="text-accent-2">get</span>
          <span className="text-accent-1">Snippets</span>
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        <div className="flex items-center justify-center px-8">
          {renderThemeIcon()}
        </div>

        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image ?? '/images/logo.svg'}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex sm:hidden">
        <button
          className="mr-6"
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}
        >
          {theme === 'dark' ? (
            <Image src="/icons/sun.svg" alt="sun" height={24} width={24} />
          ) : (
            <Image src="/icons/moon.svg" alt="moon" height={24} width={24} />
          )}
        </button>
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image ?? '/images/logo.svg'}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="black_btn mt-5 w-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
