/*global $, countlyCommon */

(function(countlyVueExample) {

    countlyVueExample.initialize = function() {};

    countlyVueExample.getVuexModule = function() {
        return {
            name: "vueExample",
            module: {
                namespaced: true,
                state: {
                    pairs: [],
                    randomNumbers: []
                },
                getters: {
                    pairs: function(state) {
                        return state.pairs;
                    },
                    randomNumbers: function(state) {
                        return state.randomNumbers;
                    }
                },
                mutations: {
                    addPair: function(state, obj) {
                        state.pairs.push([obj.name, obj.value]);
                    },
                    setRandomNumbers: function(state, obj) {
                        state.randomNumbers = obj;
                    }
                },
                actions: {
                    updateRandomArray: function(context) {
                        return $.when($.ajax({
                            type: "GET",
                            url: countlyCommon.API_URL + "/o",
                            data: {
                                app_id: countlyCommon.ACTIVE_APP_ID,
                                method: 'get-random-numbers'
                            }
                        })).then(function(json) {
                            context.commit("setRandomNumbers", json);
                        }, function() {
                            /* handle error */
                        });
                    }
                }
            }
        };
    };

})(window.countlyVueExample = window.countlyVueExample || {});