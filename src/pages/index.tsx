import Head from 'next/head'
import { Plus_Jakarta_Sans } from 'next/font/google'
import HomePageTemplate from '@/components/templates/HomePageTemplate'
import { useAppSelector } from '@/hooks/redux'
import { darkModeStatusSelector } from '@/store/UISlice'
import Header from '@/components/organisms/Header'

const jakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta-sans',
})

export default function Home() {
    const darkModeStatus = useAppSelector(darkModeStatusSelector)
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Created by Grzegorz Skrabucha"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <main
                className={`w-full h-full ${jakartaSans.variable} ${
                    darkModeStatus ? 'dark' : ''
                }`}
            >
                <HomePageTemplate />
            </main>
        </>
    )
}
