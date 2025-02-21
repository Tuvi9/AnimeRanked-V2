import animeService from '../services/animeService';

interface AnimeCardProps {
    id: number;
    rank: number;
    title: string;
    description: string;
    coverImage: string;
    onDelete?: () => void;
}

function AnimeCard({ id, rank, title, description, coverImage, onDelete }: AnimeCardProps) {
    const getRankColor = (rank: number) => {
        switch(rank) {
            case 1:
                return 'text-[#FFD700]'; // Gold
            case 2:
                return 'text-[#C0C0C0]'; // Silver
            case 3:
                return 'text-[#CD7F32]'; // Bronze
            default:
                return 'text-cyan'; // Default gray
        }
    }

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this anime?');
        
        if (confirmed) {
            try {
                // calls function to delete anime
                await animeService.deleteAnime(id);
                if (onDelete) {
                    onDelete();
                }
            } catch (error) {
                console.error('Failed to delete anime:', error);
                alert('Failed to delete anime. Please try again.');
            }
        }
    }

    return (
    <div className='grid grid-cols-[auto_1fr] border bg-midnight p-4 mb-[50px] rounded-2xl shadow-[5px_4px_4px_0px_rgba(0,229,255,0.25)]'>
            <div className={`flex items-center text-[80px] font-bold mr-8 ${getRankColor(rank)}`}>
                {rank}#
            </div>
            <div className='w-[200px] h-[200px]'>
                <img
                    src={coverImage}
                    alt={title}
                    className='w-full h-full object-fit rounded-2xl'
                />
            </div>
            <br/>
            <div className='col-start-1 col-end-3 line-clamp-4'>
                <div className="flex justify-between items-center mb-2">
                    <h2 className='text-2xl font-bold text-white'>{title}</h2>
                    <div className='py-4'>
                        <button 
                            // button for deleting anime
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <p className='text-gray-300'>{description}</p>
            </div>
    </div>
    )
}

export default AnimeCard