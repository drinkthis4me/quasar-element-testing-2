<template>
  <q-page class="justify-center column no-wrap full-width">
    <h4 class="self-center">Gallery for JSONPlaceholder</h4>

    <div class="q-pa-md">
      <q-carousel
        arrows
        animated
        v-model="slide"
        height="400px"
        infinite
        :autoplay="autoplay"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          v-for="p in photoList"
          :key="p.id"
          :name="p.id"
          :img-src="p.url"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">{{ p.id }}</div>
            <div class="text-subtitle1">{{ p.title }}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div v-if="photoList && photoList.length > 0" class="q-pa-md q-gutter-sm">
      <q-img
        v-for="p in photoList"
        :key="p.id"
        :src="p.thumbnailUrl"
        style="height: 140px; max-width: 150px"
        class="rounded-borders"
      />
    </div>
    <div v-else>Nothing to show</div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

//carousel
const slide = ref(1);
const autoplay = ref(true);

//Ajax request
const $q = useQuasar();
const photoList = ref([]);

onMounted(() => {
  getPhoto();
});

 function getPhoto() {
  const url = "https://jsonplaceholder.typicode.com/albums/1/photos";
   api
    .get(url)
    .then((response) => {
      photoList.value = response.data;
    //   console.log(response.data);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
    })
    .catch((error) => {
      console.log(error.response);
      $q.notify({
        color: "negative",
        position: "top",
        message: "Loading failed",
        icon: "report_problem",
      });
    });
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
