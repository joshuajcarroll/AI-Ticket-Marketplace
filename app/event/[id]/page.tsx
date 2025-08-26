import Spinner from "@/components/Spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useStorageUrl } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
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
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Event Image */}
                {imageUrl && (
                    <div className="aspect-[21/9] relative w-full">
                        <Image
                            src={imageUrl}
                            alt={event.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
                {/*Event Details in depth */}
                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900">{event.name}</h1>
                                <p className="text-lg text-gray-600">{event.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

  )
}

export default EventPage