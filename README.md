# Quasar element testing

In this learning project, I tested out some quasar elements and plugins.

## Table of Contents

- [Quasar element testing](#quasar-element-testing)
  - [Table of Contents](#table-of-contents)
- [Install \& run](#install--run)
- [Mega Dropdown](#mega-dropdown)
- [Gallery](#gallery)
- [Table](#table)
- [Math table](#math-table)
- [Comment](#comment)
- [Countdown Timer](#countdown-timer)

# Install & run

In terminal:

```bash
npm install
quasar dev
```

# Mega Dropdown

On the top right of the header, I set up some button which can be opened with mouse hovering.

Buttons use differnt v-model to control opening and closing q-dialog.

```html
<q-btn
  :label="item.title"
  :icon="item.icon"
  :icon-right="item.showCard ? 'expand_less' : 'expand_more'"
  @mouseover="(item.dialog = true), (item.showCard = true)"
  @mouseleave="item.showCard ? (item.dialog = true) : item.dialog = false)"
  stretch
  flat
/>
```

The dialog is set to seamless and with some transition effect.
To access dialog content, there is additional v-model, otherwise dialog would close when mouse leave the button.

```html
<q-dialog
  v-model="item.dialog"
  position="top"
  seamless
  transition-show="jump-down"
  transition-hide="jump-up"
></q-dialog>
```

The result is glitchy. Mouse moment must be precise to open and close the dialog. What's worse is that two buttons may open their own dialog and overlap each other.

Conclusion: give up on hoverable button or just use pure CSS to control opening/closing.

# Gallery

Here I pratice http request using [Axios](https://github.com/axios/axios).

Fetch some images from [jsonplaceholder](https://jsonplaceholder.typicode.com) and put them in q-carousel.

Use q-notify to catch response error.

```javaScript
    function getPhoto() {
      const url = "https://jsonplaceholder.typicode.com/albums/1/photos";
      api
        .get(url)
        .then((response) => {
          photoList.value = response.data;
        })
        .catch((error) => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
        });
    }
```

# Table

Table data is from [Public APIs](https://github.com/toddmotto/public-apis) using http request.

Q-table is all about slots. Here are slots for:

- Search filter on the top right
- No data message
- Loading Ajax bar
- Create new data button on the top left
- Edit/delete button at the end column

For editing and creating data, there is a q-dialog for user input.

The dialog is another component with props. Since props is read only, the table data cannot be directly edited by the dialog. So I [deep clone](https://lodash.com/docs/#cloneDeep) the props, edit the clone, and emit it to the parent for updating table.

```javascript
const target = ref({});
target.value = cloneDeep(props.item);
```

```html
<q-btn @click="$emit('update', target)" />
```

# Math table

Use financial table to calculate total price.

The data is in an Array. To calculate the total value of a certain key:

```javascript
function sum(key) {
  return rows.reduce((accum, object) => accum + object[key], 0);
}
```

# Comment

Blog comment form. Receive user name, email, and comment.

When submit, POST the data to [jsonplaceholder](https://jsonplaceholder.typicode.com) and display the response in a table.

# Countdown Timer

Mocking: [Interval Timer](https://play.google.com/store/apps/details?id=cc.dreamspark.intervaltimer) on Google play.

Timer with Start/ Pause/ Reset buttons.

Click on text to edit Minutes/ Seconds/ Looping in dialog.

For more detail explanation:
Please find code comments in src/pages/TimerPage.vue
