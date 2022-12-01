<template>
  <q-footer elevated class="q-pa-md bg-grey-8 text-white">
    <q-toolbar>
      <q-toolbar-title>
        <div>© XYZ CO., LTD. XYZ股份有限公司</div>
      </q-toolbar-title>
      <div class="column">
        <div class="col">
          <q-breadcrumbs class="text-white" active-color="white">
            <q-breadcrumbs-el label="常見問題" to="/" />
            <q-breadcrumbs-el label="聯絡我們" to="/" />
            <q-breadcrumbs-el label="隱私權條款" to="/" />
            <q-breadcrumbs-el label="法律保護條款" to="/" />
          </q-breadcrumbs>
        </div>
        <div class="col">
          <q-breadcrumbs class="text-white" active-color="white">
            <q-breadcrumbs-el label="客服專線 00-0000-0000, 0800-000-000" />
          </q-breadcrumbs>
        </div>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent, DefineComponent } from "vue";

export default defineComponent({
  name: "LayoutFooter",
});
</script>
