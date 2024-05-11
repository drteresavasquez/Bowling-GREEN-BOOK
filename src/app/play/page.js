"use client";
import { useState } from "react";
import { chatWithBot } from "../../api/AI";
import ChatCard from "@/components/ChatCard";

const eatOptions = [
  {
    option: "Rock Climbing",
    prompt:
      "Where are the best locations in Bowling Green, KY to learn to Rock Climb? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
  {
    option: "Bowling",
    prompt:  "Where are the best locations in Bowling Green, KY to learn to bowl? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
  {
    option: "Skating",
    prompt:  "Where are the best locations in Bowling Green, KY to learn to skate? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
];

const starterContent = `Looking to add some excitement to your days in Bowling Green, KY? Get ready to unleash your inner child and discover endless opportunities for play and fun with Playtime Paradise!

🕹️ Endless Options: From thrilling outdoor adventures to action-packed indoor attractions, Playtime Paradise has something for every thrill-seeker and fun-lover. Dive into our collection of top-rated entertainment spots and let the good times roll!

🌟 Choose or Suggest: Take your pick from our carefully curated list of hotspots guaranteed to ignite your sense of adventure. Want to try something new? Feel free to suggest your favorite activities, and we'll point you in the right direction!

📍 Find Your Fun: Never miss out on the action! We provide detailed addresses for each playtime destination, ensuring you arrive at your chosen spot with ease and excitement.

🎉 Reviews and Ratings: Hear what other thrill-seekers have to say about their experiences. Check out insightful reviews and ratings from fellow adventurers to help you plan the ultimate day of fun in Bowling Green.

Get ready to embark on an unforgettable journey of excitement and laughter with Playtime Paradise. Let's make memories that last a lifetime! 🚀🎉🎲`;

export default function PlayView() {
  const [conversation, setConversation] = useState([]);
  const [other, setOther] = useState("");
  const [disabled, setDisabled] = useState(false);

  const talkWithBot = (prompt) => {
    setDisabled(true);
    chatWithBot(prompt).then((data) => {
      setConversation((prevState) => [
        ...prevState,
        data.choices[0].message.content,
      ])
      setDisabled(false);
    }
    );
  };

  const handleOtherChange = (e) => {
    setOther(e.target.value);
  }

  const submitOther = (e) => {
    e.preventDefault();
    talkWithBot(`Where are the best locations in Bowling Green, KY to have fun doing ${other}? Please give me at least 3 options and provide the address and reviews from other diners.`);
    setOther('');
  }

  return (
    <div>
      <h1>Play in BG!</h1>
      <ChatCard image="https://reppedbot.reppedin.tech/assets/images/image01.png?v=6fef28ed" 
      content={starterContent} botName="GREEN BOT" />
      <div className="mt-6">
        {eatOptions.map((o) => (
          <button
            key={o.option}
            disabled={disabled}
            type="button"
            onClick={() => talkWithBot(o.prompt)}
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 me-2"
          >
            {o.option}
          </button>
        ))}
        <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <label
            htmlFor="name"
            className="block text-xs font-medium text-gray-900"
          >
            Other
          </label>
          <form onSubmit={submitOther}>
            <input
              type="text"
              name="other"
              id="other"
              disabled={disabled}
              value={other}
              className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="What would you like to play?"
              onChange={handleOtherChange}
            />
          </form>
        </div>
        {conversation.map((c, i) => (
          <ChatCard key={i} content={c} />
        ))}
      </div>
    </div>
  );
}
