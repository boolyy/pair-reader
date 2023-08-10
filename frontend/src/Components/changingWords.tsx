import {
  Text,
  Flex,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
} from "@chakra-ui/react";
import { jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";

const stringToWordArray = (text: string): string[] => {
  return text.trim().split(" ");
};

const wordArray: string[] =
  stringToWordArray(`Hay Fever was a comical play with a strong message. The actors throughout this play steadily used others to gain their own attention. The message this play left behind after many laughs was do not use others, plain and simple.
The space was a well-constructed thrust stage however, the stage was not raised off the ground and the seats appeared to be mobile which lead to the belief that this is an Environmental Theater. As for the layout of the stage, there was a couch and a table in center stage for the first two acts, a door to the unseen outside front of the house upstage right, there were two large double doors upstage center leading to the backyard garden, and a raised floor upstage left containing a piano, a bookcase and a door leading to the home library. Stage left there was a half spiral staircase that lead up to the second floor which had a painting and lights that extended across to stage right. The second floor also contained the bedrooms for the house but the doors were not in sight. The detail was greater than expected: the hardwood floor throughout the first floor seemed to be genuine, the actual bookcase filled with real books not stage books, and the extremely large double doors with translucent glass and floral designs lead to the Garden, which featured an array of plants behind the doors. The entire space was well lit for the duration of the play; the stage took place inside the Bliss’ home so the bright lighting added a confortable feel to the inside of the house. The theatre was nearly sold out; it was hard to spot an empty seat, including the balcony and lower level seating. The crowd contained nearly an even amount of student audience members and senior citizens; there was few in the audience that appeared middle aged.
The play was well cast, the entire Bliss family did a great job showing how overly dramatic and deceitful the family had become. Each actor portrayed their character accurately; there were no standouts that didn’t match the character. Each visitor in the first act seemed to be feasible as far as the possibility of a relationship was concerned. All of the family members acted genuine. There was one actor who stood out as a perfect fit for his character. Taylor Rascher played Simon Bliss and played him perfectly. Rascher’s character Simon was a young man who was dramatic and romantic so much so it was almost to the point of ridiculousness. Rascher stole the show in the first act when he was romancing with Michelle Luz, who plays Myra Arundel. Rascher was displaying his love for Michelle Luz (Myra) in the most dramatic of fashions; he was playing the Bliss’ game of pretending to be in complete love with someone and then a moment later change his mind. Rascher was proclaiming his love with elegant speeches and coddling up next to her and eventually kissing her. Rascher made this scene particularly hilarious because he was completely over the top in typical Bliss fashion. Of course, all of this was for naught because Luz ended up kissing Joe Hubbard’s character David Bliss in act two and also Rascher proclaimed his engagement to Caitlin Stagemoller’s character, Jackie Coryton. Rascher made his voice more shrill and audible to appear to be more dramatic and create more attention for himself. In the same way, Rascher used grander gestures with his arms (flailing, waving, etc.) to cause a more dramatic effect.
The play was well interpreted by all whom were involved. Steven Wrentmore, the Director, kept the 1920’s feel by dressing in all 1920’s costumes and everyone spoke as if they were living at the time. Michelle Bisbee, the scene designer, made the inside of the home appear 1920’s because everything was grand. The Bliss’ home was grand with the spiral staircase, the very large backdoors, and the eloquent piano. The actors’ mannerisms seemed like they were portraying a silent film. In older movies, actors seemed very dramatic and had flamboyant actions to prove so; the actors in Hay Fever shared the same feel for the dramatics. As far as Stephen Wrentmore’s directing goes, he did an excellent job. The scene when Chris Karl (Richard) and Caitlin Stegemoller (Jackie) enter and are left alone to make small talk with each other is the best pertaining to directing. The two actors used the entire stage in this scene and were very awkward with one another. This was Wrentmore’s doing because you could tell he had a vision for this scene in particular because it seemed very crisp and well rehearsed. The actors played it perfect with the excessively long pauses in their awkward small talk that the crowd was laughing through the entire scene. It appeared that Wrentmore instructed the actors, to keep their pauses longer than natural to heighten the awkward tension in the scene, which made it brilliant.`);

export const ChangingWords = () => {
  const [wordsToRead, setWordsToRead] = useState("");
  const [wordNum, setWordNum] = useState(0);
  const [startPressed, setStartPressed] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(200);

  const onClickStartButton = () => {
    if (readingSpeed >= 1) {
      setStartPressed((startPressed) => !startPressed);
    }
  };

  const onClickResetButton = () => {
    setStartPressed(false);
    setWordNum(0);
  };

  const onChangeWPM = (value: any) => setReadingSpeed(value);
  useEffect(() => {
    let interval: any = null;
    if (startPressed && readingSpeed >= 1) {
      interval = setInterval(() => {
        setWordNum((wordNum) => wordNum + 1);
      }, 1000 / (readingSpeed / 60));
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [startPressed, readingSpeed]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      height="100vh"
    >
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Text fontSize="xl" mb={6}>
          {wordArray[wordNum]}
        </Text>
        <Textarea placeholder="Enter text to read" mb={3} />
        <Flex direction="row" mb={5}>
          <Button onClick={onClickStartButton} mr={3} width="max-content">
            {startPressed ? "Stop" : "Start"}
          </Button>
          <Button onClick={onClickResetButton} width="max-content">
            Reset
          </Button>
        </Flex>
        <NumberInput
          step={5}
          value={readingSpeed}
          min={1}
          onChange={onChangeWPM}
        >
          <NumberInputField placeholder={"WPM"} />
        </NumberInput>
      </Flex>
    </Flex>
  );
};
