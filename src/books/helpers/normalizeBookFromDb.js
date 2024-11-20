const normalizeBookFreomDb = (book) => ({
    author: book.author,
    genre: book.genre,
    image: book.image,
    alt: book.alt
})


export default normalizeBookFreomDb;