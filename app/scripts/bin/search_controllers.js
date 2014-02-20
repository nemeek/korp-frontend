(function() {
  var korpApp;

  korpApp = angular.module("korpApp");

  korpApp.controller("SearchCtrl", function($scope, $location) {
    $scope.visibleTabs = [true, true, true, true];
    $scope.extendedTmpl = "views/extended_tmpl.html";
    $scope.isCompareSelected = false;
    $scope.selectCompare = function() {
      return $scope.isCompareSelected = true;
    };
    $scope.deselectCompare = function() {
      return $scope.isCompareSelected = false;
    };
    return $scope.$watch((function() {
      return $location.search().search_tab;
    }), function(val) {
      return $scope.isCompareSelected = val === 3;
    });
  });

  korpApp.controller("SimpleCtrl", function($scope, utils, $location, backend, $rootScope, searches, compareSearches) {
    var s;
    s = $scope;
    s.$on("popover_submit", function(event, name) {
      var cqp;
      cqp = s.instance.getCQP();
      return compareSearches.saveSearch({
        label: name || cqp,
        cqp: cqp,
        corpora: settings.corpusListing.getSelectedCorpora()
      });
    });
    s.searches = searches;
    s.$watch("searches.activeSearch", function(search) {
      var cqp, page;
      if (!search) {
        return;
      }
      c.log("searches.activeSearch", search);
      if (search.type === "word") {
        s.placeholder = null;
        s.simple_text = search.val;
        cqp = simpleSearch.getCQP(search.val);
        c.log("simple search cqp", cqp);
        page = $rootScope.search()["page"] || 0;
        searches.kwicSearch(cqp, page);
        lemgramResults.showPreloader();
        return lemgramProxy.makeRequest(search.val, "word", $.proxy(lemgramResults.onProgress, lemgramResults));
      } else if (search.type === "lemgram") {
        s.placeholder = search.val;
        return s.simple_text = "";
      } else {
        s.placeholder = null;
        return s.simple_text = "";
      }
    });
    return s.lemgramToString = function(lemgram) {
      if (!lemgram) {
        return;
      }
      return util.lemgramToString(lemgram).replace(/<.*?>/g, "");
    };
  });

  korpApp.controller("ExtendedSearch", function($scope, utils, $location, backend, $rootScope, searches, compareSearches) {
    var s;
    s = $scope;
    s.$on("popover_submit", function(event, name) {
      return compareSearches.saveSearch({
        label: name || $rootScope.activeCQP,
        cqp: $rootScope.activeCQP,
        corpora: settings.corpusListing.getSelectedCorpora()
      });
    });
    s.searches = searches;
    s.$on("btn_submit", function() {
      c.log("extended submit");
      return $location.search("search", "cqp");
    });
    if ($location.search().cqp) {
      s.cqp = $location.search().cqp;
    }
    return s.$watch("cqp", function(val) {
      c.log("cqp change", val);
      if (!val) {
        return;
      }
      $rootScope.activeCQP = CQP.expandOperators(val);
      return $location.search("cqp", val);
    });
  });

  korpApp.controller("ExtendedToken", function($scope, utils, $location) {
    var cqp, onCorpusChange, s, toggleBound;
    s = $scope;
    c.log("ExtendedToken", s);
    cqp = '[]';
    s.valfilter = utils.valfilter;
    s.setDefault = function(or_obj) {
      or_obj.op = _.values(s.getOpts(or_obj.type))[0][1];
      c.log("or_obj.op", or_obj.op);
      return or_obj.val = "";
    };
    s.getOpts = function(type) {
      var confObj, optObj, _ref;
      confObj = (_ref = s.typeMapping) != null ? _ref[type] : void 0;
      optObj = _.extend({}, (confObj != null ? confObj.opts : void 0) || settings.defaultOptions);
      if (confObj.type === "set") {
        optObj.is = "contains";
      }
      return _.pairs(optObj);
    };
    onCorpusChange = function(event, selected) {
      c.log("onCorpusChange", selected);
      s.types = utils.getAttributeGroups(settings.corpusListing);
      s.typeMapping = _.object(_.map(s.types, function(item) {
        if (item.isStructAttr) {
          return ["_." + item.value, item];
        } else {
          return [item.value, item];
        }
      }));
      return c.log("typeMapping", s.typeMapping);
    };
    s.$on("corpuschooserchange", onCorpusChange);
    onCorpusChange();
    s.removeOr = function(token, and_array, i) {
      if (and_array.length > 1) {
        return and_array.splice(i, 1);
      } else {
        return token.and_block.splice(_.indexOf(and_array, 1));
      }
    };
    s.addAnd = function(token) {
      return token.and_block.push(s.addOr([]));
    };
    toggleBound = function(token, bnd) {
      var boundObj, _ref, _ref1;
      if (!((_ref = token.bound) != null ? _ref[bnd] : void 0)) {
        boundObj = {};
        boundObj[bnd] = true;
        return token.bound = _.extend(token.bound || {}, boundObj);
      } else {
        return (_ref1 = token.bound) != null ? delete _ref1[bnd] : void 0;
      }
    };
    s.toggleStart = function(token) {
      return toggleBound(token, "lbound");
    };
    s.toggleEnd = function(token) {
      return toggleBound(token, "rbound");
    };
    s.toggleRepeat = function(token) {
      if (!token.repeat) {
        return token.repeat = [1, 1];
      } else {
        return delete token.repeat;
      }
    };
    s.getTokenCqp = function() {
      if (!s.token.cqp) {
        return "";
      }
      return s.token.cqp.match(/\[(.*)]/)[1];
    };
    return s.$on("change_case", function(event, val) {
      return c.log("change_case", val, s);
    });
  });

  korpApp.controller("AdvancedCtrl", function($scope, compareSearches, $location) {
    $scope.cqp = "[]";
    $scope.$on("popover_submit", function(event, name) {
      return compareSearches.saveSearch({
        label: name || $rootScope.activeCQP,
        cqp: $scope.cqp,
        corpora: settings.corpusListing.getSelectedCorpora()
      });
    });
    return $scope.$on("btn_submit", function() {
      return $location.search("search", "cqp|" + $scope.cqp);
    });
  });

  korpApp.filter("mapper", function() {
    return function(item, f) {
      return f(item);
    };
  });

  korpApp.controller("CompareSearchCtrl", function($scope, utils, $location, backend, $rootScope, compareSearches) {
    var s;
    s = $scope;
    s.valfilter = utils.valfilter;
    s.savedSearches = compareSearches.savedSearches;
    s.$watch("savedSearches.length", function() {
      s.cmp1 = compareSearches.savedSearches[0];
      return s.cmp2 = compareSearches.savedSearches[1];
    });
    s.reduce = 'word';
    s.getAttrs = function() {
      var listing;
      if (!(s.cmp1 && s.cmp2)) {
        return;
      }
      listing = settings.corpusListing.subsetFactory(_.uniq([].concat(s.cmp1.corpora, s.cmp2.corpora)));
      return utils.getAttributeGroups(listing);
    };
    return s.sendCompare = function() {
      return $rootScope.compareTabs.push(backend.requestCompare(s.cmp1, s.cmp2, s.reduce));
    };
  });

  korpApp.filter("loc", function($rootScope) {
    return function(translationKey) {
      return util.getLocaleString(translationKey);
    };
  });

}).call(this);