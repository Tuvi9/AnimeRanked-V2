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
        cover_image_mobile: string,
        user_id: string
    }) {
        try {

            const { data: maxRankResult } = await supabase
                .from('animes')
                .select('rank')
                .eq('user_id', animeData.user_id)
                .order('rank', {ascending: false}) // Sort highest to lowest
                .limit(1);

            // add +1 to new anime from previous lowest
            const newRank = (maxRankResult?.[0]?.rank || 0) +1;

            // Insert data into supabase
            const { data, error } = await supabase
                .from('animes')
                .insert({
                    ...animeData,
                    rank: newRank
                })
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error adding anime:', error);
            throw error;
        }
    },
    // updating Description
    async updateDesc(descData:{
        id: number,
        description: string
    }) {
        try {
            const { error } = await supabase
                .from('animes')
                .update({description: descData.description})
                .eq('id', descData.id)
                .select();

            if (error) throw error;
            return { success: true }
        } catch (error) {
            console.error('Error updating description', error);
            throw error;
        }
    },
    // updates animes rank
    async updateRank(id: number, newRank:number) {
        try {
            const { error } = await supabase
                .from('animes')
                .update({ rank: newRank})
                .eq('id', id)

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error updating rank:', error);
            throw error;
        }
    }
};

export default animeService