import React from "react";

async function getEventData(eventId) {
    const response = await fetch(`https://calendar.colgate.edu/api/2/events/${eventId}`);
    
    //returns 404 if event does not exist
    if (!response.ok) {
        throw new Error("No event found!");
    }

    const eventInfo = await response.json(); //parses it into json
    return eventInfo;

}

const handleSubmit = () => {
    //placeholder
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

    console.log(eventInfo)


    return (
        <main className="min-h-screen p-10 bg-white">
          <h1 className="text-4xl font-bold text-red-600 mb-4">{eventInfo.event.title}</h1>
          <p className="text-black mb-2"><strong>Hosted by:</strong> {eventInfo.event.location_name || 'Unknown'}</p>
          <p className="text-black mb-6">{eventInfo.event.description_text || 'No description available.'}</p>
          <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
            Add to Calendar
          </button>

          {/* <section>
              <h2 className="text-2xl font-semibold mb-2 text-black">Leave a Comment</h2>
              <form onSubmit={() => handleSubmit()} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here..."
                  className="w-full p-4 border border-black text-black rounded-xl mb-2"
                  rows="4"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  Submit
                </button>
              </form>
    
              <div>
                <h3 className="text-lg font-semibold mb-2 text-black">Comments</h3>
                {comments.length === 0 ? (
                  <p className="text-black/60">No comments yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {comments.map((c, index) => (
                      <li key={index} className="bg-black/10 p-3 rounded-xl text-black">
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section> */}
          
        </main>
      );

    //   figure out how to integrate this code here
    // return (
    //     <main className="min-h-screen bg-white px-6 py-10">
    //       <div className="max-w-3xl mx-auto">
    //         <h1 className="text-4xl font-bold text-red-600 mb-4">Event #{eventid}</h1>
    //         <p className="text-black mb-4">
    //           This is a placeholder detail page for event ID <strong>{id}</strong>.
    //         </p>
    
    //         <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
    
    //         <button className="mb-10 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
    //           Add to Calendar
    //         </button>
    
    //         <section>
    //           <h2 className="text-2xl font-semibold mb-2 text-black">Leave a Comment</h2>
    //           <form onSubmit={handleSubmit} className="mb-6">
    //             <textarea
    //               value={comment}
    //               onChange={(e) => setComment(e.target.value)}
    //               placeholder="Write your comment here..."
    //               className="w-full p-4 border border-black text-black rounded-xl mb-2"
    //               rows="4"
    //             />
    //             <button
    //               type="submit"
    //               className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
    //             >
    //               Submit
    //             </button>
    //           </form>
    
    //           <div>
    //             <h3 className="text-lg font-semibold mb-2 text-black">Comments</h3>
    //             {comments.length === 0 ? (
    //               <p className="text-black/60">No comments yet.</p>
    //             ) : (
    //               <ul className="space-y-2">
    //                 {comments.map((c, index) => (
    //                   <li key={index} className="bg-black/10 p-3 rounded-xl text-black">
    //                     {c}
    //                   </li>
    //                 ))}
    //               </ul>
    //             )}
    //           </div>
    //         </section>
    //       </div>
    //     </main>
    //   );

  }
