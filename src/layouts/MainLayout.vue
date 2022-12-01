<template>
  <q-layout view="hhh lpR fff">
    <q-header elevated>
      <q-toolbar class="bg-cyan text-white">
        <q-btn
          flat
          @click="drawerLeft = !drawerLeft"
          round
          dense
          icon="menu"
          class="lt-md"
        />

        <q-btn
          to="/"
          flat
          strech
          dense
          icon="home"
          label="Home"
          class="q-mr-sm"
        />
        <q-tabs class="gt-sm">
          <q-route-tab
            v-for="project in projects"
            :key="project.label"
            :to="project.link"
            :label="project.label"
            exact
          />
        </q-tabs>

        <q-space />
        <span class="gt-lg">
          <HeaderMenu :list="newLinkList" />
        </span>
      </q-toolbar>
    </q-header>

    <LeftDrawer :projects="projects" v-model="drawerLeft" />

    <q-page-container>
      <router-view />
    </q-page-container>
    <LayoutFooter />
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import HeaderMenu from "src/components/HeaderMenu.vue";
import LayoutFooter from "src/components/LayoutFooter.vue";
import LeftDrawer from "src/components/LeftDrawer.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    HeaderMenu,
    LayoutFooter,
    LeftDrawer,
  },

  setup() {
    // Array for topright button
    const linkList = [
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
        icon: "trolley",
        children: [
          {
            id: 21,
            title: "item 21",
            link: "#",
            icon: "trolley",
            children: [],
          },
        ],
      },
      {
        id: 3,
        title: "item 3",
        link: "#",
        icon: "mdi-arm-flex",
        children: [],
      },
      {
        id: 4,
        title: "item 4",
        link: "#",
        icon: "mdi-baby-buggy",
        children: [],
      },
    ];
    const newLinkList = linkList.map((object) => ({
      ...object,
      dialog: false,
      showCard: false,
    }));

    const projects = [
      {
        link: "/gallery",
        label: "Gallery",
        value: "gallery",
      },
      { link: "/table", label: "Table", value: "table" },
      {
        link: "/comment",
        label: "Comment",
        value: "comment",
      },
      {
        link: "/dessert",
        label: "Dessert",
        value: "dessert",
      },
      { link: "/timer", label: "Timer", value: "timer" },
    ];

    const drawerLeft = ref(false);

    return {
      linkList,
      newLinkList,
      projects,
      drawerLeft,
    };
  },
});
</script>
