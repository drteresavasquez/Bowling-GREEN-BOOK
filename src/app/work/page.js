"use client";
import { useState } from "react";
import { chatWithBot } from "../../api/AI";
import ChatCard from "@/components/ChatCard";

const eatOptions = [
  {
    option: "Entreprenuer",
    prompt:
      "Where are the best locations in Bowling Green, KY to to find support as an Entreprenuer? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
  {
    option: "Tech",
    prompt:  "Where are the best locations in Bowling Green, KY to find a job in tech? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
  {
    option: "Education",
    prompt:  "Where are the best locations in Bowling Green, KY to find a job in education? Please give me at least 3 options and provide the address and reviews from other diners.",
  },
];

const starterContent = `Ready to level up your work game in Bowling Green, KY? Welcome to Work Oasis, your ultimate guide to finding the perfect spot to unleash your productivity and creativity!

💻 Options Galore: Whether you thrive in a cozy café setting, a collaborative coworking space, or a quiet library corner, Work Oasis has an array of options to suit your working style. Explore our handpicked selection of work-friendly venues and discover your ideal work environment.

📝 Select or Suggest: Take your pick from our curated list of workspaces tailored to meet your professional needs. Want to share your favorite hidden gem? Feel free to suggest new spots, and we'll help spread the word!

📍 Find Your Focus: Navigate your way to productivity with ease. We provide detailed addresses for each workspace, ensuring you arrive at your chosen destination ready to tackle your tasks head-on.

⭐ Reviews and Recommendations: Hear from fellow professionals about their experiences. Dive into insightful reviews and recommendations to make informed decisions about where to set up your work basecamp.

Unlock your full potential and elevate your work game with Work Oasis. It's time to turn your aspirations into achievements! 💪🏽✨📊`;

export default function WorkView() {
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
    talkWithBot(`Where are the best locations in Bowling Green, KY to find a job in ${other}? Please give me at least 3 options and provide the address and reviews from other diners.`);
    setOther('');
  }

  return (
    <div>
      <h1>Work in BG!</h1>
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
              disabled={disabled}
              id="other"
              value={other}
              className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="What would you like to work?"
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
