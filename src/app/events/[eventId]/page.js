import React from "react";
import CommentSection from "./CommentSection";

async function getEventData(eventId) {
    const response = await fetch(`https://calendar.colgate.edu/api/2/events/${eventId}`);
    
    //returns 404 if event does not exist
    if (!response.ok) {
        throw new Error("No event found!");
    }

    const eventInfo = await response.json(); //parses it into json
    return eventInfo;

}


export default async function EventPage({ params }) {

    //eventId was passed through the href in app/page.js and is part of params
    const {eventId} = await params;
    const eventInfo = await getEventData(eventId);

    if (!eventInfo) {
        return (
            <div>
                Event not found
            </div>
        );
    }

    return (
        <main className="flex flex-col items-center min-h-screen bg-white px-6 py-20">
            <div className="max-w-3xl mx-auto">
                <section className="flex flex-col items-center gap-y-[15px]">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">{eventInfo.event.title}</h1>
                    <img src={eventInfo.event.photo_url} width="300" height="200"/>
                    <p className="text-black mb-2"><strong>Hosted by:</strong> {eventInfo.event.location_name || 'Unknown'}</p>
                    <p className="text-black mb-6">{eventInfo.event.description_text || 'No description available.'}</p>
                    <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                        Add to Calendar
                    </button>
                </section>
                <section className="mt-10">
                    <CommentSection />
                </section>
            </div>
        </main>
      );

  }
