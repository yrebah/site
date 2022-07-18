import SpotifyWebApi from 'spotify-web-api-node';
import 'dotenv/config';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/'
})

const init = async (callback) => {
    const access_token = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(access_token.body.access_token)
    callback()
}

export const spotifyTools = {
    GetArtistAlbums: async (key, callback) => {
        init(() => {
            spotifyApi.getArtistAlbums(key).then((data) => {
                callback(data.body)
            })
        })
    },
    SearchArtists: async (value, callback) => {
        init(() => {
            spotifyApi.searchArtists(value).then((data) => {
                callback(data.body)
            })
        })
    },
    GetListArtistName: async (value, callback) => {
        init(() => {
            spotifyApi.searchArtists(value).then((data) => {
                const result = data.body.artists.items
                result.forEach((elem) => {
                    callback(elem.name)
                })
            })
        })
    },
    SearchTracks: async (value, callback) => {
        init(() => {
            spotifyApi.searchTracks(value).then((data) => {
                callback(data.body)
            })
        })
    }
}