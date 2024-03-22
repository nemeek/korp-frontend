/** @format */
import _ from "lodash"
import korpApp from "./korp.module"
import { kwicPagerName, kwicPager } from "./components/pager"
import { sidebarName, sidebarComponent } from "./components/sidebar"
import * as autoc from "./components/autoc"
import * as readingmode from "./components/readingmode"
import * as extendedAddBox from "./components/extended/extended_add_box"
import { corpusChooserComponent } from "./components/corpus_chooser/corpus_chooser"
import { ccTimeGraphComponent } from "./components/corpus_chooser/time_graph"
import { ccTreeComponent } from "./components/corpus_chooser/tree"
import { ccInfoBox } from "./components/corpus_chooser/info_box"
import { depTreeComponent } from "./components/deptree/deptree"
import { simpleSearchComponent } from "./components/simple_search"
import { extendedStandardComponent } from "./components/extended/standard_extended"
import { extendedParallelComponent } from "./components/extended/parallel_extended"
import { extendedTokensComponent } from "./components/extended/extended_tokens"
import { extendedAndTokenComponent } from "./components/extended/and_token"
import { extendedCQPTermComponent } from "./components/extended/cqp_term"
import { extendedTokenComponent } from "./components/extended/token"
import { extendedStructTokenComponent } from "./components/extended/struct_token"
import { extendedCQPValueComponent } from "./components/extended/cqp_value"
import { advancedSearchComponent } from "./components/advanced_search"
import { compareSearchComponent } from "./components/compare_search"
import "./components/kwic_word"
import { kwicComponent } from "./components/kwic"
import { statisticsComponent } from "./components/statistics"
import { trendDiagramComponent } from "./components/trend_diagram"
import { korpErrorComponent } from "./components/korp_error"
import { kwicTabsComponent } from "./components/dynamic_tabs/kwic_tabs"
import { graphTabsComponent } from "./components/dynamic_tabs/graph_tabs"
import { compareTabsComponent } from "./components/dynamic_tabs/compare_tabs"
import { mapTabsComponent } from "./components/dynamic_tabs/map_tabs"
import { textTabsComponent } from "./components/dynamic_tabs/text_tabs"
import { headerComponent } from "./components/header"
import { wordPictureComponent } from "./components/word_picture"
import { searchtabsComponent } from "./components/searchtabs"
import "./components/frontpage"
import { resultsComponent } from "./components/results"
import statemachine from "@/statemachine"

let html = String.raw

korpApp.component(kwicPagerName, kwicPager)
korpApp.component(sidebarName, sidebarComponent)
korpApp.component(readingmode.componentName, readingmode.component)
korpApp.component(autoc.componentName, autoc.component)
korpApp.component(extendedAddBox.componentName, extendedAddBox.component)
korpApp.component("corpusChooser", corpusChooserComponent)
korpApp.component("ccTimeGraph", ccTimeGraphComponent)
korpApp.component("ccTree", ccTreeComponent)
korpApp.component("ccInfoBox", ccInfoBox)
korpApp.component("depTree", depTreeComponent)
korpApp.component("simpleSearch", simpleSearchComponent)
korpApp.component("extendedStandard", extendedStandardComponent)
korpApp.component("extendedParallel", extendedParallelComponent)
korpApp.component("extendedTokens", extendedTokensComponent)
korpApp.component("extendedAndToken", extendedAndTokenComponent)
korpApp.component("extendedCqpTerm", extendedCQPTermComponent)
korpApp.component("extendedToken", extendedTokenComponent)
korpApp.component("extendedStructToken", extendedStructTokenComponent)
korpApp.component("extendedCqpValue", extendedCQPValueComponent)
korpApp.component("advancedSearch", advancedSearchComponent)
korpApp.component("compareSearch", compareSearchComponent)
korpApp.component("kwic", kwicComponent)
korpApp.component("statistics", statisticsComponent)
korpApp.component("trendDiagram", trendDiagramComponent)
korpApp.component("korpError", korpErrorComponent)
korpApp.component("header", headerComponent)
korpApp.component("wordPicture", wordPictureComponent)
korpApp.component("searchtabs", searchtabsComponent)
korpApp.component("results", resultsComponent)
// these are directives because it needs replace: true, which is not supported in component
korpApp.directive("kwicTabs", kwicTabsComponent)
korpApp.directive("graphTabs", graphTabsComponent)
korpApp.directive("compareTabs", compareTabsComponent)
korpApp.directive("mapTabs", mapTabsComponent)
korpApp.directive("textTabs", textTabsComponent)

// load all custom components
let customComponents = {}

try {
    customComponents = require("custom/components.js").default
} catch (error) {
    console.log("No module for components available")
}
for (const componentName in customComponents) {
    korpApp.component(componentName, customComponents[componentName])
}

