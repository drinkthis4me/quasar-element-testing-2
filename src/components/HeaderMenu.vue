<template>
  <div v-for="item in target" :key="item.id">
    <div v-if="item && item.children && item.children.length > 0">
      <q-btn
        :label="item.title"
        :icon="item.icon"
        :icon-right="item.showCard ? 'expand_less' : 'expand_more'"
        @mouseover="(item.dialog = true), (item.showCard = true)"
        @mouseleave="
          item.showCard ? (item.dialog = true) : (item.dialog = false)
        "
        stretch
        flat
      />
      <q-dialog
        v-model="item.dialog"
        position="top"
        seamless
        transition-show="jump-down"
        transition-hide="jump-up"
      >
        <q-card
          class="card-style"
          @mouseleave="(item.dialog = false), (item.showCard = false)"
        >
          <q-card-section class="row items-center no-wrap">
            <div v-for="child in item.children" :key="child.id">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" :name="child.icon" />
                </q-item-section>
                <q-item-section>{{ child.title }}</q-item-section>
              </q-item>
            </div>
            <q-space />
            <q-btn flat round icon="close" v-close-popup />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div v-else>
      <q-btn
        :to="item.link"
        :label="item.title"
        :icon="item.icon"
        stretch
        flat
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { cloneDeep } from "lodash";

export default {
  props: {
    list: {
      type: Array,
    },
  },
  setup(props) {
    const target = ref([]);
    target.value = cloneDeep(props.list);

    return {
      target,
    };
  },
};
</script>

<style lang="scss">
.card-style {
  position: absolute;
  top: 50px;
  width: 100% !important;
  max-width: 100% !important;
}
</style>
