import { Audio } from "expo-av";

let correctSound: Audio.Sound | null = null;
let incorrectSound: Audio.Sound | null = null;
let completeSound: Audio.Sound | null = null;

export async function loadSounds() {
  try {
    // Load correct answer sound (using a pleasant tone)
    const { sound: correct } = await Audio.Sound.createAsync(
      {
        uri: "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3",
      },
      { shouldPlay: false }
    );
    correctSound = correct;

    // Load incorrect answer sound (using a gentle error tone)
    const { sound: incorrect } = await Audio.Sound.createAsync(
      {
        uri: "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3",
      },
      { shouldPlay: false }
    );
    incorrectSound = incorrect;

    // Load lesson complete sound (celebration)
    const { sound: complete } = await Audio.Sound.createAsync(
      {
        uri: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",
      },
      { shouldPlay: false }
    );
    completeSound = complete;
  } catch (error) {
    console.log("Error loading sounds:", error);
  }
}

export async function playCorrectSound() {
  try {
    if (correctSound) {
      await correctSound.replayAsync();
    }
  } catch (error) {
    console.log("Error playing correct sound:", error);
  }
}

export async function playIncorrectSound() {
  try {
    if (incorrectSound) {
      await incorrectSound.replayAsync();
    }
  } catch (error) {
    console.log("Error playing incorrect sound:", error);
  }
}

export async function playCompleteSound() {
  try {
    if (completeSound) {
      await completeSound.replayAsync();
    }
  } catch (error) {
    console.log("Error playing complete sound:", error);
  }
}

export async function unloadSounds() {
  try {
    if (correctSound) {
      await correctSound.unloadAsync();
    }
    if (incorrectSound) {
      await incorrectSound.unloadAsync();
    }
    if (completeSound) {
      await completeSound.unloadAsync();
    }
  } catch (error) {
    console.log("Error unloading sounds:", error);
  }
}
