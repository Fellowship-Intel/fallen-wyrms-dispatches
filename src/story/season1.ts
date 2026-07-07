import type { Story } from "../types";

// Season One: "The Night the Light Went Out."
// Five viewpoints on the same hour, framed by the Chronicler. Player-safe canon.
export const season1: Story = {
  title: "Dispatches, Season One: The Night the Light Went Out",
  start: "prologue",
  nodes: {
    prologue: {
      id: "prologue",
      chapter: "Prologue",
      speaker: "The Chronicler",
      text:
        "I am the one who remembers. I take no side in what follows. I only set it down.\n\n" +
        "On the night I record here, a watch-light in the far sky and the Everflame below went out together, in the same dark hour, for the first time since the world was broken. I was not in the temple, nor on the marches, nor in the valley. My owls brought me the rest. Begin where the light did.",
      choices: [{ label: "Begin at the temple", to: "keeper1" }]
    },

    keeper1: {
      id: "keeper1",
      chapter: "The Keeper",
      text:
        "The keeper of the Everflame has given the flame sixty years, and never once seen it falter. Tonight the temple is cold, in a place that has not been cold in living memory, and the flame is drawn down to the size of a child's fingertip, burning a thin and failing blue.\n\n" +
        "She is on her knees at the bowl before she remembers rising from her cot.",
      choices: [
        { label: "Feed it the feast-day oil", to: "keeper2a", set: { keeper_tried: "oil" } },
        { label: "Cup your hands and give it your breath", to: "keeper2b", set: { keeper_tried: "breath" } }
      ]
    },
    keeper2a: {
      id: "keeper2a",
      text:
        "She feeds it the sweet oil kept for feast-days. The flame drinks the oil and does not rise. It draws down to a bead, and the bead to a point, and the point to nothing at all.\n\n" +
        "Where it burned there is a thin curl of smoke, and then not even that.",
      choices: [{ label: "Look up through the temple's stone eye", to: "keeper3" }]
    },
    keeper2b: {
      id: "keeper2b",
      text:
        "She cups her hands around it and gives it her breath, slow and even, the way you breathe for someone who has forgotten how. It takes her breath and does not rise. It draws down to a bead, and the bead to a point, and then to nothing.\n\n" +
        "Only a curl of smoke remains, and then not even that.",
      choices: [{ label: "Look up through the temple's stone eye", to: "keeper3" }]
    },
    keeper3: {
      id: "keeper3",
      speaker: "The Chronicler",
      text:
        "Through the high stone eye cut so the flame could always answer the sky, she sees the far dark, and understands, whole and unasked for, that one of the watch-lights is gone. There had been seven. She does not need to count to know there are six.\n\n" +
        "Then the bells begin, because others have looked up too. Far to the north, another was already awake.",
      choices: [{ label: "Go north, to the failing marches", to: "corvane1" }]
    },

    corvane1: {
      id: "corvane1",
      chapter: "The Ranger",
      text:
        "A man named Corvane stands over a thing that should not exist: a ring of blackened stones, a rite half-worked and then abandoned in a hurry, a full week's ride south of where the blight has any business reaching.\n\n" +
        "It is the not-caring that frightens him. This dark did not leak. It was placed.",
      choices: [
        { label: "Search the ring for who left it", to: "corvane2a", set: { corvane: "hunt" } },
        { label: "Ride to warn the nearest holdfast", to: "corvane2b", set: { corvane: "warn" } }
      ]
    },
    corvane2a: {
      id: "corvane2a",
      text:
        "He works the ground the way he reads weather. Bootprints, cold and deliberate. Whoever carried the dark south went unhurried, past every ward and every watch, and set it down here like a seed. Then the cold in the ground deepens, all at once, everywhere, as though something long patient and very far away has finally been given leave.",
      choices: [{ label: "Look up. The far sky is wrong.", to: "corvane3" }]
    },
    corvane2b: {
      id: "corvane2b",
      text:
        "He turns his horse for the holdfast, rehearsing the words that no one there will believe, the same words that earned him a year of being called a fatalist. Then the cold in the ground deepens, all at once, everywhere, as though something long patient and very far away has finally been given leave.",
      choices: [{ label: "Look up. The far sky is wrong.", to: "corvane3" }]
    },
    corvane3: {
      id: "corvane3",
      speaker: "The Chronicler",
      text:
        "He could not have said how the sky was wrong, only that it was, the way you know a familiar room has had one thing moved in it in the dark. He had spent a year trying to make the soft south believe the dark was rising, and being guided. Kneeling there, he understood the argument was over. Not because anyone believed him, but because there was no longer time left in which to be doubted.\n\n" +
        "In a small green valley that had never mattered to anyone, something smaller still woke with its heart going like a trapped bird.",
      choices: [{ label: "Go to the valley", to: "wick1" }]
    },

    wick1: {
      id: "wick1",
      chapter: "The Brownie",
      text:
        "A hearth-brownie named Wick sits up in its hollow. The sprites of the near wood have gone quiet. All of them. At once. Wick has lived here longer than the family it keeps, longer than the house, longer than the oldest tree it can see, and it has never known the wood so still.\n\n" +
        "It puts a small hard hand to its own chest, where the light lives, and feels it flicker.",
      choices: [
        { label: "Hold the light steady, however you can", to: "wick2a", set: { wick: "hold" } },
        { label: "Go and wake the family", to: "wick2b", set: { wick: "wake" } }
      ]
    },
    wick2a: {
      id: "wick2a",
      text:
        "It cups the ember that is not a thing it has but a thing it is, and wills it to steady. It will not. It gutters the way a candle will not steady in a draft you cannot find the source of. Wick does not know the word for what it feels, because in all its long small life it has never needed the word.\n\n" +
        "The word is afraid.",
      choices: [{ label: "Keep the vigil until dawn", to: "wick3" }]
    },
    wick2b: {
      id: "wick2b",
      text:
        "It will not be seen, and it will not be thanked, but it goes to the sleeping house all the same and rattles the latch, sours the milk, does the small loud things it knows, so that someone will wake and not be alone in it. No one stirs. Wick returns to its hollow and its guttering light.\n\n" +
        "It does not know the word for what it feels. The word is afraid.",
      choices: [{ label: "Keep the vigil until dawn", to: "wick3" }]
    },
    wick3: {
      id: "wick3",
      speaker: "The Chronicler",
      text:
        "The smallest light in the world kept its watch through the smallest hours, and did not go out. Not yet. That, too, I set down, because a thing unwitnessed is a thing half lost, and I am the one who will not lose the memory of anything.",
      choices: [{ label: "Turn to the heartlands", to: "alaster1" }]
    },

    alaster1: {
      id: "alaster1",
      chapter: "The Highborn",
      text:
        "In the crowded heartlands, in a great house in quiet decline, a young man named Alaster stands at a high window and watches the far sky lose one of its lights. He does not feel afraid. He feels a calculation arrive, cold and clean: the age is turning, and it is turning toward the dark.\n\n" +
        "A servant of the rising power came to him a month ago with an offer. Tonight the offer looks like the only sensible bet in a dying world.",
      choices: [
        { label: "Weigh what the cult is truly offering", to: "alaster2a", set: { alaster: "ambition" } },
        { label: "Think of the brother who was born first", to: "alaster2b", set: { alaster: "grievance" } }
      ]
    },
    alaster2a: {
      id: "alaster2a",
      text:
        "They offer the two things his privileged life never gave him: real belonging, and a share in the one power still growing while the light dies. He tells himself he is not a believer, only a realist.\n\n" +
        "That is the first lie the dark lets a man tell himself, and it is always his own.",
      choices: [{ label: "Reach for the pen", to: "alaster3" }]
    },
    alaster2b: {
      id: "alaster2b",
      text:
        "He has always been close to power and never first: a spare heir, an overlooked son, a house sliding quietly down. The old ambition has curdled into something patient and hungry.\n\n" +
        "The cult does not ask him to be good. It asks him to be willing, and he is.",
      choices: [{ label: "Reach for the pen", to: "alaster3" }]
    },
    alaster3: {
      id: "alaster3",
      speaker: "The Chronicler",
      text:
        "He did not kneel that night. He wrote a letter, sealed it, and sent it south, and in the writing of it stepped over a line he would not be able to find again. I set it down without judgment, as I set down everything.\n\n" +
        "He believed he was choosing the winning side. He did not know, and would not learn for a long time, what waits at the end of the road he had chosen.\n\n" +
        "Far west, on an isle the mainland has half forgotten, another who has lived too long to be surprised felt the same hour turn.",
      choices: [{ label: "Go west, to the Lonely Isle", to: "aelinor1" }]
    },

    aelinor1: {
      id: "aelinor1",
      chapter: "The Deathless",
      text:
        "Aelinor of the Lonely Isle stands at the cliff's edge where the sea meets old stone. She is ancient in years and looks thirty, deathless unless slain, keeper of the longest memory any mortal-blooded folk still carry. The isle has kept out of the world's wars for an age. Tonight the sea is wrong, and one of the seven watch-lights in the far sky has gone out.\n\n" +
        "She has seen kingdoms fall from this height and felt nothing she was not prepared to feel. This is different. The dark did not arrive. It was counted, and one light was taken.",
      choices: [
        { label: "Watch from the tower, as you always have", to: "aelinor2a", set: { aelinor: "watch" } },
        { label: "Go down to the shore where the water turned", to: "aelinor2b", set: { aelinor: "act" } }
      ]
    },
    aelinor2a: {
      id: "aelinor2a",
      text:
        "She returns to the high room where she keeps what the mainland forgot. Maps, names, treaties no one living remembers signing. She reads nothing new in them. The loss is not in books. It is in the sky, and in the cold tide climbing the rocks below as though the sea itself has been given permission.\n\n" +
        "For the first time in longer than she will admit, she considers leaving the island.",
      choices: [{ label: "Wait for what the night sends next", to: "aelinor3" }]
    },
    aelinor2b: {
      id: "aelinor2b",
      text:
        "She goes down the old path to the shore. The water has turned the colour of iron under a moon that gives no comfort. Something mainland-born rides the current: ash, char, the taste of a temple fire gone out far away.\n\n" +
        "Ruin from the continent has reached even here. The isle is not outside the world's turning. It never was.",
      choices: [{ label: "Stand in the cold until you understand", to: "aelinor3" }]
    },
    aelinor3: {
      id: "aelinor3",
      speaker: "The Chronicler",
      text:
        "She did not leave the Lonely Isle that night. She is not ready, and readiness, in her long experience, is a luxury the dark does not grant. But she closed the door she had kept open on the world for a century, and she did not reopen it when the hour passed.\n\n" +
        "That, too, is a kind of choice. I record it because the smallest refusals matter when the light is failing.",
      choices: [{ label: "Close the record", to: "epilogue" }]
    },

    epilogue: {
      id: "epilogue",
      chapter: "The Record",
      speaker: "The Chronicler",
      text:
        "Five lives, and a hundred more I have not named, woke in the same dark hour to the same failing light, none of them yet knowing that their separate nights are one night, and that it has a name.\n\n" +
        "The light below and the light above went out together, and they were the same darkness, and it was theirs to have witnessed. Here the record opens.",
      choices: [{ label: "What was that light?", to: "end_cta" }]
    },
    end_cta: {
      id: "end_cta",
      speaker: "The Chronicler",
      text:
        "I will tell you plainly what almost no one living knew. The lights were never a promise. They are only lights.\n\n" +
        "The rest of the account is still being written. If you would rather remember than be comforted, stay on the record, and read where it began.",
      end: true,
      cta: true
    }
  }
};
