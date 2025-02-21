import supabase from '../utils/supabaseClient';

// function for deleting anime
const animeService = {
    async deleteAnime(animeId: number) {
        try {
            const { error } = await supabase
                .from('animes')
                .delete()
                .eq('id', animeId);

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error deleting anime:', error);
            throw error;
        }
    }
};

export default animeService