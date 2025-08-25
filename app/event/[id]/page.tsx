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
    <div className="min-h-screen bg-gray-50">
        {/*Event Details Section */}
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden"></div>
        </div>
    </div>
    

  )
}

export default EventPage