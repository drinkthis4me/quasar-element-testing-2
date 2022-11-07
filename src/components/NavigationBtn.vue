<template >
  <span v-for="project in projects" :key="project.label">
    <q-btn  :to="project.link" :label="project.label" flat stretch  />
    
  </span>
</template>
<script>
export default {
  props:{
    projects:Array
  }
}
</script>
