export type ChoiceQuestion = {
  id: string
  prompt: string
  options: readonly string[]
  answer: number
}

export type ChoicePart = {
  id: string
  title: string
  instruction: string
  script?: string
  passage?: string
  questions: readonly ChoiceQuestion[]
}

export const LISTENING_PARTS: readonly ChoicePart[] = [
  {
    id: "l1",
    title: "Part 1 — A conversation",
    instruction: "You will hear a student booking a room. Play the recording, then choose the correct letter. You may play it twice.",
    script: `Officer: Good morning, Riverside College accommodation office. How can I help?
Student: Hello. My name is Minh Tran. I need a room for the September intake.
Officer: We can offer a shared flat on Baker Street, room 14, or a studio on Harper Lane.
Student: I'll take the shared flat. What deposit do I need to pay?
Officer: The deposit is two hundred and fifty pounds, and it must arrive by the 12th of August. Check-in starts at 2 pm.
Student: Is there anywhere to leave a bicycle?
Officer: Yes. The lock-up is behind the building. The door code is 4816.`,
    questions: [
      {
        id: "l1q1",
        prompt: "What is the student's family name?",
        options: ["Baker", "Tran", "Harper", "Minh"],
        answer: 1,
      },
      {
        id: "l1q2",
        prompt: "Which room does the student choose?",
        options: ["Studio on Harper Lane", "Room 12, Baker Street", "Room 14, Baker Street", "Room 16, Harper Lane"],
        answer: 2,
      },
      {
        id: "l1q3",
        prompt: "How much is the deposit?",
        options: ["£120", "£200", "£250", "£480"],
        answer: 2,
      },
      {
        id: "l1q4",
        prompt: "When must the deposit arrive?",
        options: ["2 August", "12 August", "12 September", "14 September"],
        answer: 1,
      },
      {
        id: "l1q5",
        prompt: "What is the bicycle lock-up code?",
        options: ["1486", "4168", "4816", "2500"],
        answer: 2,
      },
    ],
  },
  {
    id: "l2",
    title: "Part 2 — A short talk",
    instruction: "You will hear a tutor introduce a city tree project. Choose the correct letter. You may play the recording twice.",
    script: `Tutor: This term our fieldwork is in Leeds, not Manchester. The council has planted twelve thousand young trees since 2021. The main aim is not shade for shoppers. The trees are there to bring summer street temperatures down by about two degrees. The difficulty is survival. Around forty percent of the saplings die in the first year, usually because nobody waters them in July. Our group will join the Thursday volunteer rota, meeting at the civic centre at half past nine. Please bring a notebook. Cameras are optional, but you must not climb any of the trees.`,
    questions: [
      {
        id: "l2q1",
        prompt: "Where will the students do fieldwork?",
        options: ["Manchester", "Leeds", "The botanical garden"],
        answer: 1,
      },
      {
        id: "l2q2",
        prompt: "How many trees has the council planted since 2021?",
        options: ["1,200", "12,000", "20,000"],
        answer: 1,
      },
      {
        id: "l2q3",
        prompt: "What is the main purpose of the trees?",
        options: ["To lower summer temperatures", "To hide the shops", "To attract tourists"],
        answer: 0,
      },
      {
        id: "l2q4",
        prompt: "What happens to many young trees?",
        options: ["They are moved to parks", "40% die in the first year", "They are cut down in July"],
        answer: 1,
      },
      {
        id: "l2q5",
        prompt: "When do the volunteers meet?",
        options: ["Friday at 9.00", "Thursday at 9.30", "Thursday at 2.00"],
        answer: 1,
      },
    ],
  },
]

export const READING_PARTS: readonly ChoicePart[] = [
  {
    id: "r1",
    title: "Passage 1 — The night-market effect",
    instruction: "Choose the letter that agrees with the passage.",
    passage: `City governments used to treat night markets as a nuisance: blocked pavements, late noise, and food waste. A decade of research in East and Southeast Asian cities has made that view harder to defend. When a market is given a fixed site, lighting, and a closing time, the surrounding streets often become safer after dark, because there are more people and more stallholders watching the road.

The economic effect is uneven. Cooked-food stalls raise footfall for nearby cafés that stay open, but clothing stalls can pull customers away from small shops that sell the same goods in the daytime. Researchers in Taipei found that shops within fifty metres of a cooked-food row increased evening sales, while shops beside clothing rows did not. The city did not publish figures for shops more than two streets away.

What does travel clearly is rent. Once a market becomes famous, landlords raise the price of the nearest storefronts, and the first stallholders — often families who started with a folding table — are replaced by businesses that can pay more. Night markets, in other words, can create a lively street and, at the same time, push out the people who made it lively.`,
    questions: [
      {
        id: "r1q1",
        prompt: "Officials once regarded night markets as a problem.",
        options: ["True", "False", "Not given"],
        answer: 0,
      },
      {
        id: "r1q2",
        prompt: "A fixed site and a closing time can make nearby streets safer at night.",
        options: ["True", "False", "Not given"],
        answer: 0,
      },
      {
        id: "r1q3",
        prompt: "Clothing stalls usually increase sales for nearby daytime shops.",
        options: ["True", "False", "Not given"],
        answer: 1,
      },
      {
        id: "r1q4",
        prompt: "Taipei published sales data for shops more than two streets from the market.",
        options: ["True", "False", "Not given"],
        answer: 1,
      },
      {
        id: "r1q5",
        prompt: "The first stallholders are always able to pay the higher rents.",
        options: ["True", "False", "Not given"],
        answer: 1,
      },
    ],
  },
  {
    id: "r2",
    title: "Passage 2 — How a reef keeps score",
    instruction: "Choose the correct letter.",
    passage: `A coral reef is not only a habitat. It is a record. Each year a healthy coral lays down a thin band of limestone, and the thickness of that band shows how kind or how harsh the year was. Marine scientists drill a pencil-wide core, a little like reading the rings of a tree, and then match the bands to sea-temperature logs.

The method has a limit. If the water stays too warm for several weeks, the coral expels the algae that feed it and the band for that year may be missing. A gap, therefore, can mean either that the coral stopped growing or that the core was damaged while it was being removed. Laboratories now photograph the core under ultraviolet light before they cut it, so a crack made by the drill is not mistaken for a year of heat.

Reef cores are also changing decisions on land. In one Pacific district, the cores showed that sediment from a new hillside road was smothering the reef more than the warmer water was. The council paused the second stage of the road and planted the slope. The reef did not recover in a single season, but the following year's band was measurable again. The scientists are careful about one claim they cannot make: a single core cannot date a storm to a particular week.`,
    questions: [
      {
        id: "r2q1",
        prompt: "What do the limestone bands mainly show?",
        options: [
          "The names of the fish that lived there",
          "How favourable each year was for the coral",
          "The exact week of a storm",
        ],
        answer: 1,
      },
      {
        id: "r2q2",
        prompt: "Why might a year be missing from a core?",
        options: [
          "The coral stopped growing, or the core was cracked",
          "The algae painted over the band",
          "The council removed that year of data",
        ],
        answer: 0,
      },
      {
        id: "r2q3",
        prompt: "What did the Pacific district do after reading the cores?",
        options: [
          "It closed the reef to swimmers",
          "It delayed the next stage of the road and planted the slope",
          "It drilled a second core the same day",
        ],
        answer: 1,
      },
      {
        id: "r2q4",
        prompt: "Scientists compare the bands with logs of sea ______.",
        options: ["temperature", "depth", "colour"],
        answer: 0,
      },
      {
        id: "r2q5",
        prompt: "A single core cannot time a storm to a particular ______.",
        options: ["week", "year", "coast"],
        answer: 0,
      },
    ],
  },
]