korpApp.filter("mapper", () => (item, f) => f(item))
korpApp.filter("loc", () => util.getLocaleString)
korpApp.filter("locObj", () => util.getLocaleStringObject)
korpApp.filter("replaceEmpty", function () {
    return function (input) {
        if (input === "") {
            return "–"
        } else {
            return input
        }
    }
})

authenticationProxy.initAngular()

/**
 * angular-dynamic-locale updates translations in the builtin $locale service, which is used
 * by at least the datepicker in angular-ui-bootstrap.
 */
korpApp.config([
    "tmhDynamicLocaleProvider",
    (tmhDynamicLocaleProvider) =>
        tmhDynamicLocaleProvider.localeLocationPattern("translations/angular-locale_{{locale}}.js"),
])

korpApp.config([
    "$uibTooltipProvider",
    ($uibTooltipProvider) =>
        $uibTooltipProvider.options({
            appendToBody: true,
        }),
])

/**
 * Makes the hashPrefix "" instead of "!" which means our URL:s are ?mode=test#?lang=eng
 * instead of ?mode=test#!?lang=eng
 */
korpApp.config(["$locationProvider", ($locationProvider) => $locationProvider.hashPrefix("")])

/**
 * "blob" must be added to the trusted URL:s, otherwise downloading KWIC and statistics etc. will not work
 */
korpApp.config([
    "$compileProvider",
    ($compileProvider) => $compileProvider.aHrefSanitizationTrustedUrlList(/^\s*(https?|ftp|mailto|tel|file|blob):/),
])

