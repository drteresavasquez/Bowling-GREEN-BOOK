"use client";
import { useState } from "react";
import { chatWithBot } from "../../api/AI";
import ChatCard from "@/components/ChatCard";

const eatOptions = [
  {
    option: "Steak",
    prompt:
      "Where are the best resaturants in Bowling Green, KY to get a steak? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
  {
    option: "Vegan",
    prompt:  "Where are the best resaturants in Bowling Green, KY to get vegan? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
  {
    option: "Seafood",
    prompt:  "Where are the best resaturants in Bowling Green, KY to get seafood? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
];

const starterContent = `Hungry for some local flavor in Bowling Green, KY? Chow Down BG has got your back! Whether you're in the mood for mouthwatering barbecue, savory Southern classics, or international delights, we've got the scoop on all the best spots in town.

🔎 Explore or Input: Dive into our curated list of top-rated eateries, handpicked by locals who know their food. Feeling adventurous? You can also input your cravings, and we'll serve up personalized recommendations just for you.

📍 Address and Reviews: Get the lowdown on each restaurant's address, so you never get lost on your culinary journey. Plus, check out honest reviews from fellow foodies to make sure you're in for a delicious experience.

From cozy cafes to bustling bistros, Chow Down BG is your ticket to gastronomic bliss in Bowling Green. So what are you waiting for? Let's eat! 🍔🥗🍕`
export default function EatView() {
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
    setOther('');
    talkWithBot(`Where are the best resaturants in Bowling Green, KY to get ${other}? Please give me at least 3 options and provide the address and reviews from other diners.`);
  }

  return (
    <div>
      <h1>Eat in BG!</h1>
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
              value={other}
              disabled={disabled}
              name="other"
              id="other"
              className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="What would you like to eat?"
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
