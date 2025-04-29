import React from 'react';
import {Layout, QueryResult} from '../components';
import {gql, useQuery} from '@apollo/client';
import TrackCard from '../containers/track-card';

// Типы для данных, возвращаемых запросом
interface Author {
    id: string;
    name: string;
    photo: string;
}

interface Track {
    id: string;
    title: string;
    thumbnail: string;
    length: number;
    modulesCount: number;
    author: Author;
}

interface TracksQueryData {
    tracksForHome: Track[];
}

/** GET_TRACKS query to retrieve all tracks */
const GET_TRACKS = gql(`
  query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`);

const Tracks = () => {
    const {loading, error, data} = useQuery<TracksQueryData>(GET_TRACKS);

    return (
        <Layout grid>
            <QueryResult error={error} loading={loading} data={data}>
                {data?.tracksForHome?.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </QueryResult>
        </Layout>
    );
};

export default Tracks;
