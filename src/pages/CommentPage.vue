<template>
  <q-page class="justify-center">
    <div class="column items-center">
      <!-- user input -->
      <h4 class="text-center col">Comments for JSONPlaceholder</h4>
      <div class="q-pa-md col" style="width: 500px">
        <q-form
          action=""
          method=""
          autofocus
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="name"
            name="name"
            label="Your name *"
            hint="Name and surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="email"
            label="email *"
            hint="Name@example.com"
            type="email"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your email',
              (val) => val.includes(`@`) || 'Please type a real email',
            ]"
          />

          <q-input
            v-model="comment"
            filled
            type="textarea"
            label="Say something to us *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <div class="self-center">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
      <q-separator />
      <!-- show user input -->
      <div class="q-pa-md col full-width">
        <q-markup-table
          v-if="submitResult.length > 0"
          separator="vertical"
          flat
          bordered
        >
          <thead class="bg-grey-3">
            <tr>
              <th colspan="5">
                <div class="row no-wrap items-center text-h4 q-ml-md">
                  User Comment:
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-center">name</th>
              <th class="text-center">email</th>
              <th class="text-left">comment</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in submitResult" :key="index" class="">
              <td class="text-left">{{ item.name }}</td>
              <td class="text-left">{{ item.email }}</td>
              <td class="text-left">{{ item.comment }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default {
  setup() {
    //For quasar notify/ dialog
    const $q = useQuasar();
    //form
    const name = ref("");
    const email = ref("");
    const comment = ref("");
    const submitResult = ref([]);

    //form button actions
    function FormData(name, email, comment) {
      this.name = name;
      this.email = email;
      this.comment = comment;
    }

    function onSubmit(e) {
      e.preventDefault();

      //create new data and assign to submitResult
      const formData = new FormData(name, email, comment);
      const data = [];
      data.push(formData);
      submitResult.value = data;

      //ajax: post submitResult to url
      postComment();
    }

    //axios request
    function postComment() {
      const url = "https://jsonplaceholder.typicode.com/posts";
      api
        .post(url, submitResult.value)
        .then((response) => console.log(response.status))
        .then(
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Comment submitted",
          })
        )
        .catch((error) => {
          $q.notify({
            color: "negative",
            position: "top",
            message: error.response.data,
            icon: "report_problem",
          });
          console.log(error.response.data);
        });
    }

    function onReset() {
      name.value = null;
      email.value = null;
      comment.value = null;
    }

    return {
      name,
      email,
      comment,
      submitResult,
      FormData,
      onSubmit,
      onReset,
      postComment,
    };
  },
};
</script>
