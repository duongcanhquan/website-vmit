export type GapQuestion = { id: string; prompt: string; accept: string[] }
export type ChoiceQuestion = { id: string; prompt: string; options: string[]; answer: number }
export type TfngQuestion = { id: string; statement: string; answer: "TRUE" | "FALSE" | "NOT GIVEN" }

export const LISTENING_PARTS = [
  {
    id: "l1",
    title: "Part 1 — A conversation",
    instruction: "You will hear a student booking a room. Play the recording, then answer the questions. You may play it twice.",
    script: `Officer: Good morning, Riverside College accommodation office. How can I help?
Student: Hello. My name is Minh Tran. I need a room for the September intake.
Officer: We can offer a shared flat on Baker Street, room 14, or a studio on Harper Lane.
Student: I'll take the shared flat. What deposit do I need to pay?
Officer: The deposit is two hundred and fifty pounds, and it must arrive by the 12th of August. Check-in starts at 2 pm.
Student: Is there anywhere to leave a bicycle?
Officer: Yes. The lock-up is behind the building. The door code is 4816.`,
    questions: [
      { id: "l1q1", prompt: "Student's family name", accept: ["tran"] },
      { id: "l1q2", prompt: "Room number", accept: ["14", "room14"] },
      { id: "l1q3", prompt: "Deposit (£)", accept: ["250", "250pounds"] },
      { id: "l1q4", prompt: "Deposit deadline", accept: ["12august", "august12", "12ofaugust", "12thaugust"] },
      { id: "l1q5", prompt: "Bicycle lock-up code", accept: ["4816"] },
    ] satisfies GapQuestion[],
  },
  {
    id: "l2",
    title: "Part 2 — A short talk",
    instruction: "You will hear a tutor introduce a city tree project. Choose the correct letter, A, B or C.",
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
    ] satisfies ChoiceQuestion[],
  },
] as const

export const READING = {
  passageOne: {
    title: "Passage 1 — The night-market effect",
    text: `City governments used to treat night markets as a nuisance: blocked pavements, late noise, and food waste. A decade of research in East and Southeast Asian cities has made that view harder to defend. When a market is given a fixed site, lighting, and a closing time, the surrounding streets often become safer after dark, because there are more people and more stallholders watching the road.

The economic effect is uneven. Cooked-food stalls raise footfall for nearby cafés that stay open, but clothing stalls can pull customers away from small shops that sell the same goods in the daytime. Researchers in Taipei found that shops within fifty metres of a cooked-food row increased evening sales, while shops beside clothing rows did not. The city did not publish figures for shops more than two streets away.

What does travel clearly is rent. Once a market becomes famous, landlords raise the price of the nearest storefronts, and the first stallholders — often families who started with a folding table — are replaced by businesses that can pay more. Night markets, in other words, can create a lively street and, at the same time, push out the people who made it lively.`,
    questions: [
      { id: "r1q1", statement: "Officials once regarded night markets as a problem.", answer: "TRUE" },
      { id: "r1q2", statement: "A fixed site and a closing time can make nearby streets safer at night.", answer: "TRUE" },
      { id: "r1q3", statement: "Clothing stalls usually increase sales for nearby daytime shops.", answer: "FALSE" },
      { id: "r1q4", statement: "Taipei published sales data for shops more than two streets from the market.", answer: "FALSE" },
      { id: "r1q5", statement: "The first stallholders are always able to pay the higher rents.", answer: "FALSE" },
    ] satisfies TfngQuestion[],
  },
  passageTwo: {
    title: "Passage 2 — How a reef keeps score",
    text: `A coral reef is not only a habitat. It is a record. Each year a healthy coral lays down a thin band of limestone, and the thickness of that band shows how kind or how harsh the year was. Marine scientists drill a pencil-wide core, a little like reading the rings of a tree, and then match the bands to sea-temperature logs.

The method has a limit. If the water stays too warm for several weeks, the coral expels the algae that feed it and the band for that year may be missing. A gap, therefore, can mean either that the coral stopped growing or that the core was damaged while it was being removed. Laboratories now photograph the core under ultraviolet light before they cut it, so a crack made by the drill is not mistaken for a year of heat.

Reef cores are also changing decisions on land. In one Pacific district, the cores showed that sediment from a new hillside road was smothering the reef more than the warmer water was. The council paused the second stage of the road and planted the slope. The reef did not recover in a single season, but the following year's band was measurable again. The scientists are careful about one claim they cannot make: a single core cannot date a storm to a particular week.`,
    choices: [
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
    ] satisfies ChoiceQuestion[],
    gaps: [
      {
        id: "r2q4",
        prompt: "Scientists compare the bands with logs of sea ________.",
        accept: ["temperature", "temperatures"],
      },
      {
        id: "r2q5",
        prompt: "A core cannot time a storm to a particular ________.",
        accept: ["week"],
      },
    ] satisfies GapQuestion[],
  },
} as const

export const WRITING = {
  task1: {
    title: "Writing Task 1",
    minutes: 20,
    prompt:
      "The table shows the number of international students at a college in 2022 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    table: [
      ["Country", "2022", "2024"],
      ["Vietnam", "180", "260"],
      ["Korea", "140", "135"],
      ["Japan", "90", "150"],
      ["Indonesia", "40", "95"],
    ],
  },
  task2: {
    title: "Writing Task 2",
    minutes: 25,
    prompt:
      "Some people think universities should admit students only on examination results. Others believe interviews and portfolios should also be used. Discuss both views and give your own opinion. Write at least 250 words.",
  },
} as const

export const SPEAKING = [
  {
    id: "s1",
    title: "Part 1 — Interview",
    minutes: 4,
    prompt:
      "Answer in full sentences, as you would speak.\n\n1. Where do you live now?\n2. What are you studying, or what would you like to study?\n3. Do you prefer mornings or evenings? Why?\n4. How often do you use English outside class?",
  },
  {
    id: "s2",
    title: "Part 2 — Long turn",
    minutes: 3,
    prompt:
      "Describe a skill you taught yourself. You should say:\n• what the skill was\n• how you learned it\n• how long it took\nand explain why it has been useful to you.\n\nWrite the answer you would give in about two minutes.",
  },
  {
    id: "s3",
    title: "Part 3 — Discussion",
    minutes: 4,
    prompt:
      "Answer both questions in developed sentences.\n\n1. Why do some people give up a new skill after only a few weeks?\n2. Should schools spend more time on practical skills, or on academic subjects?",
  },
] as const

export const MODULES = [
  { id: "listening", label: "Listening", minutes: 12, questions: 10 },
  { id: "reading", label: "Reading", minutes: 18, questions: 10 },
  { id: "writing", label: "Writing", minutes: 40, questions: 2 },
  { id: "speaking", label: "Speaking", minutes: 11, questions: 3 },
] as const