korpApp.run([
    "$rootScope",
    "$location",
    "$locale",
    "tmhDynamicLocale",
    "tmhDynamicLocaleCache",
    "$q",
    "$timeout",
    "$uibModal",
    function ($rootScope, $location, $locale, tmhDynamicLocale, tmhDynamicLocaleCache, $q, $timeout, $uibModal) {
        const s = $rootScope
        s._settings = settings
        window.lang = s.lang = $location.search().lang || settings["default_language"]

        s.extendedCQP = null

        /** This deferred is used to signal that the filter feature is ready. */
        s.globalFilterDef = $q.defer()

        s.locationSearch = function () {
            const search = $location.search(...arguments)
            $location.replace()
            return search
        }

        s.searchtabs = () => $(".search_tabs > ul").scope().tabset.tabs

        // Listen to url changes like #?lang=swe
        s.$on("$locationChangeSuccess", () => {
            // Update current locale. This is async and triggers the "$localeChangeSuccess" event.
            tmhDynamicLocale.set($location.search().lang || settings["default_language"])
        })

        // Listen to change of current language
        s.$on("$localeChangeSuccess", () => {
            // The fresh info in $locale only has the 2-letter code, not the 3-letter code that we use
            // Find the configured 3-letter UI language matching the new 2-letter locale
            const lang = settings["languages"]
                .map((language) => language.value)
                .find((lang3) => tmhDynamicLocaleCache.get(lang3).id == $locale.id)

            // Update global variables
            s.lang = lang
            window.lang = lang

            // Trigger jQuery Localize
            $("body").localize()

            // Update language switcher
            $("#languages").radioList("select", lang)
        })

        $(document).keyup(function (event) {
            if (event.keyCode === 27) {
                $rootScope.$broadcast("abort_requests")
            }
        })

        $rootScope.kwicTabs = []
        $rootScope.compareTabs = []
        $rootScope.graphTabs = []
        $rootScope.mapTabs = []
        $rootScope.textTabs = []

        s.waitForLogin = false

        /** Recursively collect the corpus ids found in a corpus folder */
        function collectCorpusIdsInFolder(folder) {
            if (!folder) return []

            // Collect direct child corpora
            const ids = folder.corpora || []

            // Recurse into subfolders and add
            for (const subfolder of Object.values(folder.subfolders || {})) {
                ids.push(...collectCorpusIdsInFolder(subfolder))
            }

            return ids
        }

        function initialzeCorpusSelection(selectedIds) {
            // Resolve any folder ids to the contained corpus ids
            const corpusIds = []
            for (const id of selectedIds) {
                // If it is a corpus, copy the id
                if (settings.corpora[id]) {
                    corpusIds.push(id)
                }
                // If it is not a corpus, but a folder
                else if (settings.folders[id]) {
                    // Resolve contained corpora
                    corpusIds.push(...collectCorpusIdsInFolder(settings.folders[id]))
                }
            }
            // Replace the possibly mixed list with the list of corpus-only ids
            selectedIds = corpusIds

            let loginNeededFor = []

            for (let corpusId of selectedIds) {
                const corpusObj = settings.corpora[corpusId]
                if (corpusObj && corpusObj["limited_access"]) {
                    if (!authenticationProxy.hasCredential(corpusId.toUpperCase())) {
                        loginNeededFor.push(corpusObj)
                    }
                }
            }

            const allCorpusIds = settings.corpusListing.corpora.map((corpus) => corpus.id)

            if (settings["initalization_checks"] && settings["initalization_checks"](s)) {
                // custom initalization code called
            } else if (_.isEmpty(settings.corpora)) {
                // no corpora
                s.openErrorModal({
                    content: "<korp-error></korp-error>",
                    resolvable: false,
                })
            } else if (loginNeededFor.length != 0) {
                // check if user has access
                const loginNeededHTML = () =>
                    loginNeededFor
                        .map((corpus) => `<span>${util.getLocaleStringObject(corpus.title)}</span>`)
                        .join(", ")

                if (authenticationProxy.isLoggedIn()) {
                    // access partly or fully denied to selected corpora
                    if (settings.corpusListing.corpora.length == loginNeededFor.length) {
                        s.openErrorModal({
                            content: "{{'access_denied' | loc:lang}}",
                            buttonText: "go_to_start",
                            onClose: () => {
                                window.location.href = window.location.href.split("?")[0]
                            },
                        })
                    } else {
                        s.openErrorModal({
                            content: html`<div>{{'access_partly_denied' | loc:lang}}:</div>
                                <div>${loginNeededHTML()}</div>
                                <div>{{'access_partly_denied_continue' | loc:lang}}</div>`,
                            onClose: () => {
                                const neededIds = loginNeededFor.map((corpus) => corpus.id)
                                let newIds = selectedIds.filter((corpusId) => !neededIds.includes(corpusId))
                                if (newIds.length == 0) {
                                    newIds = settings["preselected_corpora"]
                                }
                                initialzeCorpusSelection(newIds)
                            },
                        })
                    }
                } else {
                    // login needed before access can be checked
                    s.openErrorModal({
                        content: html`<span class="mr-1">{{'login_needed_for_corpora' | loc:lang}}:</span
                            >${loginNeededHTML()}`,
                        onClose: () => {
                            s.waitForLogin = true
                            statemachine.send("LOGIN_NEEDED", { loginNeededFor })
                        },
                    })
                }
            } else if (!selectedIds.every((r) => allCorpusIds.includes(r))) {
                // some corpora missing
                s.openErrorModal({
                    content: `{{'corpus_not_available' | loc:lang}}`,
                    onClose: () => {
                        let newIds = selectedIds.filter((corpusId) => allCorpusIds.includes(corpusId))
                        if (newIds.length == 0) {
                            newIds = settings["preselected_corpora"]
                        }
                        initialzeCorpusSelection(newIds)
                    },
                })
            } else {
                // here $timeout must be used so that message is not sent before all controllers/componenters are initialized
                settings.corpusListing.select(selectedIds)
                $timeout(() => $rootScope.$broadcast("initialcorpuschooserchange", selectedIds), 0)
            }
        }

        // TODO the top bar could show even though the modal is open,
        // thus allowing switching modes or language when an error has occured.
        s.openErrorModal = ({ content, resolvable = true, onClose = null, buttonText = null, translations = {} }) => {
            const s = $rootScope.$new(true)

            const useCustomButton = !_.isEmpty(buttonText)

            const modal = $uibModal.open({
                template: html` <div class="modal-body" ng-class="{'mt-10' : resolvable }">
                    <div>${content}</div>
                    <div class="ml-auto mr-0 w-fit">
                        <button
                            ng-if="${resolvable}"
                            ng-click="closeModal()"
                            class="btn bg-blue-500 text-white font-bold mt-3"
                        >
                            <span ng-if="${useCustomButton}">{{'${buttonText}' | loc:lang }}</span>
                            <span ng-if="!${useCustomButton}">OK</span>
                        </button>
                    </div>
                </div>`,
                scope: s,
                size: "md",
                backdrop: "static",
                keyboard: false,
            })

            s.translations = translations

            s.closeModal = () => {
                if (onClose && resolvable) {
                    modal.close()
                    onClose()
                }
            }
        }

        function getCorporaFromHash() {
            let selectedIds
            let { corpus } = $location.search()
            if (corpus) {
                selectedIds = corpus.split(",")
            } else {
                selectedIds = settings["preselected_corpora"] || []
            }
            return selectedIds
        }

        statemachine.listen("login", function () {
            if (s.waitForLogin) {
                s.waitForLogin = false
                initialzeCorpusSelection(getCorporaFromHash())
            }
        })

        initialzeCorpusSelection(getCorporaFromHash())
    },
])

korpApp.filter("trust", ["$sce", ($sce) => (input) => $sce.trustAsHtml(input)])
korpApp.filter("prettyNumber", () => (input) => new Intl.NumberFormat(lang).format(input))
angular.module("korpApp").filter("maxLength", function () {
    return function (val) {
        return val.length > 39 ? val.slice(0, 36) + "…" : val
    }
})
