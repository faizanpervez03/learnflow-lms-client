import React from 'react'






const clients = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "Notion",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  },
  {
    name: "Slack",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
  },
  {
    name: "Figma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  }
]


const TrustedClientSection = () => {
  return (

    <>

        
    <section className="bg-white py-12 px-6 md:px-16 border-y-2 border-gray-300 border-b-2 border-gray-300 ">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
 
        {/* Heading */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-400">
          Trusted by the World's Leading Institutions
        </p>
 
        {/* Logos */}
        <div className="flex flex-wrap mt-4 items-center justify-center gap-8 md:gap-14">
          {clients.map((client, i) => (
            <div
              key={i}
              className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-7 md:h-8 object-contain"
              />
            </div>
          ))}
        </div>
 
      </div>
    </section>
  
    </>
  )
}

export default TrustedClientSection
