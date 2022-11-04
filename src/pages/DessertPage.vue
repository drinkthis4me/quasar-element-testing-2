<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
      :pagination="initialPagination"
    >
      <!-- v-slot for sum -->
      <template v-slot:bottom-row="props">
        <q-tr :props="props">
          <q-td> Total </q-td>
          <q-td></q-td>
          <q-td class="text-center">
            {{ sum("quantity") }}
          </q-td>
          <q-td class="text-right">
            NTD {{ (sum("quantity") * sum("price")).toLocaleString() }}
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom>
        <div class="text-right">All prices are in NTD</div>
      </template>
      <!-- v-slot for copy btn -->
    </q-table>
  </div>
</template>

<script>
const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "price",
    field: "price",
    sortable: true,
    format: (val) =>
      Intl.NumberFormat("zh-TW", {
        style: "currency",
        currency: "NTD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(val),
  },
  {
    name: "quantity",
    align: "center",
    label: "quantity",
    field: "quantity",
    sortable: true,
  },
  {
    name: "subTotal",
    align: "right",
    label: "sub total",
    format: (val) =>
      Intl.NumberFormat("zh-TW", {
        style: "currency",
        currency: "NTD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(val),
    field: (row) => row.price * row.quantity,
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    price: 159,
    fat: 6.0,
    quantity: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    price: 237,
    fat: 9.0,
    quantity: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    price: 262,
    fat: 16.0,
    quantity: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    price: 305,
    fat: 3.7,
    quantity: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    price: 356,
    fat: 16.0,
    quantity: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    price: 375,
    fat: 0.0,
    quantity: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    price: 392,
    fat: 0.2,
    quantity: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    price: 408,
    fat: 3.2,
    quantity: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    price: 452,
    fat: 25.0,
    quantity: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    price: 518,
    fat: 26.0,
    quantity: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];

export default {
  setup() {
    function sum(key) {
      return rows.reduce((accum, object) => accum + object[key], 0);
    }

    return {
      columns,
      rows,
      sum,

      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
    };
  },
};
</script>
