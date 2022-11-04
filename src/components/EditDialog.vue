<template>
  <q-dialog full-height persistent>
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section>
        <q-btn icon="close" class="float-right" flat round @click="close" />
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">API</q-item-label>
                <q-input
                  outlined
                  v-model="target.API"
                  :rules="[(val) => !!val || '請輸入API名稱']"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">內容</q-item-label>
                <q-input outlined v-model="target.Description" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Auth</q-item-label>
                <q-input
                  outlined
                  v-model="target.Auth"
                  label="key 或是空白"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <!-- <q-item-label class="q-pb-xs">HTTPS</q-item-label>
                <q-input outlined v-model="target.HTTPS" label="true/false"  /> -->

                <q-checkbox
                  name="HTTPS"
                  v-model="target.HTTPS"
                  label="HTTPS"
                  left-label
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <!-- <q-item-label class="q-pb-xs">Cors</q-item-label>
                <q-input outlined v-model="target.Cors" label="yes/no" /> -->
                <q-checkbox
                  name="Cors"
                  v-model="target.Cors"
                  label="Cors"
                  left-label
                  true-value="yes"
        false-value="no"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">網址</q-item-label>
                <q-input
                  outlined
                  v-model="target.Link"
                  :rules="[(val) => !!val || '請輸入網址']"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">類別</q-item-label>
                <q-input outlined v-model="target.Category" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" @click="close" />
          <q-btn
            v-if="title === '編輯項目'"
            icon="save"
            label="儲存"
            color="primary"
            @click="$emit('update', target)"
          />
          <q-btn
            v-else
            icon="upload"
            label="建立"
            color="primary"
            @click="$emit('update', target)"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, watch } from "vue";
import { cloneDeep } from "lodash";

export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          API: "",
          Description: "",
          Auth: "",
          HTTPS: "",
          Cors: "",
          Link: "",
          Category: "",
        };
      },
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  emits: ["close", "update", "create"],
  setup(props) {
    const target = ref({});
    target.value = cloneDeep(props.item);

    watch(
      () => props.item,
      (newItem) => {
        target.value = cloneDeep(newItem);
      }
    );
    return {
      target,
      watch,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
