// tiene que ser un client component
'use client'
import { useEffect, useMemo, useState } from 'react'
import data from './books.json'
// console.log(data)
// crear una interface de book
export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
  author: {
    name: string
    otherBooks: string[]
  }
}
//necesitamos un array de books
const books: Book[] = data.library.map(data => data.book)
// extraemos el genero de los libros 
const genres: string[] = Array.from( new Set (books.map ((book)=> book.genre)))
// console.log(books)

//que se actualicen los datos en diferentes ventanas
//se usara storage event
// se actualiza cada que cambia algo en el storage
function onReadListChange(callback: (readList: Book["ISBN"][])=> void) {
  function getReadList(){
    //obtener los elementos de localeStorage
    const readList = JSON.parse(localStorage.getItem("readList") ?? "[]")

    callback (readList)
  }

  // cuando nos suscribamos a esta funcion ejecutar el readList
  // const readList = getReadList()

  // callback(readList)

  window.addEventListener("storage", getReadList)

  getReadList()

  return () => window.removeEventListener("storage", getReadList)
}


export default function Home () {
  const [genre, setGenre] = useState <Book["genre"]> ("")
  // nuevo estado para agregar a lista leidos
  const [readList, setReadList] = useState<Book['ISBN'][]> ([])
  //filtro por genero
  const matches = useMemo( ()=>{
    if (!genre) return books

    return books.filter((book)=>{
      if(book.genre !== genre) return false

      return true
    })
  },[genre])

  // handleBookClick function
  const handleBookClick = (book: Book['ISBN']) => {
    const draft = readList.includes(book)
    ? readList.filter((readBook)=> readBook !== book)
    : [...readList,book]

    setReadList(draft)
    localStorage.setItem("readList", JSON.stringify(draft))
  }
  // locale storage
  useEffect(()=>{
    // setReadList(JSON.parse(localStorage.getItem("readList") ?? "[]") as Book['ISBN'][])    
    const unsuscribe= onReadListChange(setReadList)
    return () => unsuscribe()
  },[])

  return (
    <article className='grid gap-4'>
      <nav>
        <select value={genre} onChange={(event)=> setGenre(event.target.value)}>
          <option value="">Todos</option>
          {genres.map((genre)=>(
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </nav>
      <ul className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
        {matches.map(book => (
          <li key={book.ISBN} className='grid gap-2' onClick={()=>handleBookClick(book.ISBN)}>
            <img
              src={book.cover}
              alt={`cover extraido del json con el cover ${book.cover}`}
              className='object-cover  aspect-[9/14]'
            />
            <p>{readList.includes(book.ISBN) && <span>⭐ </span>}{book.title}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
