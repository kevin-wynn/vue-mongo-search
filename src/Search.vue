<template>
  <div class="container">
    <div class="search" v-bind:class="{ active: isActive }">
      <font-awesome-icon icon="search" /> <input ref="searchInput" type="text" v-bind:placeholder="searchText"/>
      <div @click=clearSearch() class="close-search"><font-awesome-icon icon="window-close" /></div>
      <div v-if="loading" class="vue-loader-container">
        <div class="vue-search-loader">Loading...</div>
      </div>
      <div ref='searchResults' class="search-results">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  data() {
    return {
      loading: false,
      isActive: false,
      searchResults: [],
      searchText: this.$attrs.searchText,
      searchModel: this.$attrs.searchModel,
      searchUrl: this.$attrs.searchUrl
    }
  },

  mounted() {
    var el = this.$refs.searchInput;
    var typingTimer;
    var doneTypingInterval = 1000;
    
    el.addEventListener('keyup', () => {
      this.loading = true;
      clearTimeout(typingTimer);
      typingTimer = setTimeout(clearOrSearch, doneTypingInterval);
    })

    el.addEventListener('keydown', () => {
      clearTimeout(typingTimer);
    });

    var clearOrSearch = () => {
      if(el.value.length) {
        this.search(el.value)
      } else {
        this.clearSearch();
      }
    }
  },

  methods: {
    search(query) {
      fetch(this.searchUrl, {
        params: {
          query: query
        }
      }).then((response) => {
        response.json();
      }).then((response) => {
        this.searchResults = response.data;
        this.$emit('update', response.data)        
        this.isActive = true;
        this.loading = false;
      })
    },

    clearSearchResults() {
      for(var i=0; i < this.$refs.searchResults.children.length; i++) {
        if(this.$refs.searchResults.children[i].classList.contains('title')) {
          this.$refs.searchResults.children[i].remove();
        }
      }      
    },

    clearSearch() {
      this.clearSearchResults();
      this.$refs.searchInput.value = '';
      this.searchResults = [];
      this.isActive = false;
      this.loading = false;
    }
  }    
}
</script>

<style lang="scss">
  @import 'scss/search.scss';
  @import 'scss/loader.scss';
</style>