<template>
  <q-drawer :width="200" :breakpoint="500" overlay bordered class="bg-grey-3">
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="item in projects" :key="item.title">
          <q-item clickable v-ripple :to="item.link">
            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { ref } from "vue";

export default {
  props: {
    projects: Array,
  },
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>
