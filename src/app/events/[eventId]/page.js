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
    
    function formatDateForGoogle(dateStr) {
        const date = new Date(dateStr);
        return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
    }
    

    if (!eventInfo) {
        return (
            <div>
                Event not found
            </div>
        );
    }
    const startDate = eventInfo.event.first_date;
    const endDate = eventInfo.event.last_date;

    return (
        <main className="flex flex-col items-center min-h-screen bg-white px-6 py-20">
            <div className="max-w-3xl mx-auto">
                <section className="flex flex-col items-center gap-y-[15px]">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">{eventInfo.event.title}</h1>
                    <img src={eventInfo.event.photo_url} width="500" height="300"/>
                    
                    <p className="text-black mb-2"><strong>Hosted by:</strong> {eventInfo.event.location_name || 'Unknown'}</p>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
                        <p className="text-gray-800 text-base leading-relaxed">
                            {eventInfo.event.description_text || 'No description available.'}
                        </p>
                    </div>

                    <a
                        href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventInfo.event.title)}&dates=${formatDateForGoogle(startDate)}%2F${formatDateForGoogle(endDate)}&details=${encodeURIComponent(eventInfo.event.description_text || '')}&location=${encodeURIComponent(eventInfo.event.location_name || '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
                        >
                        Add to Google Calendar
                    </a>


                </section>
                <section className="mt-10">
                    <CommentSection />
                </section>
            </div>
        </main>
      );

  }
