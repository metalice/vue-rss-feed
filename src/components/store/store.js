import Vuex from "vuex";
import Vue from "vue";
import Parser from "rss-parser";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    favorites: [],
    feedNames: [],
    rss: [],
    addNewRssInfo: { name: "", url: "" },
    notEmpty: false,
    isThereFavorites: false,
    showForm: false,
    loading: false,
    pickedRss: { name: "", data: "" },
    pickedRssBeforeSearch: {},
    error: { msg: "", display: false },
    zoom: 1,
    favoritesPosts: { name: "Favorites", data: [] },
    isPageFavoritesPosts: false
  },
  mutations: {
    addRssToState(state, payload) {
      state.notEmpty = true;
      state.feedNames.push(payload.name);
      state.rss = [...state.rss, payload];
      state.showForm = !state.showForm;
    },
    changeShowForm(state, payload) {
      if (payload) {
        state.loading = payload;
      }
      state.showForm = !state.showForm;
    },
    changePickedRss(state, payload) {
      state.pickedRss.name = payload.name;
      state.isPageFavoritesPosts = false;
      state.pickedRss.data = JSON.parse(
        JSON.stringify(state.rss[payload.id].feed)
      );
      state.pickedRssBeforeSearch = JSON.parse(JSON.stringify(state.pickedRss));
    },
    changeLoading(state) {
      state.loading = !state.loading;
    },
    changeError(state, payload) {
      state.error = payload;
    },
    addToFavories(state, payload) {
      if (state.favorites.filter(el => el === payload).length === 0) {
        state.isThereFavorites = true;
        state.favorites.push(payload);
      } else {
        state.error = { msg: "Already in favorites", display: true };
      }
    },
    removeFromFavorites(state, payload) {
      state.favorites = state.favorites.filter(el => el !== payload);
      if (state.favorites.length === 0) state.isThereFavorites = false;
    },
    changeRssContentBySearch(state, payload) {
      if (payload !== "") {
        state.pickedRss.data = state.pickedRssBeforeSearch.data.filter(
          el =>
            el.content.toLowerCase().includes(payload.trim().toLowerCase()) ||
            el.title.toLowerCase().includes(payload.trim().toLowerCase())
        );
      } else {
        state.pickedRss.data = state.pickedRssBeforeSearch.data;
      }
    },
    changeZoomValue(state, payload) {
      state.zoom = payload;
    },
    changeAddNewRssInfo(state, payload) {
      if (payload !== "reset") {
        if (payload.url) state.addNewRssInfo.url = payload.url;
        if (payload.name) state.addNewRssInfo.name = payload.name;
      } else {
        state.addNewRssInfo = { name: "", url: "" };
      }
    },
    addToFavoritePosts(state, payload) {
      if (
        state.favoritesPosts.data.filter(el => el.title === payload.title)
          .length === 0
      )
        state.favoritesPosts.data.push(payload);
    },
    showFavoritesPosts(state) {
      state.isPageFavoritesPosts = true;
      state.pickedRssBeforeSearch = { ...state.favoritesPosts };
      state.pickedRss = { ...state.favoritesPosts };
    },
    removeFromFavoritesPosts(state, payload) {
      state.favoritesPosts.data = state.favoritesPosts.data.filter(
        el => el.title !== payload
      );
      state.pickedRssBeforeSearch = { ...state.favoritesPosts };
      state.pickedRss = { ...state.favoritesPosts };
    }
  },
  getters: {
    getError: state => state.error,
    getNotEmpty: state => state.notEmpty,
    getIsThereFavorites: state => state.isThereFavorites,
    getShowForm: state => state.showForm,
    getFeedNames: state => state.feedNames,
    getLoading: state => state.loading,
    getPickedRss: state => state.pickedRss.data,
    getFavoriets: state => state.favorites,
    getZoom: state => state.zoom,
    getAddData: state => state.addNewRssInfo,
    getIsThereFavoritesPosts: state => state.favoritesPosts.data.length > 0,
    getIsPageFavoritePost: state => state.isPageFavoritesPosts
  },
  actions: {
    addRss({ commit }, payload) {
      let feedData = [];
      let parser = new Parser();
      commit("changeError", false);
      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
      commit("changeLoading");
      parser.parseURL(`${CORS_PROXY}${payload.url}`, (err, feed) => {
        if (err) {
          commit("changeLoading");
          commit("changeError", {
            msg: "Error in URL or connection",
            display: true
          });
        } else {
          feed.items.forEach(entry =>
            feedData.push({ title: entry.title, content: entry.content })
          );
          commit("addRssToState", {
            name: payload.name,
            url: payload.url,
            feed: feedData
          });
          commit("changeLoading");
          commit("changeAddNewRssInfo", "reset");
        }
      });
    },
    clickedShowForm({ commit }) {
      commit("changeShowForm");
      commit("changeError", false);
    },
    clickedNameOfRss({ commit }, payload) {
      commit("changeError", { msg: "", display: false });
      commit("changePickedRss", payload);
    },
    clickedAddToFavorites({ commit }, payload) {
      commit("addToFavories", payload);
    },
    clickedRemoveFromFavorites({ commit }, payload) {
      commit("changeError", { msg: "", display: false });
      commit("removeFromFavorites", payload);
    },
    searchInRss({ commit }, payload) {
      commit("changeRssContentBySearch", payload);
    },
    clickedZoom({ commit }, payload) {
      commit("changeZoomValue", payload);
    },
    addedNewRssInfoName({ commit }, payload) {
      commit("changeAddNewRssInfo", { name: payload });
    },
    addedNewRssInfoUrl({ commit }, payload) {
      commit("changeAddNewRssInfo", { url: payload });
    },
    clickedAddToFavoritesPosts({ commit }, payload) {
      commit("addToFavoritePosts", payload);
    },
    clickedShowFavoritesPosts({ commit }) {
      commit("showFavoritesPosts");
    },
    clickedRemoveFromFavoritesPosts({ commit }, payload) {
      commit("removeFromFavoritesPosts", payload);
    }
  }
});
