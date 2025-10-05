import { Destination } from "../types/Destination";

export default function TripImage({ destination }: { destination: Destination }) {
    return (
        <div className="trip-image">
            <img src={"https://github.com/A-N-Ulab/HackYeah2025-data/blob/master/photos/" + destination.photo_name +"?raw=true"} alt={destination.name} />
        </div>
    );
}
