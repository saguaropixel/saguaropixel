import { createClient } from '@/prismicio';
import { PrismicNextLink } from '@prismicio/next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle('settings');
  // above the return (inside Header)
  const navKey = (item: any, i: number, scope: 'desk' | 'mob') =>
    `${scope}:${item?.link?.uid ?? item?.link?.url ?? item?.link?.text ?? 'nav'}:${i}`;

  return (
    <header className="sticky left-0 right-0 top-0 z-50 border-b border-neutral-800 bg-[#1d1b1a]">
      <div className="mx-auto grid w-full max-w-8xl grid-cols-[auto,1fr,auto] items-center gap-4 px-4 py-4 md:py-5">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-white"
          aria-label="Saguaro Pixels – Home"
        >
          {/* Swap for your logo image if you have one in Prismic */}
          {settings.data.logo?.url && (
            <Image
              src={settings.data.logo?.url}
              alt={settings.data.logo?.alt || 'Logo'}
              width={434}
              height={103}
              className="h-16 w-30"
              priority
            />
          )}
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Main"
          className="hidden md:flex items-center justify-center"
        >
          <ul className="flex items-center gap-10">
            {settings.data.navigation.map((item: any, i: number) => (
              <li key={navKey(item, i, 'desk')}>
                <PrismicNextLink
                  field={item.link}
                  className="text-[15px] font-medium text-white/80 transition-colors hover:text-white"
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex justify-end">
          <Button
            variant={'solid'}
            tone={'magenta'}
            asChild
            className="tracking-wider text-white hover:bg-[#ff4a96]"
          >
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>

        {/* Mobile hamburger + drawer */}
        <div className="md:hidden justify-self-end">
          <input id="nav-toggle" type="checkbox" className="peer hidden" />
          <label
            htmlFor="nav-toggle"
            className="relative block h-8 w-8 cursor-pointer"
            aria-label="Toggle navigation"
          >
            <span className="absolute left-0 top-1 h-0.5 w-8 bg-white transition-transform duration-300 peer-checked:translate-y-3 peer-checked:rotate-45" />
            <span className="absolute left-0 top-3.5 h-0.5 w-8 bg-white transition-opacity duration-300 peer-checked:opacity-0" />
            <span className="absolute left-0 top-6 h-0.5 w-8 bg-white transition-transform duration-300 peer-checked:-translate-y-3 peer-checked:-rotate-45" />
          </label>

          {/* overlay */}
          <div className="pointer-events-none fixed inset-0 z-40 bg-black/50 opacity-0 transition-opacity duration-300 peer-checked:pointer-events-auto peer-checked:opacity-100" />
          {/* drawer */}
          <div className="fixed inset-y-0 right-0 z-50 w-72 translate-x-full bg-[#1d1b1a] p-6 transition-transform duration-300 peer-checked:translate-x-0">
            {/* Close button */}
            <div className="flex justify-end">
              <label
                htmlFor="nav-toggle"
                className="cursor-pointer text-white text-2xl leading-none"
                aria-label="Close navigation"
              >
                ✕
              </label>
            </div>

            <nav className="mt-6">
              <ul className="flex flex-col gap-5">
                {settings.data.navigation.map((item: any, i: number) => (
                  <li key={navKey(item, i, 'mob')}>
                    <PrismicNextLink
                      field={item.link}
                      className="block text-lg font-medium text-white/90"
                    />
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  variant={'solid'}
                  tone={'magenta'}
                  asChild
                  className="tracking-wider text-white hover:bg-[#ff4a96]"
                >
                  <Link href="/contact">Start a Project</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
