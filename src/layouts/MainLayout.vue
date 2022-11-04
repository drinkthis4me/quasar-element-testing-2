<template>
  <q-layout view="hhh lpR fff">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title shrink> Quasar App </q-toolbar-title>
        <q-btn to="/" flat round dense icon="home" class="q-mr-sm" />
        <q-separator dark vertical inset />
        <q-btn to="/gallery" stretch flat label="Gallery" />
        <q-separator dark vertical inset />
        <q-btn to="/table" stretch flat label="Table" />
        <q-separator dark vertical inset />
        <q-btn to="/comment" stretch flat label="Comment" />
        <q-separator dark vertical inset />
        <q-btn to="/dessert" stretch flat label="Dessert" />
        <q-separator dark vertical inset />
        <q-btn to="/timer" stretch flat label="Timer" />
        <q-space />
        <HeaderMenu :list="newLinkList" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <LayoutFooter />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import HeaderMenu from "src/components/HeaderMenu.vue";
import LayoutFooter from "src/components/LayoutFooter.vue";

export default  defineComponent({
  name: "MainLayout",

  components: {
    HeaderMenu,
    LayoutFooter,
  },

  setup() {
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

    const newLinkList = linkList.map( 
      object => ({...object, dialog: false, showCard: false})
    )

    return {
      linkList,
      newLinkList
    };
  },
});
</script>
