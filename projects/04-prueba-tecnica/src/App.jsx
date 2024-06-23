import { useEffect, useState } from "react"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL  = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`

function App() {
  const [fact, setFact] = useState('lorem impsum cat fact whatever')
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

        const threeFirstWords = fact.split(' ',3)

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
          .then(res => res.json())
          .then(response => {
            const { url } = response
            setImageUrl(`https://cataas.com/${url}`)
          })
      })
  }, [])

  return (
    <main>
      <h1>hola</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first trhee words for ${fact}`} />}
    </main>
  )
}

export default App
