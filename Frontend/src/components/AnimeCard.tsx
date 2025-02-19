interface AnimeCardProps {
    rank: number;
    title: string;
    description: string;
    coverImage: string;
}

function AnimeCard({ rank, title, description, coverImage }: AnimeCardProps) {
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
                <h2 className='text-2xl font-bold text-white mb-2'>{title}</h2>
                <p className='text-gray-300'>{description}</p>
            </div>
    </div>
    )
}

export default AnimeCard