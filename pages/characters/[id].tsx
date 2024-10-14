import { GetStaticPaths, GetStaticProps } from "next"
import { API } from "../../assets/api/api"
import { CharacterType, ResponseType } from "../../assets/api/rick-and-morty-api"
import { CharacterCard } from "../../components/Card/CharacterCard/CharacterCard"
import { Header } from "../../components/Header/Header"
import { getLayout } from "../../components/Layout/BaseLayout"
import { PageWrapper } from "../../components/PageWrapper/PageWrapper"
import { useRouter } from "next/router"
import styled from "styled-components"

export const getStaticPaths: GetStaticPaths = async () => {
    const {results} = await API.rickAndMorty.getCharacters()

    const paths = results.map(character => ({
        params: {id: String(character.id)}
    }))

    return {
        paths,
            fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params || {}
    const character = await API.rickAndMorty.getCharacter(id as string)
    
    if (!character) {
        return {
            notFound: true
        }}

    return {
        props: {
            character
        }
    }

}

type PropsType = {
    character: CharacterType
}
const Character = (props: PropsType) => {
    const {character} = props
    const router = useRouter()

    if (router.isFallback) return <h1>Loading...</h1>
    const characterId = router.query.id
    const goToCharacters = () => router.push('/characters')
    
    return (
        <PageWrapper>
            <IdText>ID: {characterId}</IdText>
            <CharacterCard key={character.id} character={character}/>
            <button onClick={goToCharacters}>GO TO CHARACTERS</button>
        </PageWrapper>
    )
}
Character.getLayout=getLayout
export default Character
const IdText = styled.div`
    font-size: 38px;
`