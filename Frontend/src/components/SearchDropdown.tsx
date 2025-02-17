import { useState, useCallback, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import debounce from 'lodash/debounce';
import supabase from "../utils/supabaseClient";


interface AnimeTitle {
    english: string | null;
  }

  interface AnimeMedia {
    id: number;
    title: AnimeTitle;
    description: string;
    coverImage: {
      extraLarge: string;
    }
  }

  interface AnimeData {
    Page: {
      media: AnimeMedia[];
    }
  }

  type DebouncedFunction = {
    (value: string): void;
    cancel(): void;
  }

const SEARCH_ANIME = gql`
  query ($search: String) {
    Page(page: 1, perPage: 5) {
      media(search: $search) {
        id
        title {
          english
        }
        description
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

function SearchDropdown() {
    const [inputValue, SetInputValue]= useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Waits 300ms before making another API request
    const debouncedSetSearch= useCallback(
      debounce((value: string) => {
        setSearchTerm(value);
      }, 300) as DebouncedFunction,
      []
    );

    // Inserts selected anime
    const handleAnimeSelect = async (anime: AnimeMedia) => {
        try {
          const { error } = await supabase
            .from('animes')
            .insert({
              anime_id: anime.id,
              title_english: anime.title.english,
              description: anime.description,
              cover_image: anime.coverImage.extraLarge
            });

          if (!error) {
            console.log('Successfully added anime:', anime.title.english);
            SetInputValue('');
          }

          if (error) throw error;

        } catch (error) {
          console.log('Error adding anime:', error)
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      SetInputValue(value); // Immidiate input update
      debouncedSetSearch(value) // Delayed API call
    };

    // API Call
    const { loading, error, data } = useQuery<AnimeData>(SEARCH_ANIME, {
        variables: { search: searchTerm },
        skip: searchTerm.length < 2,
    })

    useEffect(() => {
      return () => {
        debouncedSetSearch.cancel();
      };
    }, [debouncedSetSearch])

    return (
        <div className='relative z-50'>
          <div className='flex justify-center mt-8'>
            <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Search anime...'
            className='w-[200px] p-2 rounded bg-white text-black focus:outline-none'
            />
          </div>

          {inputValue.length >= 2 && (
            <div className='flex justify-center'>
            {loading && <div className="top-full left-0 w-[200px] bg-white mt-1 rounded p-2 text-black">Loading...</div>}
            {error && <div className="top-full left-0 w-[200px] bg-white mt-1 rounded p-2 text-black">Error: {error.message}</div>}
            {data && (
                <div className='flex flex-col top-full left-0 w-[200px] bg-white mt-2 rounded z-50'>
                    {data.Page.media.map((anime) => (
                        <div
                            key={anime.id}
                            onClick={() => handleAnimeSelect(anime)}
                            className='text-black p-2 cursor-pointer'
                        >
                            {anime.title.english}
                        </div>
                    ))}
                </div>
            )}
            </div>
          )}
        </div>
    )
}

export default SearchDropdown