export const WRITING_PARTS: readonly ChoicePart[] = [
  {
    id: "w1",
    title: "Writing Task 1 — Read the table",
    instruction:
      "The table shows international students at a college. Choose the letter that reports the data correctly.",
    passage: "Country | 2022 | 2024\nVietnam | 180 | 260\nKorea | 140 | 135\nJapan | 90 | 150\nIndonesia | 40 | 95",
    questions: [
      {
        id: "w1q1",
        prompt: "Which country had the largest increase?",
        options: ["Korea", "Japan", "Vietnam", "Indonesia"],
        answer: 2,
      },
      {
        id: "w1q2",
        prompt: "Which group became smaller?",
        options: ["Vietnam", "Korea", "Japan", "Indonesia"],
        answer: 1,
      },
      {
        id: "w1q3",
        prompt: "How many students from Indonesia were there in 2024?",
        options: ["40", "90", "95", "150"],
        answer: 2,
      },
      {
        id: "w1q4",
        prompt: "Which sentence is an accurate overview?",
        options: [
          "Every country sent fewer students in 2024.",
          "Three countries grew, while Korea fell slightly.",
          "Japan had more students than Vietnam in both years.",
        ],
        answer: 1,
      },
      {
        id: "w1q5",
        prompt: "Which sentence makes a clear comparison?",
        options: [
          "Vietnam rose by 80, a larger gain than Japan's 60.",
          "The table is about students and also about the weather.",
          "Numbers changed, which is interesting for everyone.",
        ],
        answer: 0,
      },
    ],
  },
]

export const SPEAKING_PARTS: readonly ChoicePart[] = [
  {
    id: "s1",
    title: "Speaking — Choose the stronger answer",
    instruction: "Each item shows a question an examiner might ask. Choose the response that is clearest and most developed.",
    questions: [
      {
        id: "s1q1",
        prompt: "Where do you live now?",
        options: [
          "Yes.",
          "I live in a small flat in Hanoi with my parents, close to my college.",
          "Live.",
        ],
        answer: 1,
      },
      {
        id: "s1q2",
        prompt: "Do you prefer mornings or evenings? Why?",
        options: [
          "Morning.",
          "I prefer mornings because the campus is quiet and I concentrate better before class.",
          "I don't know the answer to this question at all.",
        ],
        answer: 1,
      },
      {
        id: "s1q3",
        prompt: "Describe a skill you taught yourself. Which opening is the most suitable?",
        options: [
          "I'd like to talk about learning to cook simple meals for myself.",
          "Skill is good.",
          "I will not answer this part.",
        ],
        answer: 0,
      },
      {
        id: "s1q4",
        prompt: "Why do some people give up a new skill after only a few weeks?",
        options: [
          "Because.",
          "They often stop when progress feels slow and they have no time to practise.",
          "People and skills and weeks.",
        ],
        answer: 1,
      },
      {
        id: "s1q5",
        prompt: "Should schools spend more time on practical skills? Which answer gives a reason?",
        options: [
          "Schools should keep academic subjects and also teach practical skills, because students need both.",
          "No comment.",
          "Practical.",
        ],
        answer: 0,
      },
    ],
  },
]

export const TEST_MODULES = [
  { id: "listening", label: "Listening", minutes: 12, parts: LISTENING_PARTS },
  { id: "reading", label: "Reading", minutes: 18, parts: READING_PARTS },
  { id: "writing", label: "Writing", minutes: 12, parts: WRITING_PARTS },
  { id: "speaking", label: "Speaking", minutes: 8, parts: SPEAKING_PARTS },
] as const

export type TestModuleId = (typeof TEST_MODULES)[number]["id"]

export function questionsIn(parts: readonly ChoicePart[]) {
  return parts.flatMap((part) => part.questions)
}
