import { CharacterStatusType } from "assets/api/rick-and-morty-api"
import Image, { StaticImageData } from "next/image";
import aliveStatus from "public/statuses/alive.png";

type PropsType = {
    status: CharacterStatusType;
    src: StaticImageData
}
export const Status = (props: PropsType) => {
    const {src, status} = props
    return (
        <>
            <Image src={src} alt={''} width={20} height={20}/>
        </>
    )
}