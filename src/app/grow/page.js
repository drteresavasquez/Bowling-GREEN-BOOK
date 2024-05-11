"use client";
import { useState } from "react";
import { chatWithBot } from "../../api/AI";
import ChatCard from "@/components/ChatCard";

const eatOptions = [
  {
    option: "Painting",
    prompt:
      "Where are the best locations in Bowling Green, KY to learn to paint? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
  {
    option: "Coding",
    prompt:  "Where are the best locations in Bowling Green, KY to learn to code? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
  {
    option: "Gardening",
    prompt:  "Where are the best locations in Bowling Green, KY to learn to garden? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
];

const starterContent = `Ready to dive into a world of knowledge right here in Bowling Green, KY? Look no further than BG Knowledge Hub, your gateway to learning new things and expanding your horizons!

🔍 Discover New Horizons: Whether you're a history buff, an art enthusiast, or a science lover, BG Knowledge Hub has something for everyone. Explore a diverse range of topics and uncover hidden gems of wisdom waiting to be explored.

🎓 Options or Input: Choose from our curated selection of educational institutions, museums, libraries, and more. Want to delve into a specific subject? Simply input your interests, and we'll guide you to the best places to satisfy your curiosity.

📍 Find Your Way: Never get lost on your quest for knowledge! We provide detailed addresses for each learning hotspot, ensuring you arrive at your destination with ease.

🌟 Reviews and Recommendations: Hear what others have to say about their learning experiences. Dive into insightful reviews from fellow learners and make informed decisions about where to spark your next intellectual adventure.

Embrace the thrill of discovery with BG Knowledge Hub and unlock the secrets of Bowling Green, one lesson at a time. Let the journey begin! 🌈📖🔬`;

export default function GrowView() {
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
    talkWithBot(`Where are the best locations in Bowling Green, KY to learn or grow my skills in ${other}? Please give me at least 3 options and provide the address and reviews from other diners.`);
    setOther('');
  }

  return (
    <div>
      <h1>Grow in BG!</h1>
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
              value={other}
              disabled={disabled}
              className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="What would you like to learn?"
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
