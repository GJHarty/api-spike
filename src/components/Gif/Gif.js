import { useDispatch} from 'react-redux';
import { Button } from '@material-ui/core';

export default function Gif({gif}) {
    const dispatch = useDispatch();
   
    const favThisGif = () => {
        console.log('faveThisGif button clicked');
        
        dispatch({
            type: 'FAV_GIF',
            payload: gif
        });
    }
    
    return (
        <>
            <iframe src={gif.embed_url} />
            <Button onClick={favThisGif} className="favBtn" variant="contained" color="primary">Favorite</Button>
        </>
    )
}