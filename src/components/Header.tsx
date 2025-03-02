import Link from 'next/link'
import React from 'react'
import { createClient } from "@/prismicio";
import { PrismicNextLink } from '@prismicio/next';

type Props = {}

export async function Header({}: Props) {

    const client = createClient();
    const settings = await client.getSingle('settings');

  return (
    <header>
        <div>
            <Link href="/">Logo</Link>
            <nav>
                <ul>
                    {settings.data.navigation.map((item)=> (
                        <li key={item.link.text}>
                            <PrismicNextLink field={item.link} className='~text-lg/xl' />
                        </li>
                    ))}
                </ul>
            </nav>
            <div>Cart</div>
        </div>
    </header>
  )
}

