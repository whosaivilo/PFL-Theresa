export default function TailWindCSS(){
    return(
        <>
          <FlexboxGrid/>
        <div>
            <h1 className="border m-4" >Belajar TailWind CSS 4</h1>
            <button className="bg-pink-400 text-white 
            px-2 py-4 mx-4 rounded shadow-lg">Klik aku dong :*</button>
        </div>
        <Spacing/>
        <Typography/>
        <BorderRadius/>
        <BackgroundColors/>
      <ShadowEffects/>
        </>
        
    )
}
function Spacing(){
    return (
        <div className="bg-pink-400 shadow-lg p-6 m-4 rounded-lg">
            <h2 className="text-lg text-white font-semibold">Card Title</h2>
            <p className="mt-2 text-blue-200">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}
function Typography(){
    return (
        <div className="m-4">
            <h1 className="text-2xl font-sans font-bold text-red-300">Tailwind Typography</h1>
            <p className="text-red-400 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}
function BorderRadius(){
    return (
        <button className="border-2 text-white border-pink-400 px-4 py-2 ml-4 rounded-lg bg-pink-400"> Klik Saya </button>
    )
}
function BackgroundColors(){
    return(
        <div className="m-4 bg-pink-400 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}
function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-pink-600 p-4 text-white">
            <h1 className="text-lg font-bold">Website aq</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <h1 className="text-lg text-white font-bold">Logout</h1>
        </nav>
    )
}
function ShadowEffects(){
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg hover:rotate-2 transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}