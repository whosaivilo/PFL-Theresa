export default function HelloWorld(){
    const propsUserCard = {
        nama: "Stefanny",
        nim: "2457301134",
        tanggal: "2006-23-10"
    }
    return (
        <div>
            <img src="img/gambar2.jpg" alt="gambar" width="100%" />
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai/>
            <QuoteText/>
             <UserCard 
	            nama="Theresa Olivia" 
	            nim="2457301144"
	            tanggal={new Date().toLocaleDateString()}
	          />
              <UserCard {...propsUserCard} />
              


        </div>
    )
}

function GreetingBinjai(){
    return(
        <small>Salam dari Binjai</small>
    )
}

function QuoteText() {
    const text = "Mulutmu Harimaumu";
    const text2 = "Aku ingin jadi macan";
    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function UserCard(props){
    return (
        <div>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}