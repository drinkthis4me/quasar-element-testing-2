<template>
  <q-page class="flex flex-center">
    <q-card bordered class="my-card">
      <div class="timer column items-center no-wrap">
        <q-card-section class="col">
          <div class="text-h6">Timer</div>
        </q-card-section>

        <q-separator />

        <!-- <q-card-section class="col timer-select row q-gutter-xs">
          <q-btn color="primary" icon="add" size="sm" />
          <q-input type="number" outlined style="max-width: 200px" />
          <q-btn color="primary" icon="remove" size="sm" />
          <q-btn
            color="primary"
            icon="add"
            size="sm"
            @click="displaySeconds++"
          />
          <q-input
            v-model.number="displaySeconds"
            type="number"
            outlined
            style="max-width: 200px"
          />
          <q-btn
            color="primary"
            icon="remove"
            size="sm"
            @click="displaySeconds--"
          />
        </q-card-section> -->
        <q-card-section class="timer-display">
          <q-item class="text-h4 q-gutter-md">
            {{ displayDays }}
            :
            {{ displayHours }}
            :
            {{ displayMinutes }}
            :
            {{ displaySeconds }}
          </q-item>
        </q-card-section>
        <q-card-section class="q-gutter-xs">
          <q-btn color="primary" label="start" @click="startTimer" />
          <q-btn color="primary" label="pause" />
          <q-btn color="primary" label="reset" />
        </q-card-section>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const _seconds = computed(() => 1000);
    const _minutes = computed(() => _seconds.value * 60);
    const _hours = computed(() => _minutes.value * 60);
    const _days = computed(() => _hours.value * 24);

    const displaySeconds = ref(0);
    const displayMinutes = ref(0);
    const displayHours = ref(0);
    const displayDays = ref(0);

    // var countdown;

    // function startTimer() {
    //   clearInterval(countdown);

    //   countdown = setInterval(() => {
    //     if (seconds.value > 0) {
    //       //decrease seconds
    //       seconds.value--;
    //     } else {
    //       //stop timer
    //       clearInterval(countdown);
    //       console.log(countdown);
    //     }
    //   }, 1000);
    // }

    // function resetTimer() {
    //   clearInterval(countdown);
    //   displayTimeLeft(5);
    // }

    function startTimer() {
      const timer = setInterval(() => {
        const now = new Date();
        const end = new Date(2022, 10, 6, 12, 12, 12);
        const distance = end.getTime() - now.getTime();

        if (distance < 0) {
          clearInterval(timer);
        }

        const days = Math.floor(distance / _days.value);
        const hours = Math.floor((distance % _days.value) / _hours.value);
        const minutes = Math.floor((distance % _hours.value) / _minutes.value);
        const seconds = Math.floor(
          (distance % _minutes.value) / _seconds.value
        );

        displaySeconds.value = seconds < 10 ? `0${seconds}` : seconds;
        displayMinutes.value = minutes < 10 ? `0${minutes}` : minutes;
        displayHours.value = hours < 10 ? `0${hours}` : hours;
        displayDays.value = days < 10 ? `0${days}` : days;
      }, 1000);
    }

    return {
      displaySeconds,
      displayMinutes,
      displayHours,
      displayDays,

      startTimer,
    };
  },
};
</script>
