import { useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient';
import AnimeCard from '../components/AnimeCard';
import NavBar from '../components/NavBar';
import SearchDropdown from '../components/SearchDropdown';

interface Anime {
    id: number;
    title_english: string;
    description: string;
    cover_image: string;
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
                .order('id', { ascending: true })
                .returns<Anime[]>();

            if (error) {
                console.error('Error fetching animes:', error);
                return;
            }

            if (data) {
                setAnimes(data);
            }
        }
    };

    useEffect(() => {
        fetchAnimes();
    }, []);
    // refreshes anime list
    const handleDelete = () => {
        fetchAnimes();
    };

    return (
        <div className='bg-black min-h-screen p-4'>
            <NavBar/>
            <div className='max-w-4xl mx-auto pt-[80px]'>
                <SearchDropdown />
                <div className='mt-8 space-y-4'>
                    {animes.map((anime, index) => (
                        // maps over fetched animes
                        <AnimeCard
                            key={anime.id}
                            id={anime.id}
                            rank={index + 1}
                            title={anime.title_english}
                            description={anime.description}
                            coverImage={anime.cover_image}
                            // calls function after deletion
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;