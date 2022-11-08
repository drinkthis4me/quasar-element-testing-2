<template>
  <q-layout view="hhh lpR fff">
    <q-header elevated>
      <q-toolbar>
        {{ windowWidth }}
        <span v-if="windowWidth < 1170" class="row">
          <q-btn
            flat
            @click="drawerLeft = !drawerLeft"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title shrink> Quasar App </q-toolbar-title>

          <q-btn to="/" flat round dense icon="home" class="q-mr-sm" />
        </span>
        <span v-else class="row">
          <q-toolbar-title shrink> Quasar App </q-toolbar-title>
          <q-btn to="/" flat round dense icon="home" class="q-mr-sm" />
          <q-btn
            v-for="project in projects"
            :key="project.label"
            :to="project.link"
            :label="project.label"
            flat
            stretch
          />
        </span>
        <q-space />
        <HeaderMenu v-if="windowWidth>800" :list="newLinkList" />
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
import { defineComponent, ref, watch, onMounted, onUnmounted } from "vue";
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

    // resizing window to make sidedrawer appear
    const windowWidth = ref(0);

    function updateResize() {
      windowWidth.value = window.innerWidth;
    }

    onMounted(
      updateResize,
      window.addEventListener("resize", () => {
        windowWidth.value = window.innerWidth;
      })
    );

    onUnmounted(
      window.removeEventListener("resize", () => {
        windowWidth.value = window.innerWidth;
      })
    );

    return {
      linkList,
      newLinkList,
      projects: [
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
      ],
      drawerLeft: ref(false),
      windowWidth,
      updateResize,
    };
  },
});
</script>
