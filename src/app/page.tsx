// tiene que ser un client component
'use client'
import { useState } from 'react'
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

export default function Home () {
  const [genre, setGenre] = useState <string> (" ")
  //filtro por genero
  const matches = genre ? books.filter( (book) => {
    if(genre && book.genre !== genre) return false
    
    return true
  }) : books
  return (
    <article className='grid gap-4'>
      <nav>
        <select value={genre} onChange={(event)=> setGenre(event.target.value)}>
          <option value=''>Todos</option>
          {genres.map((genre)=>(
            <option key={genre}>
              {genre}
            </option>
          ))}
        </select>
      </nav>
      <ul className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
        {matches.map(book => (
          <li key={book.ISBN}>
            <img
              src={book.cover}
              alt={`cover extraido del json con el cover ${book.cover}`}
              className='object-cover  aspect-[9/14]'
            />
            <p>{book.title}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
