<template>
  <q-page class="flex flex-center">
    <q-card bordered class="my-card">
      <div class="timer column items-center no-wrap">
        <q-card-section class="col">
          <div class="text-h6">Timer</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="col timer-select row q-gutter-xs">
          <q-btn color="primary" icon="add" size="sm" @click="min++" />
          <q-input
            v-model.number="min"
            type="number"
            outlined
            style="max-width: 200px"
          />
          <q-btn color="primary" icon="remove" size="sm" @click="min--" />
          <q-btn color="primary" icon="add" size="sm" @click="sec++" />
          <q-input
            v-model.number="sec"
            type="number"
            outlined
            style="max-width: 200px"
          />
          <q-btn color="primary" icon="remove" size="sm" @click="sec--" />
        </q-card-section>
        <q-card-section class="timer-display">
          <q-item class="text-h1 q-gutter-md">
            <q-item-section>{{ min }}</q-item-section>
            <q-item-section>:</q-item-section>
            <q-item-section>{{ sec }}</q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section class="q-gutter-xs">
          <q-btn color="primary" label="reset" @click="resetTimer" />
          <q-btn color="primary" label="start" @click="startTimer" />
        </q-card-section>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const min = ref(0);
    const sec = ref(0);
    const totalTime = ref(min.value + sec.value);

    var countdown;

    function timer(sec) {
      clearInterval(countdown);
      const now = Date.now();
      const then = now + sec * 1000;

      displayTimeLeft(sec);

      countdown = setInterval(() => {
        const secLeft = Math.round((then - Date.now()) / 1000);
        //display
        if (secLeft < 0) {
          clearInterval(countdown);
          return;
        }
        displayTimeLeft(secLeft);
      }, 1000);
    }

    function displayTimeLeft(sec) {
      const min = Math.floor(sec / 60);
      const remainderSec = sec % 60;
      const display = `${min} : ${remainderSec < 10 ? "0" : ""}${remainderSec}`;
      document.title = display;
      console.log(display);
    }

    function startTimer() {
      timer(5);
    }

    function resetTimer() {
      clearInterval(countdown);
    }
    return {
      min,
      sec,
      totalTime,
      countdown,
      timer,
      displayTimeLeft,
      startTimer,
      resetTimer,
    };
  },
};
</script>
