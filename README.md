# Vue Type Search

A simple vue component for searching using an input to submit to an endpoint when the user stops typing for 1 second.

### Usage

Install with `npm i --save vue-type-search`
Include in your vue files as a component while passing slot for your search results. Just make sure to have searchResults in your data so it can bind to that and display the results

`searchText` - The text for your input placeholder
`searchUrl` - The url to hit when the user stops typing
`@update` - The function to call when getting results back

Inside the `v-search` you will need to define what to do with your search results, this is an example of showing movies and having a router-link with each result title.

```vue
<template>
  <v-search
    ref="searchContainer"
    searchText="Search movies, shows, and actors"
    searchUrl="/api/search"
    @update="onSearchUpdate"
  >
    <div class="title" v-for="movie in searchResults" :key="movie.id">
      <router-link :to="'/movies/' + movie.id"
        ><h2>{{ movie.title }}</h2></router-link
      >
    </div>
  </v-search>
</template>

<script>
import Search from "vue-type-search";
export default {
  name: "Voxhi",
  components: {
    "v-search": Search
  },
  data() {
    return {
      searchResults: ""
    };
  },
  methods: {
    onSearchUpdate(searchResults) {
      this.searchResults = searchResults;
    }
  }
};
</script>
```
