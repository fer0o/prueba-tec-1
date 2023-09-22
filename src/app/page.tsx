// tiene que ser un client component
'use client'
import data from './books.json'
 console.log(data)
// crear una interface de book
export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: {
    name: string;
    otherBooks: string[]
  }
}
//necesitamos un array de books
const books: Book[] = data.library.map((data)=> data.book)
console.log(books)

export default function Home () {
  return (
    <ul className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
      {books.map((book => (
        <li key={book.ISBN}>
          <img src={book.cover} alt={`cover extraido del json con el cover ${book.cover}`} className='object-cover  aspect-[9/14]'/>
          <p>{book.title}</p>
        </li>
      )))}
    </ul>
  )
}
