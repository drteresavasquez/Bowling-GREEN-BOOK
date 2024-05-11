const CHAT = process.env.NEXT_PUBLIC_CHATGPT;

export const chatWithBot = (userInput) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${CHAT}`);

  const raw = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: userInput,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("https://api.openai.com/v1/chat/completions", requestOptions)
  .then((response) => response.json())
  .then((result) => (result))
  .catch((error) => console.error(error));
};
