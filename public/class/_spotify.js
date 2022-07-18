// _spotify.js

import { spotifyTools } from "../../controller/spotify.js";

export class _Spotify {

    SetFunctions(){
        console.log('spotifyTools')
    }

    SearchArtists(){
        spotifyTools.SearchArtists('eminem', (data)=>{
            console.log(data)
        })
    }

}