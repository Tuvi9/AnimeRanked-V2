import { useState, useCallback, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import debounce from 'lodash/debounce';
import supabase from "../utils/supabaseClient";
import animeService from "../services/animeService";


interface AnimeTitle {
    english: string;
  }

  interface AnimeMedia {
    id: number;
    title: AnimeTitle;
    description: string;
    coverImage: {
      extraLarge: string;
      large: string;
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
        description(asHtml: false)
        coverImage {
          extraLarge
          large
        }
      }
    }
  }
`;

interface SearchDropdownProps {
    onAnimeAdded?: () => void;
}

function SearchDropdown({ onAnimeAdded }: SearchDropdownProps) {
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
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                console.log('No user logged in');
                return;
            }
            // anime data is transformed
            await animeService.addAnime({
                title_english: anime.title.english,
                description: anime.description,
                cover_image: anime.coverImage.extraLarge,
                cover_image_mobile: anime.coverImage.large,
                user_id: user.id
            });

            if (onAnimeAdded) {
                onAnimeAdded();
            }

            SetInputValue('');
        } catch (error) {
            console.error('Failed to add anime:', error);
            alert('Failed to add anime. Please try again.');
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
        <div className='relative z-40'>
          <div className='flex justify-center mt-8'>
            <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Search anime...'
            className='w-[200px] md:w-[300px] h-[50px] text-xl md:text-2xl p-2 rounded-xl bg-midnight text-cyan font-bold placeholder-cyan focus:outline-none'
            />
          </div>

          {inputValue.length >= 2 && (
            <div className='flex justify-center rounded-2xl'>
            {loading && <div className="top-full left-0 w-[200px] md:w-[300px] text-xl bg-midnight mt-1 rounded-2xl p-2 text-cyan font-bold">Loading...</div>}
            {error && <div className="top-full left-0 w-[200px] md:w-[300px] text-xl bg-midnight mt-1 rounded-2xl p-2 text-cyan font-bold">Error: {error.message}</div>}
            {data && (
                <div className='flex flex-col top-full left-0 w-[200px] md:w-[300px] text-xl bg-midnight mt-2 rounded-2xl z-50 bg-midnight'>
                    {data.Page.media.map((anime) => (
                        <div
                            key={anime.id}
                            // returns the animes data back to handleAnimeSelect
                            onClick={() => handleAnimeSelect(anime)}
                            className='bg-midnight text-cyan p-2 cursor-pointer font-bold rounded-2xl'
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