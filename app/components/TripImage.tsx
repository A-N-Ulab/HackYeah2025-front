import { Destination } from "../types/Destination";

export default function TripImage({ destination }: { destination: Destination }) {
    return (
        <div className="trip-image">
            <img draggable="false" src={"https://trip-photos.sfo3.digitaloceanspaces.com/" + destination.photo_name +"?raw=true"} alt={destination.name} />
        </div>
    );
}
