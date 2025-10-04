import {create} from "zustand"

export const store = create<{
    username: string | null;
    setUsername: (username: string) => void;

    tripId: number;
    setTripId: (tripId: number) => void;
}>(() => {
    return {
        username: "",
        setUsername: (username) => {
            store.setState({username});
        },

        tripId: -1,
        setTripId: (tripId) => {
            store.setState({tripId})
        }
    };
});