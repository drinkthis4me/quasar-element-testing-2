<template>
  <q-page class="justify-center">
    <div class="q-pa-md">
      <h4 class="text-center">api.publicapis.org/entries</h4>
      <q-table
        flat
        bordered
        row-key="Link"
        :columns="columns"
        :rows="entriesList"
        :filter="filter"
        no-data-label="無資料可顯示"
        no-results-label="找不到你要的資料，嘗試別的關鍵字?"
        :loading="loading"
      >
        <!-- v-slot for dialog creating new data -->
        <template v-slot:top-left>
          <div class="row">
            <div class="text-h7 q-pa-sm">找找你喜歡的API，或是 →</div>
            <q-btn color="blue" label="建立新項目" @click="createItem" />
          </div>
        </template>
        <!-- v-slot for dialog editing/deleting data -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              color="blue"
              icon="edit"
              @click="editItem(props.row, props.rowIndex)"
              size="sm"
            />
            <q-btn
              color="red"
              icon="delete"
              @click="deleteItem(props.rowIndex)"
              size="sm"
            />
          </q-td>
        </template>
        <!-- v-slot for search bar -->
        <template v-slot:top-right>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <!-- v-slot for no data -->
        <template v-slot:no-data="{ icon, message }">
          <div class="full-width row flex-center text-red q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              {{ message }}
            </span>
            <q-icon size="2em" :name="icon" />
          </div>
        </template>
        <!-- v-slot for hyperlink -->
        <template v-slot:body-cell-link="props">
          <q-td :props="props">
            <div>
              <a :href="props.row.Link">{{ props.row.Link }} </a>
            </div>
          </q-td>
        </template>
        <!-- v-slot for loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
      <div class="q-pa-sm q-gutter-sm">
        <EditDialog
          :item="theItem"
          :title="dialogTitle"
          v-model="showDialog"
          @close="closeDialog"
          @update="updateList"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import EditDialog from "src/components/EditDialog.vue";

const columns = [
  {
    name: "api",
    label: "API",
    align: "left",
    field: "API",
    sortable: true,
    headerStyle: "width: 50px",
  },
  {
    name: "description",
    align: "left",
    label: "內容",
    field: "Description",
    sortable: true,
    style: "width: 50px",
  },
  {
    name: "auth",
    align: "center",
    label: "Auth",
    field: "Auth",
    sortable: true,
  },
  {
    name: "https",
    align: "center",
    label: "HTTPS",
    field: "HTTPS",
    sortable: true,
  },
  {
    name: "cors",
    align: "center",
    label: "Cors",
    field: "Cors",

    sortable: true,
  },
  {
    name: "link",
    align: "left",
    label: "網址",
    field: "Link",
    sortable: true,
  },
  {
    name: "category",
    label: "類別",
    field: "Category",
    align: "center",
    sortable: true,
  },
  {
    name: "actions",
    align: "center",
    label: "編輯/刪除",
  },
];

export default {
  components: {
    EditDialog,
  },
  setup() {
    const $q = useQuasar();
    const entriesList = ref([]);
    const theItem = ref({});
    const showDialog = ref(false);
    const theItemInedx = ref(-1);
    const dialogTitle = ref("");
    const filter = ref("");
    const loading = ref(false);

    function getData() {
      const url = "https://api.publicapis.org/entries";
      api
        .get(url)
        .then((response) => {
          const list = response.data.entries.slice(0, 10);
          entriesList.value = list;
          loading.value = false;
        })
        .catch((error) => {
          $q.notify({
            color: "negative",
            position: "top",
            message: error.response.data,
            icon: "report_problem",
          });
        });
    }

    function deleteItem(index) {
      $q.dialog({
        title: "刪除資料",
        message: "你確定要刪除本資料?",
        ok: {
          push: true,
          color: "negative",
          label: "刪除",
        },
        cancel: {
          push: true,
          label: "取消",
        },
      }).onOk(() => {
        entriesList.value.splice(index, 1);
        console.log(`>>>> delete success`);
      });
    }

    function closeDialog() {
      showDialog.value = false;
      theItemInedx.value = -1;
      theItem.value = {};
    }

    function editItem(row, rowIndex) {
      showDialog.value = true;
      theItem.value = row;
      theItemInedx.value = rowIndex;
      dialogTitle.value = "編輯項目";
    }

    function updateList(target) {
      if (theItemInedx.value > -1) {
        entriesList.value[theItemInedx.value] = target;
      } else {
        entriesList.value.unshift(target);
      }
      showDialog.value = false;
    }

    function createItem() {
      showDialog.value = true;
      dialogTitle.value = "建立新項目";
    }

    onMounted(() => {
      loading.value = true;
      getData();
    });

    return {
      columns,
      entriesList,
      theItem,
      showDialog,
      theItemInedx,
      dialogTitle,
      filter,
      loading,
      getData,
      deleteItem,
      closeDialog,
      editItem,
      updateList,
      createItem,
    };
  },
};
</script>
