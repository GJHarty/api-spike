import { useSelector } from "react-redux";

export default function Favorites() {
    const urlList = useSelector(state => state.favGifsReducer);
    console.log('urlList', urlList);
    return (
        <>
        {urlList.map((url, i) => (
            <iframe key={i} src={url} />
        ))}
        </>
    );
}