import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

interface AnimeTitle {
    romaji: string;
    english: string | null;
  }
  
  interface AnimeMedia {
    id: number;
    title: AnimeTitle;
  }
  
  interface AnimeData {
    Page: {
      media: AnimeMedia[];
    }
  }

const SEARCH_ANIME = gql`
  query ($search: String) {
    Page(page: 1, perPage: 5) {
      media(search: $search) {
        id
        title {
          romaji
          english
        }
      }
    }
  }
`;

function SearchDropdown() {
    const [searchTerm, setSearchTerm] = useState('');

    const { loading, error, data } = useQuery<AnimeData>(SEARCH_ANIME, {
        variables: { search: searchTerm },
        skip: searchTerm.length < 2
    })

    return (
        <div className='relative z-50'>
          <div className='flex justify-center mt-8'>
            <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search anime...'
            className='w-[200px] p-2 rounded bg-white text-black focus:outline-none'
            />
          </div>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}

            <div className='flex justify-center'>
            {data && (
                <div className='flex flex-col top-full left-0 w-[200px] bg-white mt-2 rounded z-50'>
                    {data.Page.media.map((anime) => (
                        <div key={anime.id} className='text-black p-2 cursor-pointer'>
                            {anime.title.english || anime.title.romaji}
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    )
}

export default SearchDropdown