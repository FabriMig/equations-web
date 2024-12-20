import AppBar from "./AppBar"
import Footer from "./Footer"

type Props = {
    children: JSX.Element
}

function Layout({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <AppBar />
            <section className="flex-grow items-center justify-center flex">
                {children}
            </section>
            <Footer />
        </div>
    )
}

export default Layout