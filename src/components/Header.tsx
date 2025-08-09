import { createClient } from '@/prismicio';
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import { ButtonLink } from './ButtonLink';

type Props = {};

export async function Header({}: Props) {
  const client = createClient();
  const settings = await client.getSingle('settings');

  return (
    <header className="header absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6 hd:h-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
        <Link href="/" className="justify-self-start">
          Logo
        </Link>

        {/* Mobile Navigation Toggle and Menu */}
        <div className="relative md:hidden justify-self-end z-50">
          <input type="checkbox" id="nav-toggle" className="hidden peer" />
          <label
            htmlFor="nav-toggle"
            className="block cursor-pointer w-8 h-8 relative z-50"
            aria-label="Toggle navigation"
          >
            <span className="absolute h-0.5 w-full bg-black top-1 transition-transform duration-300 ease-in-out peer-checked:rotate-45 peer-checked:translate-y-2.5"></span>
            <span className="absolute h-0.5 w-full bg-black top-3.5 transition-opacity duration-300 ease-in-out peer-checked:opacity-0"></span>
            <span className="absolute h-0.5 w-full bg-black top-6 transition-transform duration-300 ease-in-out peer-checked:-rotate-45 peer-checked:-translate-y-2.5"></span>
          </label>

          {/* Off-canvas Mobile Navigation */}
          <div className="fixed inset-y-0 right-0 w-64 bg-brand-white shadow-lg transition-transform duration-300 ease-in-out transform translate-x-full peer-checked:translate-x-0 md:hidden z-10">
            <nav className="h-full flex flex-col pt-24 px-6">
              <ul className="flex flex-col gap-6">
                {settings.data.navigation.map((item) => (
                  <li key={item.link.text}>
                    <PrismicNextLink
                      field={item.link}
                      className="~text-2xl/3xl hover:text-gray-600 lowercase"
                    />
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink href="" color="red" aria-label="Start a project">
                  Start A Project
                </ButtonLink>
              </div>
            </nav>
          </div>

          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-0 peer-checked:opacity-100 pointer-events-none peer-checked:pointer-events-auto md:hidden"></div>
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main"
          className="hidden md:block col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 bg-brand-white rounded-full py-3 px-6"
        >
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {settings.data.navigation.map((item) => (
              <li key={item.link.text}>
                <PrismicNextLink field={item.link} className="~text-lg/xl" />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block justify-self-end">
          <ButtonLink href="" color="red" aria-label="Cart 1">
            Start A Project
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
