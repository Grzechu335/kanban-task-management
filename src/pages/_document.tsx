import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="scrollbar-hide relative">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
