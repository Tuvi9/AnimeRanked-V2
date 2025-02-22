import { useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient';
import AnimeCard from '../components/AnimeCard';
import NavBar from '../components/NavBar';
import SearchDropdown from '../components/SearchDropdown';

interface Anime {
    id: number;
    anime_id: number | null;
    title_english: string | null;
    description: string | null;
    cover_image: string | null;
    cover_image_mobile: string;
    created_at: string;
    user_id: string;
}

function Home() {
    const [animes, setAnimes] = useState<Anime[]>([]);

    const fetchAnimes = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { data, error } = await supabase
                .from('animes')
                .select('*')
                .eq('user_id', user.id)
                .order('rank', { ascending: true });

            if (error) {
                console.error('Error fetching animes:', error);
                return;
            }

            if (data) {
                setAnimes(data as Anime[]);
            }
        }
    };
    // Fetches all of the users anime
    useEffect(() => {
        fetchAnimes();
    }, []);
    
    const handleDelete = () => {
        fetchAnimes(); // Refresh the list when an anime is deleted
    };

    const handleAnimeAdded = () => {
        fetchAnimes();  // Refresh the list when new anime is added
    };

    const handleUpdate = () => {
        fetchAnimes();  // Refresh the list when description is updated
    };

    return (
        <div className='bg-black min-h-screen p-4'>
            <NavBar/>
            <div className='max-w-4xl mx-auto pt-[80px]'>
                {/* addAnime */}
                <SearchDropdown onAnimeAdded={handleAnimeAdded} />
                <div className='mt-8 space-y-4'>
                    {animes.map((anime, index) => (
                        // maps fetched animes
                        <AnimeCard
                            key={anime.id}
                            id={anime.id}
                            rank={index + 1}
                            title={anime.title_english || 'Untitled'}
                            description={anime.description || 'No description available'}
                            coverImage={anime.cover_image || ''}
                            coverImageMobile={anime.cover_image_mobile}
                            // deleteAnime
                            onDelete={handleDelete}
                            // updateDesc
                            onUpdate={handleUpdate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;