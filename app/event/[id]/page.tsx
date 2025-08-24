import Spinner from "@/components/Spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useStorageUrl } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

function EventPage() {
    const { user } = useUser();
    const params = useParams();
    const event = useQuery(api.events.getById, { eventId: params.id  as Id<"events">});
    const availability = useQuery(api.events.getEventAvailability, { eventId: params.id  as Id<"events">});
    const imageUrl = useStorageUrl(event?.imageStorageId);

    if(!event || !availability) {
        return <div className="min-h-screen flex items-center justify-center">
            <Spinner />
        </div>
    }
  return (
    <div>Event Page</div>
  )
}

export default EventPage