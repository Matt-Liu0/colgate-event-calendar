import React from "react";
import CommentSection from "./CommentSection";
import { Carter_One } from "next/font/google";

async function getEventData(eventId) {
    const response = await fetch(`https://calendar.colgate.edu/api/2/events/${eventId}`);
    
    if (!response.ok) {
        throw new Error("No event found!");
    }

    const eventInfo = await response.json();
    return eventInfo;
}

export default async function EventPage({ params }) {
    const { eventId } = await params;
    const eventInfo = await getEventData(eventId);
    
    function formatDateForGoogle(dateStr) {
        const date = new Date(dateStr);
        return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
    }

    if (!eventInfo) {
        return <div>Event not found</div>;
    }

    const startDate = eventInfo.event.first_date;
    const endDate = eventInfo.event.last_date;

    const themes = eventInfo.event.filters?.event_event_themes || [];

    return (
        <main className="flex flex-col items-center min-h-screen bg-[#821019] px-6 py-20">
            <div className="max-w-3xl mx-auto">
                <section className="flex flex-col items-center gap-y-[15px]">
                    
                    <h1 className="text-4xl text-[#D7B865] font-[cinzel] font-[700] mb-4">{eventInfo.event.title}</h1>
                    <img src={eventInfo.event.photo_url} width="500" height="300" className="border border-[#D7B865] border-[2px] rounded-[5px]" />
                    
                    <p className="text-[#F3EBD3] mb-2"><strong>Hosted by:</strong> {eventInfo.event.location_name || 'Unknown'}</p>

                    {themes.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {themes.map((theme) => (
                            <span
                                key={theme.id}
                                className="inline-block px-3 py-1 text-xs bg-red-100 text-[#821019] rounded-full whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis"
                                style={{
                                display: 'inline-block',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                }}
                            >
                                {theme.name}
                            </span>
                            ))}
                        </div>
                    )}

                    
                    <div className="bg-[#821019] border border-[#D7B865] border-[2px] rounded-xl p-4 shadow-sm mb-6">
                        <p className="text-[#F3EBD3] text-800 text-base leading-relaxed">
                            {eventInfo.event.description_text || 'No description available.'}
                        </p>
                    </div>
                    
                    <a
                        href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventInfo.event.title)}&dates=${formatDateForGoogle(startDate)}%2F${formatDateForGoogle(endDate)}&details=${encodeURIComponent(eventInfo.event.description_text || '')}&location=${encodeURIComponent(eventInfo.event.location_name || '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-red-600 text-[#F3EBD3] rounded-full hover:bg-red-700 transition-colors duration-200"
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
