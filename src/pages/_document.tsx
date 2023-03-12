import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="relative h-full scrollbar-hide">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
