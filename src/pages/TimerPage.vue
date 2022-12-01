<template>
  <q-page class="row flex-center">
    <div class="q-pa-md" style="max-width: 90vw">
      <q-card style="width: 80vw">
        <q-card-section class="bg-orange text-white">
          <div class="text-h6 text-center">Start your workout plan</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list
            class="fit column inline justify-center content-center items-center"
          >
            <q-item>
              <q-item-section clickable @click="prompt = true">
                <div class="text-h6">
                  Timer: {{ userInputMin }} :
                  {{ userInputSec.toString().padStart(2, "0") }}
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section clickable @click="prompt = true">
                <div class="text-h6">Repeat: {{ userInputRepeat }}</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-h6">
                <q-toggle :label="`Repeat: ${isRepeat}`" v-model="isRepeat" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section class="text-h4 text-center">
          {{ message }}
        </q-card-section>
        <q-card-section class="text-h4 text-center">
          {{ displayMinutes }} :
          {{ displaySeconds.toString().padStart(2, "0") }}
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            label="START"
            flat
            color="primary"
            @click="start"
            :disable="isActive"
          />
          <q-btn
            v-if="!isPause"
            label="pause"
            flat
            color="primary"
            @click="pause"
            :disable="!isActive"
          />
          <q-btn v-else label="resume" flat color="primary" @click="pause" />
          <q-btn label="reset" flat color="primary" @click="reset" />
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Configuration</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="Minute"
            v-model.number="userInputMin"
            type="number"
            autofocus
            @keyup.enter="prompt = false"
            :rules="[
              (val) => val >= 0 || 'Please set timer greater than 0 minute.',
            ]"
            min="0"
          />
          <q-input
            dense
            label="Second"
            v-model.number="userInputSec"
            type="number"
            @keyup.enter="prompt = false"
            :rules="[
              (val) =>
                (val > 0 && val < 59) || 'Please set second between 1 and 59.',
            ]"
            min="1"
            max="59"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="Repeat"
            v-model.number="userInputRepeat"
            type="number"
            @keyup.enter="prompt = false"
            :rules="[
              (val) => val > 0 || 'Please set repeat greater than 1 time.',
            ]"
            min="1"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="text-white bg-primary"
            label="set timer"
            v-close-popup
            @click="
              () => {
                duration = userInputTotal;
                repeat = userInputRepeat;
              }
            "
            :disable="repeat < 0 || userInputMin < 0 || userInputSec < 0"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    repeat: {{ repeat }}
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";

export default defineComponent({
  name: "TimerPage",

  setup() {
    var timer;
    const userInputMin = ref(4);
    const userInputSec = ref(20);
    const userInputTotal = computed(
      () => userInputMin.value * 60 + userInputSec.value
    );
    const userInputRepeat = ref(1);

    const displayMinutes = ref(0);
    const displaySeconds = ref(0);
    const duration = ref(0);

    const isActive = ref(false);
    const isPause = ref(false);
    const isRepeat = ref(false);
    const repeat = ref(0);
    const message = ref("Click above to edit");

    const prompt = ref(false);

    /*
    To start timer:
    SetInterval to timer.
    Decrease duration if timer isActive and if duration > 1. 
    (first interval won't decrease the duration. The real time elapsed is duration + 1.)
    Call updateDisplay to display countdown.

    To stop timer:
    ClearInterval to timer.
    Call reset to clean up.
    Show a stopped message to user.
    */

    function startTimer() {
      timer = setInterval(() => {
        if (duration.value > 1 && isActive.value) {
          duration.value--;
          updateDisplay(duration.value);
          console.log(duration.value);
        } else {
          clearInterval(timer);
          reset();
        }
      }, 1000);
    }

    /*
    If duration is 65...
    displaySeconds should be 5(or 65 % 5).
    displayMinutes should be 1(or 65 / 60).
     */
    function updateDisplay(time) {
      const seconds = computed(() => Math.floor(time % 60));
      const minutes = computed(() => Math.floor(time / 60));
      displaySeconds.value = seconds.value;
      displayMinutes.value = minutes.value;
    }

    /*
    Button action for starting.
    isActive = true >>> for looping purpose.(See watch(isActive,...))
    User input should remain unchanged while timer start/pause/finish.
    So store userInputTotal and assign it to duration.
    */
    function start() {
      isActive.value = true;
      duration.value = userInputTotal.value;
      startTimer();
      message.value = "Countdown...";
    }

    /*
    In the template, there are two button: pause/resume.
    The 'isPause: boolean' alternates the buttons' visibility 
    */
    function pause() {
      isPause.value = !isPause.value;
      if (isPause.value) {
        clearInterval(timer);
        message.value = "Coundown paused";
        console.log(">>>Timer paused.");
      } else {
        startTimer();
        message.value = "Countdown...";
        console.log(">>>Timer continued.");
      }
    }

    /*
    To do a reset and clean up:
    Set isActive to false for looping.
    Set isPause to false to show pause button.
    reset duration to userInputTotal so that user can press start and restart the same timer.
    */
    function reset() {
      isActive.value = false;
      isPause.value = false;

      duration.value = userInputTotal.value;
      updateDisplay(duration.value);

      message.value = "Finished!";
    }

    /*
    At the end of the timer, when isActive = false, detect if looping is needed.
    If true: decrease repeat value and call start().
    Else: turn off isRepeat toggle button.    
    */
    watch(isActive, () => {
      if (!isActive.value) {
        if (isRepeat.value && repeat.value > 1) {
          repeat.value--;
          start();
          console.log(`>>>Loop start. Remain loop: ${repeat.value}.`);
        } else {
          isRepeat.value = false;
          console.log(">>>Loop end.");
        }
      }
      return;
    });

    return {
      displayMinutes,
      displaySeconds,
      duration,
      userInputMin,
      userInputSec,
      userInputTotal,
      userInputRepeat,
      isActive,
      isPause,
      isRepeat,
      repeat,
      message,
      prompt,

      startTimer,
      updateDisplay,
      start,
      pause,
      reset,
    };
  },
});
</script>
