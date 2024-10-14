import { API } from "../../assets/api/api"
import { CharacterType, EpisodeType, ResponseType } from "../../assets/api/rick-and-morty-api"
import { Card } from "../../components/Card/Card"
import { Header } from "../../components/Header/Header"
import { PageWrapper } from "../../components/PageWrapper/PageWrapper"

export const getServerSideProps = async () => {
    const episodes = await API.rickAndMorty.getEpisodes()
    if(!episodes) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            episodes
        }
    }

}

type PropsType = {
    episodes: ResponseType<EpisodeType>
}
const Characters = (props: PropsType) => {
    const {episodes} = props
    const episodesList = episodes.results.map(episode => (
        <Card key={episode.id} name={episode.name}/>
    ))
    return (
        <PageWrapper>
        <Header/>
        {episodesList}
    </PageWrapper>
    )
}
export default Characters