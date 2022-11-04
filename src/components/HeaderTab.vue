<template>
  <q-tabs v-model="tab" @click="show = !show" align="left">
    <div v-for="item in links" :key="item.id">
      <!--  item with child: button show side menu -->
      <div v-if="item && item.children && item.children.length > 0">
        <q-tab :name="item.title" :icon="item.icon" :label="item.title" row />

        <Transition
          name="custom-classes"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div v-if="show">
            <q-card class="bg-primary" flat strech>
              <q-list @mouseleave="show = !show" bordered>
                <q-item v-ripple name="mails">
                  <div class="column">
                    <div
                      class="col"
                      v-for="child in item.children"
                      :key="child.id"
                    >
                      <q-chip size="lg" clickable>
                        <q-avatar rounded>
                          <img
                            src="https://cdn.quasar.dev/img/boy-avatar.png"
                          />
                        </q-avatar>
                        {{ child.title }}
                      </q-chip>
                    </div>
                  </div>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </Transition>
      </div>

      <!-- no child item: regular tab -->
      <div v-else>
        <q-tab :name="item.title" :icon="item.icon" :label="item.title" />
      </div>
    </div>
  </q-tabs>

</template>

<script setup>
import { ref } from "vue";



const tab = ref("");
const show = ref(false);



const links = ref([
  {
    id: 1,
    title: "item 1",
    link: "#",
    icon: "factory",
    children: [
      {
        id: 11,
        title: "item 11",
        link: "#",
        icon: "factory",
        children: [
          {
            id: 111,
            title: "item 111",
            icon: "factory",
            link: "#",
            children: [],
          },
          {
            id: 112,
            title: "item 112",
            icon: "factory",
            link: "#",
            children: [],
          },
        ],
      },
      {
        id: 12,
        title: "item 12",
        icon: "factory",
        link: "#",
        children: [
          {
            id: 121,
            title: "item 121",
            icon: "factory",
            link: "#",
            children: [],
          },
          {
            id: 122,
            title: "item 122",
            icon: "factory",
            link: "#",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "item 2",
    link: "#",
    icon: "query_stats",
    children: [
      {
        id: 21,
        title: "item 21",
        link: "#",
        icon: "query_stats",
        children: [],
      },
    ],
  },
  {
    id: 3,
    title: "item 3",
    link: "#",
    icon: "settings",
    children: [],
  },
  {
    id: 4,
    title: "item 4",
    link: "#",
    icon: "star",
    children: [],
  },
]);
</script>

<style>
/* @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"; */
</style>
