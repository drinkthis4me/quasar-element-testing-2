<template>
  <q-page class="flex flex-center">
    <div class="text-h4 text-center">Countdown</div>
    <span id="timer">00:10</span>
    <q-btn label="start" @click="startTimer(10)" />
  </q-page>
</template>

<script>
export default {
  setup() {
    function startTimer(duration) {
      var min, sec;
      var timer = setInterval(() => {
        min = parseInt(duration / 60, 10);
        sec = parseInt(duration % 60, 10);

        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        document.querySelector("#timer").textContent = `${min} : ${sec}`;

        if (--duration < 0) {
          clearInterval(timer);
          document.querySelector("#timer").textContent = `Finished`;
        }else {
          document.querySelector("#timer").textContent = `${min} : ${sec}`;
        }
        
      }, 1000);
    }

    return { startTimer };
  },
};
</script>
