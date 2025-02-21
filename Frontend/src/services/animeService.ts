import supabase from '../utils/supabaseClient';


const animeService = {
    // function for deleting anime
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
    },
    // function for adding anime
    async addAnime(animeData: {
        title_english: string,
        description: string,
        cover_image: string,
        user_id: string
    }) {
        try {
            // Insert data into supabase
            const { data, error } = await supabase
                .from('animes')
                .insert(animeData)
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error adding anime:', error);
            throw error;
        }
    }
};

export default animeService